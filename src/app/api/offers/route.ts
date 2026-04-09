import { type NextRequest } from "next/server";
import translate from "google-translate-api-x";

// CPAGrip JSON Feed - server-side with private key
const CPAGRIP_USER_ID = "2515593";
const CPAGRIP_KEY = "2f7c6d4a94ecd9333b102a906f3a868d";
const FEED_BASE = "https://www.cpagrip.com/common/offer_feed_json.php";

// In-memory cache
let cachedOffers: Record<string, { data: CategorizedOffers; ts: number }> = {};
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Translation cache (persists longer)
const translationCache = new Map<string, string>();

interface RawOffer {
  offer_id: string;
  title: string;
  description: string;
  payout: string;
  netepc: string;
  type: string;
  accepted_countries: string;
  category: string;
  offerlink: string;
  offerphoto: string;
  status: string;
}

interface CleanOffer {
  id: string;
  title: string;
  description: string;
  payout: number;      // what WE earn
  userReward: number;   // what USER gets (70%)
  category: string;
  categoryLabel: string;
  icon: string;
  instruction: string;
  country: string;
  link: string;         // tracking_id placeholder
  photo: string;
  tier: "quick" | "standard" | "premium";
}

interface CategorizedOffers {
  signups: CleanOffer[];
  apps: CleanOffer[];
  premium: CleanOffer[];
  all: CleanOffer[];
  total: number;
}

const CATEGORY_MAP: Record<string, { label: string; icon: string; instruction: string }> = {
  "Email/Zip Submit": {
    label: "Quick Sign-up",
    icon: "mail",
    instruction: "Enter your email to earn",
  },
  "Mobile Install": {
    label: "App Download",
    icon: "download",
    instruction: "Download & open the app to earn",
  },
  "Credit Card Submit": {
    label: "Free Trial",
    icon: "star",
    instruction: "Sign up for a free trial to earn",
  },
};

function getTier(userReward: number): "quick" | "standard" | "premium" {
  if (userReward >= 1.5) return "premium";
  if (userReward >= 0.5) return "standard";
  return "quick";
}

async function translateBatch(texts: string[]): Promise<string[]> {
  // Check cache first
  const results: string[] = new Array(texts.length);
  const toTranslate: { idx: number; text: string }[] = [];

  for (let i = 0; i < texts.length; i++) {
    const cached = translationCache.get(texts[i]);
    if (cached) {
      results[i] = cached;
    } else {
      toTranslate.push({ idx: i, text: texts[i] });
    }
  }

  if (toTranslate.length === 0) return results;

  // Translate in chunks of 50 to avoid rate limits
  const CHUNK_SIZE = 50;
  for (let c = 0; c < toTranslate.length; c += CHUNK_SIZE) {
    const chunk = toTranslate.slice(c, c + CHUNK_SIZE);
    try {
      const batch = chunk.map((t) => t.text);
      const res = await translate(batch, { to: "en" });
      const translated = Array.isArray(res) ? res : [res];
      for (let i = 0; i < chunk.length; i++) {
        const eng = translated[i]?.text || chunk[i].text;
        results[chunk[i].idx] = eng;
        translationCache.set(chunk[i].text, eng);
      }
    } catch {
      for (const t of chunk) {
        results[t.idx] = t.text;
      }
    }
  }

  return results;
}

function cleanOffer(raw: RawOffer): CleanOffer | null {
  // Skip Pin-Submit (charges user's phone bill)
  if (raw.category === "Pin-Submit") return null;
  if (raw.status !== "active") return null;

  const payout = parseFloat(raw.payout) || 0;
  if (payout <= 0) return null;

  const userReward = Math.round(payout * 0.7 * 100) / 100;
  const catInfo = CATEGORY_MAP[raw.category] || {
    label: "Task",
    icon: "zap",
    instruction: "Complete this task to earn",
  };

  // Ensure tracking_id placeholder for client-side injection
  const baseLink = raw.offerlink.replace(/&?tracking_id=[^&]*/g, "");
  const separator = baseLink.includes("?") ? "&" : "?";
  const link = `${baseLink}${separator}tracking_id={USER_ID}`;

  return {
    id: raw.offer_id,
    title: raw.title,
    description: raw.description,
    payout,
    userReward,
    category: raw.category,
    categoryLabel: catInfo.label,
    icon: catInfo.icon,
    instruction: catInfo.instruction,
    country: raw.accepted_countries,
    link,
    photo: raw.offerphoto,
    tier: getTier(userReward),
  };
}

async function fetchOffers(country?: string): Promise<CategorizedOffers> {
  const cacheKey = country || "ALL";
  const cached = cachedOffers[cacheKey];
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.data;
  }

  const params = new URLSearchParams({
    user_id: CPAGRIP_USER_ID,
    key: CPAGRIP_KEY,
    showall: "yes",
    limit: "500",
  });

  const res = await fetch(`${FEED_BASE}?${params}`, {
    headers: { "User-Agent": "WeeCove/1.0" },
  });

  if (!res.ok) {
    throw new Error(`CPAGrip API error: ${res.status}`);
  }

  const json = await res.json();
  const rawOffers: RawOffer[] = json.offers || [];

  const cleaned = rawOffers
    .map(cleanOffer)
    .filter((o): o is CleanOffer => o !== null)
    .sort((a, b) => b.userReward - a.userReward); // highest reward first

  // Batch translate non-English titles and descriptions
  const titles = cleaned.map((o) => o.title);
  const descriptions = cleaned.map((o) => o.description);
  const [translatedTitles, translatedDescriptions] = await Promise.all([
    translateBatch(titles),
    translateBatch(descriptions),
  ]);
  for (let i = 0; i < cleaned.length; i++) {
    cleaned[i].title = translatedTitles[i];
    cleaned[i].description = translatedDescriptions[i];
  }

  const result: CategorizedOffers = {
    signups: cleaned.filter((o) => o.category === "Email/Zip Submit"),
    apps: cleaned.filter((o) => o.category === "Mobile Install"),
    premium: cleaned.filter((o) => o.category === "Credit Card Submit"),
    all: cleaned,
    total: cleaned.length,
  };

  cachedOffers[cacheKey] = { data: result, ts: Date.now() };
  return result;
}

export async function GET(request: NextRequest) {
  // Show ALL offers from all countries — no country filter
  // Translation to English is handled by translateBatch()
  try {
    const offers = await fetchOffers();
    return Response.json(offers, {
      headers: { "Cache-Control": "public, max-age=600" },
    });
  } catch (err) {
    return Response.json(
      { error: "Failed to fetch offers", signups: [], apps: [], premium: [], all: [], total: 0 },
      { status: 500 }
    );
  }
}

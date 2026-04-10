// Remittance provider data
// Last verified: 2026-04-10 (Wise rates from wise.com, others estimated from provider sites)

export interface Corridor {
  from: string;
  to: string;
  rate: number;
  fee: number;
  markup: number;
  speed: string;
  method: string;
  updatedAt: string;
}

export interface Provider {
  slug: string;
  name: string;
  domain: string;
  brandColor: string;
  tagline: string;
  affiliateUrl: string;
  trustpilot: string;
  crypto?: boolean;
  corridors: Corridor[];
}

// Fallback rates — overwritten by live API data when available
export let MID_MARKET_RATES: Record<string, number> = {
  "HKD-PHP": 7.6516,
  "HKD-IDR": 2120,
  "HKD-INR": 10.95,
  "HKD-CNY": 0.8719,
  "HKD-TWD": 4.18,
  "HKD-JPY": 18.55,
  "HKD-KRW": 184.5,
  "HKD-THB": 4.42,
  "HKD-GBP": 0.0985,
  "HKD-AUD": 0.200,
  "HKD-CAD": 0.179,
  "HKD-USD": 0.1285,
};

export function updateMidMarketRates(newRates: Record<string, number>) {
  MID_MARKET_RATES = { ...MID_MARKET_RATES, ...newRates };
}

export function getProviderLogo(domain: string, size = 64) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
}

export const PROVIDERS: Provider[] = [
  // --- International platforms ---
  {
    slug: "wise",
    name: "Wise",
    domain: "wise.com",
    brandColor: "#9FE870",
    tagline: "Mid-market rate, low transparent fees",
    affiliateUrl: "https://wise.com",
    trustpilot: "4.5/5 (230K+)",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.6516, fee: 75, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2120, fee: 75, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.95, fee: 80, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CNY", rate: 0.8719, fee: 122, markup: 0.0, speed: "Seconds", method: "Alipay / WeChat / Bank", updatedAt: "2026-04-10" },
      { from: "HKD", to: "TWD", rate: 4.18, fee: 75, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "JPY", rate: 18.55, fee: 65, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "KRW", rate: 184.5, fee: 65, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "THB", rate: 4.42, fee: 65, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "GBP", rate: 0.0985, fee: 55, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "AUD", rate: 0.200, fee: 55, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CAD", rate: 0.179, fee: 55, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "USD", rate: 0.1285, fee: 40, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "western-union",
    name: "Western Union",
    domain: "westernunion.com",
    brandColor: "#FFDD00",
    tagline: "Cash pickup worldwide",
    affiliateUrl: "https://www.westernunion.com",
    trustpilot: "1.5/5 (15K+)",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.35, fee: 0, markup: 3.9, speed: "Minutes", method: "Cash pickup", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2030, fee: 0, markup: 4.2, speed: "Minutes", method: "Cash pickup", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.50, fee: 0, markup: 4.1, speed: "Minutes", method: "Cash pickup", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CNY", rate: 0.835, fee: 0, markup: 4.2, speed: "Minutes", method: "Bank / Cash", updatedAt: "2026-04-10" },
      { from: "HKD", to: "TWD", rate: 4.01, fee: 0, markup: 4.1, speed: "Minutes", method: "Cash pickup", updatedAt: "2026-04-10" },
      { from: "HKD", to: "JPY", rate: 17.80, fee: 0, markup: 4.0, speed: "Minutes", method: "Cash pickup", updatedAt: "2026-04-10" },
      { from: "HKD", to: "KRW", rate: 177.0, fee: 0, markup: 4.1, speed: "Minutes", method: "Cash pickup", updatedAt: "2026-04-10" },
      { from: "HKD", to: "THB", rate: 4.24, fee: 0, markup: 4.1, speed: "Minutes", method: "Cash pickup", updatedAt: "2026-04-10" },
      { from: "HKD", to: "GBP", rate: 0.0945, fee: 0, markup: 4.1, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "AUD", rate: 0.192, fee: 0, markup: 4.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CAD", rate: 0.172, fee: 0, markup: 3.9, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "USD", rate: 0.124, fee: 0, markup: 3.5, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "remitly",
    name: "Remitly",
    domain: "remitly.com",
    brandColor: "#2364AA",
    tagline: "Fast to GCash & mobile wallets",
    affiliateUrl: "https://www.remitly.com",
    trustpilot: "4.3/5 (50K+)",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.55, fee: 15, markup: 1.3, speed: "Minutes", method: "GCash / Bank", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2095, fee: 20, markup: 1.2, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.82, fee: 15, markup: 1.2, speed: "Minutes", method: "Bank / UPI", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CNY", rate: 0.860, fee: 20, markup: 1.4, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "TWD", rate: 4.12, fee: 20, markup: 1.4, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "JPY", rate: 18.32, fee: 15, markup: 1.2, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "KRW", rate: 182.2, fee: 15, markup: 1.2, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "THB", rate: 4.36, fee: 15, markup: 1.4, speed: "1-2 days", method: "Bank / PromptPay", updatedAt: "2026-04-10" },
      { from: "HKD", to: "GBP", rate: 0.0972, fee: 15, markup: 1.3, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "AUD", rate: 0.198, fee: 15, markup: 1.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CAD", rate: 0.177, fee: 15, markup: 1.1, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "USD", rate: 0.127, fee: 15, markup: 1.2, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "worldremit",
    name: "WorldRemit",
    domain: "worldremit.com",
    brandColor: "#7B2D8E",
    tagline: "Mobile money & bank transfers",
    affiliateUrl: "https://www.worldremit.com",
    trustpilot: "4.1/5 (18K+)",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.50, fee: 20, markup: 2.0, speed: "Minutes-1 day", method: "GCash / Bank", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2080, fee: 25, markup: 1.9, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.75, fee: 20, markup: 1.8, speed: "1 day", method: "Bank / UPI", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CNY", rate: 0.855, fee: 25, markup: 1.9, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "TWD", rate: 4.10, fee: 25, markup: 1.9, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "JPY", rate: 18.20, fee: 20, markup: 1.9, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "KRW", rate: 181.0, fee: 20, markup: 1.9, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "THB", rate: 4.34, fee: 20, markup: 1.8, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "GBP", rate: 0.0967, fee: 20, markup: 1.8, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "AUD", rate: 0.196, fee: 20, markup: 2.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CAD", rate: 0.175, fee: 20, markup: 2.2, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "USD", rate: 0.126, fee: 20, markup: 1.9, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "ofx",
    name: "OFX",
    domain: "ofx.com",
    brandColor: "#1A3F7A",
    tagline: "No fees, good for large amounts",
    affiliateUrl: "https://www.ofx.com",
    trustpilot: "4.6/5 (5K+)",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.58, fee: 0, markup: 0.9, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2105, fee: 0, markup: 0.7, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.88, fee: 0, markup: 0.6, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CNY", rate: 0.866, fee: 0, markup: 0.7, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "TWD", rate: 4.15, fee: 0, markup: 0.7, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "JPY", rate: 18.42, fee: 0, markup: 0.7, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "KRW", rate: 183.2, fee: 0, markup: 0.7, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "THB", rate: 4.39, fee: 0, markup: 0.7, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "GBP", rate: 0.0978, fee: 0, markup: 0.7, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "AUD", rate: 0.199, fee: 0, markup: 0.5, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CAD", rate: 0.178, fee: 0, markup: 0.6, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "USD", rate: 0.1278, fee: 0, markup: 0.5, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "revolut",
    name: "Revolut",
    domain: "revolut.com",
    brandColor: "#0075EB",
    tagline: "App-based, good weekday rates",
    affiliateUrl: "https://www.revolut.com",
    trustpilot: "4.3/5 (180K+)",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.62, fee: 5, markup: 0.4, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2112, fee: 5, markup: 0.4, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.91, fee: 5, markup: 0.4, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CNY", rate: 0.868, fee: 5, markup: 0.5, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "TWD", rate: 4.16, fee: 5, markup: 0.5, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "JPY", rate: 18.48, fee: 5, markup: 0.4, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "KRW", rate: 183.8, fee: 5, markup: 0.4, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "THB", rate: 4.40, fee: 5, markup: 0.5, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "GBP", rate: 0.0981, fee: 5, markup: 0.4, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "AUD", rate: 0.199, fee: 5, markup: 0.4, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CAD", rate: 0.178, fee: 5, markup: 0.4, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "USD", rate: 0.1280, fee: 5, markup: 0.4, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
    ],
  },
  // --- HK Local ---
  {
    slug: "hsbc",
    name: "HSBC 滙豐",
    domain: "hsbc.com.hk",
    brandColor: "#DB0011",
    tagline: "Major HK bank, high fees",
    affiliateUrl: "https://www.hsbc.com.hk",
    trustpilot: "1.3/5 (5K+)",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.30, fee: 150, markup: 4.6, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2010, fee: 150, markup: 5.2, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.40, fee: 150, markup: 5.0, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CNY", rate: 0.850, fee: 100, markup: 2.5, speed: "1-2 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "TWD", rate: 3.98, fee: 150, markup: 4.8, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "JPY", rate: 17.70, fee: 100, markup: 4.6, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "KRW", rate: 176.0, fee: 100, markup: 4.6, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "THB", rate: 4.22, fee: 100, markup: 4.5, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "GBP", rate: 0.0942, fee: 100, markup: 4.4, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "AUD", rate: 0.191, fee: 150, markup: 4.5, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CAD", rate: 0.171, fee: 150, markup: 4.5, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "USD", rate: 0.1279, fee: 50, markup: 0.5, speed: "1-2 days", method: "Wire transfer", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "boc",
    name: "中銀 BOC",
    domain: "bochk.com",
    brandColor: "#C41230",
    tagline: "Best for HK→China corridor",
    affiliateUrl: "https://www.bochk.com",
    trustpilot: "—",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.28, fee: 120, markup: 4.8, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2000, fee: 120, markup: 5.7, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.38, fee: 120, markup: 5.2, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CNY", rate: 0.862, fee: 0, markup: 1.2, speed: "Same day", method: "BoC cross-border", updatedAt: "2026-04-10" },
      { from: "HKD", to: "TWD", rate: 3.95, fee: 120, markup: 5.5, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "JPY", rate: 17.65, fee: 80, markup: 4.9, speed: "1-3 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "KRW", rate: 175.5, fee: 80, markup: 4.9, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "THB", rate: 4.20, fee: 80, markup: 5.0, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "GBP", rate: 0.0940, fee: 80, markup: 4.6, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "AUD", rate: 0.190, fee: 120, markup: 5.0, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CAD", rate: 0.170, fee: 120, markup: 5.0, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "USD", rate: 0.1278, fee: 50, markup: 0.5, speed: "1-2 days", method: "Wire transfer", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "hang-seng",
    name: "恒生 Hang Seng",
    domain: "hangseng.com",
    brandColor: "#00573F",
    tagline: "Popular HK bank",
    affiliateUrl: "https://www.hangseng.com",
    trustpilot: "—",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.25, fee: 150, markup: 5.2, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2005, fee: 150, markup: 5.4, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.35, fee: 150, markup: 5.5, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CNY", rate: 0.848, fee: 65, markup: 2.7, speed: "1-2 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "TWD", rate: 3.96, fee: 150, markup: 5.3, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "JPY", rate: 17.68, fee: 100, markup: 4.7, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "KRW", rate: 175.8, fee: 100, markup: 4.7, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "THB", rate: 4.21, fee: 100, markup: 4.8, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "GBP", rate: 0.0941, fee: 100, markup: 4.5, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "AUD", rate: 0.190, fee: 150, markup: 5.0, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CAD", rate: 0.170, fee: 150, markup: 5.0, speed: "2-5 days", method: "Wire transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "USD", rate: 0.1276, fee: 50, markup: 0.7, speed: "1-2 days", method: "Wire transfer", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "panda-remit",
    name: "熊貓匯款 Panda Remit",
    domain: "pandaremit.com",
    brandColor: "#FF6B35",
    tagline: "Specialist for HK→China",
    affiliateUrl: "https://www.pandaremit.com",
    trustpilot: "4.2/5 (1K+)",
    corridors: [
      { from: "HKD", to: "CNY", rate: 0.869, fee: 0, markup: 0.3, speed: "Minutes", method: "Alipay / WeChat / Bank", updatedAt: "2026-04-10" },
      { from: "HKD", to: "PHP", rate: 7.55, fee: 10, markup: 1.3, speed: "1 day", method: "Bank transfer", updatedAt: "2026-04-10" },
    ],
  },
  // TNG Wallet removed — service terminated June 2025
  // --- Crypto ---
  {
    slug: "okx",
    name: "OKX",
    domain: "okx.com",
    brandColor: "#000000",
    crypto: true,
    tagline: "Crypto exchange, USDT transfers",
    affiliateUrl: "https://www.okx.com",
    trustpilot: "4.4/5 (30K+)",
    corridors: [
      { from: "HKD", to: "CNY", rate: 0.871, fee: 1, markup: 0.1, speed: "Minutes", method: "USDT → OTC sell", updatedAt: "2026-04-10" },
      { from: "HKD", to: "PHP", rate: 7.64, fee: 1, markup: 0.2, speed: "Minutes", method: "USDT transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2116, fee: 1, markup: 0.2, speed: "Minutes", method: "USDT transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.93, fee: 1, markup: 0.2, speed: "Minutes", method: "USDT → P2P sell", updatedAt: "2026-04-10" },
      { from: "HKD", to: "TWD", rate: 4.17, fee: 1, markup: 0.2, speed: "Minutes", method: "USDT transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "JPY", rate: 18.51, fee: 1, markup: 0.2, speed: "Minutes", method: "USDT transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "KRW", rate: 184.1, fee: 1, markup: 0.2, speed: "Minutes", method: "USDT transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "THB", rate: 4.41, fee: 1, markup: 0.2, speed: "Minutes", method: "USDT transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "GBP", rate: 0.0983, fee: 1, markup: 0.2, speed: "Minutes", method: "USDT transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "AUD", rate: 0.1996, fee: 1, markup: 0.2, speed: "Minutes", method: "USDT transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CAD", rate: 0.1786, fee: 1, markup: 0.2, speed: "Minutes", method: "USDT transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "USD", rate: 0.1282, fee: 1, markup: 0.2, speed: "Minutes", method: "USDT transfer", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "binance",
    name: "Binance",
    domain: "binance.com",
    brandColor: "#F0B90B",
    crypto: true,
    tagline: "Largest crypto exchange, P2P trading",
    affiliateUrl: "https://www.binance.com",
    trustpilot: "4.2/5 (25K+)",
    corridors: [
      { from: "HKD", to: "CNY", rate: 0.870, fee: 0, markup: 0.2, speed: "Minutes", method: "USDT → P2P sell", updatedAt: "2026-04-10" },
      { from: "HKD", to: "PHP", rate: 7.63, fee: 0, markup: 0.3, speed: "Minutes", method: "USDT → P2P sell", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2114, fee: 0, markup: 0.3, speed: "Minutes", method: "USDT → P2P sell", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.92, fee: 0, markup: 0.3, speed: "Minutes", method: "USDT → P2P sell", updatedAt: "2026-04-10" },
      { from: "HKD", to: "TWD", rate: 4.17, fee: 0, markup: 0.2, speed: "Minutes", method: "USDT → P2P sell", updatedAt: "2026-04-10" },
      { from: "HKD", to: "JPY", rate: 18.50, fee: 0, markup: 0.3, speed: "Minutes", method: "USDT → P2P sell", updatedAt: "2026-04-10" },
      { from: "HKD", to: "KRW", rate: 183.9, fee: 0, markup: 0.3, speed: "Minutes", method: "USDT → P2P sell", updatedAt: "2026-04-10" },
      { from: "HKD", to: "THB", rate: 4.41, fee: 0, markup: 0.2, speed: "Minutes", method: "USDT → P2P sell", updatedAt: "2026-04-10" },
      { from: "HKD", to: "GBP", rate: 0.0982, fee: 0, markup: 0.3, speed: "Minutes", method: "USDT → P2P sell", updatedAt: "2026-04-10" },
      { from: "HKD", to: "AUD", rate: 0.1994, fee: 0, markup: 0.3, speed: "Minutes", method: "USDT → P2P sell", updatedAt: "2026-04-10" },
      { from: "HKD", to: "CAD", rate: 0.1784, fee: 0, markup: 0.3, speed: "Minutes", method: "USDT → P2P sell", updatedAt: "2026-04-10" },
      { from: "HKD", to: "USD", rate: 0.1281, fee: 0, markup: 0.3, speed: "Minutes", method: "USDT → P2P sell", updatedAt: "2026-04-10" },
    ],
  },
];

export function calculateTransfer(
  provider: Provider,
  fromCurrency: string,
  toCurrency: string,
  amount: number
): { received: number; totalCost: number; fee: number; rate: number } | null {
  const corridor = provider.corridors.find(
    (c) => c.from === fromCurrency && c.to === toCurrency
  );
  if (!corridor) return null;

  const received = (amount - corridor.fee) * corridor.rate;
  const midRate = MID_MARKET_RATES[`${fromCurrency}-${toCurrency}`] || corridor.rate;
  const idealReceived = amount * midRate;
  const totalCost = idealReceived - received;

  return {
    received: Math.round(received),
    totalCost: Math.round(totalCost),
    fee: corridor.fee,
    rate: corridor.rate,
  };
}

export function getBestProviders(
  fromCurrency: string,
  toCurrency: string,
  amount: number
) {
  const all = PROVIDERS.map((provider) => ({
    provider,
    result: calculateTransfer(provider, fromCurrency, toCurrency, amount),
  })).filter((p) => p.result !== null);

  const traditional = all
    .filter((p) => !p.provider.crypto)
    .sort((a, b) => b.result!.received - a.result!.received);

  const crypto = all
    .filter((p) => p.provider.crypto)
    .sort((a, b) => b.result!.received - a.result!.received);

  return { traditional, crypto };
}

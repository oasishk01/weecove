"use client";

import { useState, useEffect, useCallback } from "react";
import BottomNav from "@/app/components/BottomNav";
import { useAuth } from "@/lib/useAuth";

const BITLABS_TOKEN = "7da40458-f61d-47b0-92ee-5fb2a3640966";
const AYET_ADSLOT = "26442";

type Tab = "tasks" | "surveys" | "polls";
type TaskFilter = "all" | "signups" | "apps" | "premium";

interface Offer {
  id: string;
  title: string;
  description: string;
  payout: number;
  userReward: number;
  category: string;
  categoryLabel: string;
  icon: string;
  instruction: string;
  country: string;
  link: string;
  photo: string;
  tier: "quick" | "standard" | "premium";
}

interface OffersData {
  signups: Offer[];
  apps: Offer[];
  premium: Offer[];
  all: Offer[];
  total: number;
  detectedCountry: string | null;
}

const TIER_CONFIG = {
  quick: { label: "Easy", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  standard: { label: "Medium", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  premium: { label: "High", color: "bg-purple-100 text-purple-700", dot: "bg-purple-500" },
};

const FILTER_CONFIG: { key: TaskFilter; label: string; emoji: string }[] = [
  { key: "all", label: "All", emoji: "🔥" },
  { key: "signups", label: "Sign-ups", emoji: "📝" },
  { key: "apps", label: "Apps", emoji: "📱" },
  { key: "premium", label: "Premium", emoji: "💎" },
];

function OfferCard({ offer, userId }: { offer: Offer; userId: string }) {
  const tier = TIER_CONFIG[offer.tier];
  const offerUrl = offer.link.replace("{USER_ID}", userId);

  return (
    <a
      href={offerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl border border-zinc-100 p-4 active:scale-[0.98] transition-transform"
    >
      <div className="flex gap-3">
        <div className="w-14 h-14 rounded-xl bg-zinc-100 overflow-hidden shrink-0">
          {offer.photo ? (
            <img src={offer.photo} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">
              {offer.icon === "mail" ? "📝" : offer.icon === "download" ? "📱" : "💎"}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tier.color}`}>
              {tier.label}
            </span>
            <span className="text-xs text-zinc-400">{offer.categoryLabel}</span>
          </div>
          <p className="font-semibold text-zinc-900 text-sm mt-1 truncate">{offer.instruction}</p>
          <p className="text-xs text-zinc-400 mt-0.5 truncate">{offer.title}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-emerald-600">
            ${offer.userReward.toFixed(2)}
          </p>
          <p className="text-xs text-zinc-400">USD</p>
        </div>
      </div>
    </a>
  );
}

const COUNTRY_NAMES: Record<string, string> = {
  PH: "Philippines", ID: "Indonesia", PK: "Pakistan", NP: "Nepal",
  IN: "India", HK: "Hong Kong", US: "United States", GB: "United Kingdom",
  AU: "Australia", CA: "Canada", SG: "Singapore", MY: "Malaysia",
  AE: "UAE", SA: "Saudi Arabia", QA: "Qatar", KW: "Kuwait",
};

function TaskBrowser({ userId }: { userId: string }) {
  const [offers, setOffers] = useState<OffersData | null>(null);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadOffers = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/offers");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOffers(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadOffers(); }, [loadOffers]);

  const filteredOffers = offers
    ? filter === "all" ? offers.all
    : filter === "signups" ? offers.signups
    : filter === "apps" ? offers.apps
    : offers.premium
    : [];

  return (
    <div className="px-4 py-4 space-y-3">
      {/* Country indicator */}
      {offers?.detectedCountry && (
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <span>📍</span>
          Showing tasks for {COUNTRY_NAMES[offers.detectedCountry] || offers.detectedCountry}
        </div>
      )}

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {FILTER_CONFIG.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f.key
                ? "bg-emerald-600 text-white"
                : "bg-white text-zinc-600 border border-zinc-200"
            }`}
          >
            <span>{f.emoji}</span>
            {f.label}
            {offers && (
              <span className={`text-xs ${filter === f.key ? "text-emerald-200" : "text-zinc-400"}`}>
                {f.key === "all" ? offers.total
                  : f.key === "signups" ? offers.signups.length
                  : f.key === "apps" ? offers.apps.length
                  : offers.premium.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-zinc-100 p-4 animate-pulse">
              <div className="flex gap-3">
                <div className="w-14 h-14 rounded-xl bg-zinc-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-zinc-200 rounded w-20" />
                  <div className="h-4 bg-zinc-200 rounded w-40" />
                </div>
                <div className="h-6 bg-zinc-200 rounded w-14" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-12">
          <p className="text-zinc-500">Failed to load tasks</p>
          <button onClick={loadOffers} className="mt-2 text-emerald-600 font-medium text-sm">
            Try again
          </button>
        </div>
      )}

      {/* Offers list */}
      {!loading && !error && filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-2xl mb-2">🔍</p>
          <p className="text-zinc-500 text-sm">No tasks in this category right now</p>
        </div>
      )}

      {!loading && !error && filteredOffers.length > 0 && (
        <div className="space-y-2">
          {filteredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} userId={userId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function EarnPage() {
  const auth = useAuth();
  const [tab, setTab] = useState<Tab>("tasks");
  const userId = auth?.id ?? "";

  const bitlabsUrl = userId
    ? `https://web.bitlabs.ai/?token=${BITLABS_TOKEN}&uid=${userId}`
    : "";

  const ayetUrl = userId
    ? `https://surveys.ayet.io/?adSlot=${AYET_ADSLOT}&external_identifier=${userId}`
    : "";

  const tabs: { key: Tab; label: string; emoji: string }[] = [
    { key: "tasks", label: "Tasks", emoji: "🎯" },
    { key: "surveys", label: "Surveys", emoji: "📊" },
    { key: "polls", label: "Polls", emoji: "⚡" },
  ];

  return (
    <div className="flex flex-col min-h-full bg-zinc-50">
      <header className="bg-white px-4 pt-12 pb-3 border-b border-zinc-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Earn</h1>
            <p className="text-zinc-500 text-sm mt-0.5">Complete tasks, get paid</p>
          </div>
        </div>

        <div className="flex gap-1.5 mt-4 bg-zinc-100 p-1 rounded-xl">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                tab === t.key
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500"
              }`}
            >
              <span>{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 pb-20">
        {!userId ? (
          <SignupPrompt />
        ) : tab === "tasks" ? (
          <TaskBrowser userId={userId} />
        ) : tab === "surveys" ? (
          <div>
            <div className="px-4 pt-3 pb-1">
              <p className="text-xs text-zinc-400 bg-zinc-100 rounded-lg px-3 py-2">
                Surveys match your profile. If one isn&apos;t available, try the next one — you&apos;ll usually find a match within a few tries.
              </p>
            </div>
            <iframe
              src={bitlabsUrl}
              className="w-full border-0"
              style={{ height: "calc(100vh - 220px)", minHeight: "500px" }}
              allow="clipboard-write"
            />
          </div>
        ) : (
          <div>
            <div className="px-4 pt-3 pb-1">
              <p className="text-xs text-zinc-400 bg-zinc-100 rounded-lg px-3 py-2">
                Polls are matched by country and profile. Some may not be available in your region — just skip and try the next one.
              </p>
            </div>
            <iframe
              src={ayetUrl}
              className="w-full border-0"
              style={{ height: "calc(100vh - 220px)", minHeight: "500px" }}
              allow="clipboard-write"
            />
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

function SignupPrompt() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="text-5xl mb-4">🦦</div>
      <h2 className="text-xl font-bold text-zinc-900">Sign up to start earning</h2>
      <p className="text-zinc-500 text-sm mt-2 max-w-xs leading-relaxed">
        Create a free account to access hundreds of tasks and earn money from your phone.
      </p>
      <a
        href="/signup"
        className="mt-6 bg-emerald-600 text-white font-semibold rounded-xl px-8 py-3.5 hover:bg-emerald-700 transition-colors"
      >
        Sign Up Free
      </a>
      <p className="mt-4 text-zinc-400 text-xs">
        Already have an account? <a href="/login" className="text-emerald-600 font-medium">Log in</a>
      </p>
    </div>
  );
}

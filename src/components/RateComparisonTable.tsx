"use client";

import { useState } from "react";
import Image from "next/image";
import { getBestProviders, getProviderLogo } from "@/lib/remittance-data";
import { useI18n } from "@/lib/i18n";

const CURRENCY_SYMBOLS: Record<string, string> = {
  HKD: "HK$",
  PHP: "₱",
  IDR: "Rp",
  INR: "₹",
};

const CORRIDORS = [
  { from: "HKD", to: "PHP", label: "🇵🇭 Philippines (PHP)" },
  { from: "HKD", to: "IDR", label: "🇮🇩 Indonesia (IDR)" },
  { from: "HKD", to: "INR", label: "🇮🇳 India (INR)" },
];

function Stars({ rating }: { rating: number }) {
  const stars = Math.round(rating / 2);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i <= stars ? "text-amber-400" : "text-zinc-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Extract numeric rating from trustpilot string like "4.5/5 (230K+ reviews)"
function parseRating(tp: string): number {
  const match = tp.match(/^([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

export function RateComparisonTable({
  from: defaultFrom = "HKD",
  to: defaultTo = "PHP",
  defaultAmount = 10000,
  showCorridorPicker = false,
}: {
  from?: string;
  to?: string;
  defaultAmount?: number;
  showCorridorPicker?: boolean;
}) {
  const { t } = useI18n();
  const [amount, setAmount] = useState(defaultAmount);
  const [corridor, setCorridor] = useState({ from: defaultFrom, to: defaultTo });
  const from = showCorridorPicker ? corridor.from : defaultFrom;
  const to = showCorridorPicker ? corridor.to : defaultTo;

  const results = getBestProviders(from, to, amount);
  const bestReceived = results[0]?.result?.received ?? 0;
  const worstReceived = results[results.length - 1]?.result?.received ?? 0;
  const savings = bestReceived - worstReceived;

  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
      {/* Input area */}
      <div className="bg-gradient-to-r from-zinc-50 to-white p-4 border-b border-zinc-200">
        {/* Corridor picker */}
        {showCorridorPicker && (
          <div className="mb-3">
            <label className="block text-[10px] font-medium text-zinc-400 uppercase tracking-wider mb-1">
              Destination
            </label>
            <select
              value={`${corridor.from}-${corridor.to}`}
              onChange={(e) => {
                const [f, t] = e.target.value.split("-");
                setCorridor({ from: f, to: t });
              }}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm font-medium text-zinc-900"
            >
              {CORRIDORS.map((c) => (
                <option key={`${c.from}-${c.to}`} value={`${c.from}-${c.to}`}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <label className="block text-xs font-medium text-zinc-600 mb-2">
          {t("table.yousend")}
        </label>
        <div className="flex items-center gap-2 bg-white border border-zinc-300 rounded-lg px-3 py-2 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
          <span className="text-zinc-500 text-lg font-medium">{CURRENCY_SYMBOLS[from]}</span>
          <input
            type="text"
            inputMode="numeric"
            value={amount === 0 ? "" : amount.toLocaleString()}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, "");
              setAmount(raw === "" ? 0 : parseInt(raw, 10));
            }}
            placeholder="10,000"
            className="text-2xl font-bold bg-transparent border-none outline-none w-full text-zinc-900 placeholder:text-zinc-300"
          />
          <span className="text-xs font-medium text-zinc-400 shrink-0 bg-zinc-100 px-2 py-1 rounded">{from} → {to}</span>
        </div>
      </div>

      {/* Savings bar */}
      {savings > 0 && (
        <div className="bg-emerald-600 text-white px-4 py-2 text-center text-sm font-medium">
          {t("table.savings")} {CURRENCY_SYMBOLS[to]}{savings.toLocaleString()}
        </div>
      )}

      {/* Provider rows */}
      <div className="divide-y divide-zinc-100">
        {results.map(({ provider, result }, i) => {
          if (!result) return null;
          const isBest = i === 0;
          const diff = bestReceived - result.received;
          const corridor = provider.corridors.find(c => c.from === from && c.to === to);
          const yearlyLoss = diff * 12;
          const rating = parseRating(provider.trustpilot);

          return (
            <div
              key={provider.slug}
              className={`p-4 transition-colors ${isBest ? "bg-emerald-50/70" : "hover:bg-zinc-50"}`}
            >
              <div className="flex items-start gap-3">
                {/* Logo */}
                <div className="relative shrink-0">
                  <Image
                    src={getProviderLogo(provider.domain)}
                    alt={provider.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-lg"
                  />
                  {isBest && (
                    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[9px] font-bold px-1 py-0.5 rounded leading-none">
                      #1
                    </span>
                  )}
                </div>

                {/* Name + stars */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900">{provider.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Stars rating={rating} />
                    <span className="text-[10px] text-zinc-400">{provider.trustpilot}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-0.5 block">
                    {corridor?.speed} · {corridor?.method}
                  </span>
                </div>

                {/* Amount */}
                <div className="text-right shrink-0">
                  <div className={`text-lg font-bold ${isBest ? "text-emerald-700" : "text-zinc-900"}`}>
                    {CURRENCY_SYMBOLS[to]}{result.received.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    Fee {CURRENCY_SYMBOLS[from]}{result.fee}
                  </div>
                </div>
              </div>

              {/* Savings indicator + CTA */}
              <div className="mt-2.5 flex items-center justify-between">
                {isBest ? (
                  <span className="text-xs text-emerald-600 font-medium">
                    ✓ {t("table.best")}
                  </span>
                ) : (
                  <span className="text-xs text-zinc-400">
                    {diff > 0 ? `${CURRENCY_SYMBOLS[to]}${diff.toLocaleString()} less received` : ""}
                  </span>
                )}
                <a
                  href={provider.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isBest
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  {isBest ? t("table.sendnow") : t("table.compare")}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-2.5 bg-zinc-50 border-t border-zinc-200">
        <p className="text-[10px] text-zinc-400 leading-relaxed">
          {t("table.disclaimer")}
        </p>
      </div>
    </div>
  );
}

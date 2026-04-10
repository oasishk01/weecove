"use client";

import { useState } from "react";
import Image from "next/image";
import { getBestProviders, getProviderLogo } from "@/lib/remittance-data";

const CURRENCY_SYMBOLS: Record<string, string> = {
  HKD: "HK$",
  PHP: "₱",
  IDR: "Rp",
  INR: "₹",
};

export function RateComparisonTable({
  from = "HKD",
  to = "PHP",
  defaultAmount = 10000,
}: {
  from?: string;
  to?: string;
  defaultAmount?: number;
}) {
  const [amount, setAmount] = useState(defaultAmount);
  const results = getBestProviders(from, to, amount);

  const bestReceived = results[0]?.result?.received ?? 0;
  const worstReceived = results[results.length - 1]?.result?.received ?? 0;
  const savings = bestReceived - worstReceived;

  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
      {/* Amount input */}
      <div className="bg-gradient-to-r from-zinc-50 to-white p-4 border-b border-zinc-200">
        <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">
          You send
        </label>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-lg font-medium">{CURRENCY_SYMBOLS[from]}</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="text-2xl font-bold bg-transparent border-none outline-none w-full text-zinc-900"
            min={100}
            step={1000}
          />
          <div className="text-right shrink-0">
            <div className="text-xs font-medium text-zinc-500">{from} → {to}</div>
          </div>
        </div>
      </div>

      {/* Savings highlight */}
      {savings > 0 && (
        <div className="bg-emerald-600 text-white px-4 py-2 text-center text-sm font-medium">
          揀最平可以多收 {CURRENCY_SYMBOLS[to]}{savings.toLocaleString()} · Choose wisely, receive more
        </div>
      )}

      {/* Results */}
      <div className="divide-y divide-zinc-100">
        {results.map(({ provider, result }, i) => {
          if (!result) return null;
          const isBest = i === 0;
          const isWorst = i === results.length - 1;
          const corridor = provider.corridors.find(c => c.from === from && c.to === to);

          return (
            <div
              key={provider.slug}
              className={`p-4 transition-colors ${isBest ? "bg-emerald-50/70" : "hover:bg-zinc-50"}`}
            >
              {/* Mobile: stacked layout */}
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

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900">{provider.name}</span>
                    <span className="text-[10px] text-zinc-400">{provider.trustpilot}</span>
                  </div>

                  {/* Speed + Method */}
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-zinc-500">
                      {corridor?.speed} · {corridor?.method}
                    </span>
                  </div>
                </div>

                {/* Amount + CTA */}
                <div className="text-right shrink-0">
                  <div className={`text-lg font-bold ${isBest ? "text-emerald-700" : "text-zinc-900"}`}>
                    {CURRENCY_SYMBOLS[to]}{result.received.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">
                    Fee {CURRENCY_SYMBOLS[from]}{result.fee} · Rate {result.rate}
                  </div>
                </div>
              </div>

              {/* CTA row */}
              <div className="mt-3 flex items-center justify-between">
                {isWorst && savings > 0 ? (
                  <span className="text-xs text-red-500 font-medium">
                    -{CURRENCY_SYMBOLS[to]}{savings.toLocaleString()} vs best
                  </span>
                ) : isBest ? (
                  <span className="text-xs text-emerald-600 font-medium">
                    Best rate available
                  </span>
                ) : (
                  <span className="text-xs text-zinc-400">
                    -{CURRENCY_SYMBOLS[to]}{(bestReceived - result.received).toLocaleString()} vs best
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
                  {isBest ? "Send now →" : "Compare →"}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-3 bg-zinc-50 border-t border-zinc-200">
        <p className="text-[10px] text-zinc-400 leading-relaxed">
          Rates are indicative and updated regularly. Actual rates may vary at time of transfer.
          WeeCove is independent and not owned by any money transfer provider.
          Some links are affiliate links. We may earn a commission at no extra cost to you.
        </p>
      </div>
    </div>
  );
}

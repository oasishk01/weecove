"use client";

import { useState } from "react";
import Image from "next/image";
import { getBestProviders, getProviderLogo } from "@/lib/remittance-data";

const CURRENCY_NAMES: Record<string, string> = {
  HKD: "Hong Kong Dollar",
  PHP: "Philippine Peso",
  IDR: "Indonesian Rupiah",
  INR: "Indian Rupee",
};

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

  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden">
      {/* Amount input */}
      <div className="bg-zinc-50 p-4 border-b border-zinc-200">
        <label className="block text-sm font-medium text-zinc-600 mb-1">
          You send
        </label>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-lg">{CURRENCY_SYMBOLS[from]}</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="text-2xl font-bold bg-transparent border-none outline-none w-full text-zinc-900"
            min={100}
            step={1000}
          />
          <span className="text-sm text-zinc-500 whitespace-nowrap">
            {from} → {to}
          </span>
        </div>
      </div>

      {/* Results table */}
      <div className="divide-y divide-zinc-100">
        {results.map(({ provider, result }, i) => {
          if (!result) return null;
          const isBest = i === 0;
          return (
            <div
              key={provider.slug}
              className={`p-4 flex items-center gap-4 ${isBest ? "bg-emerald-50" : "hover:bg-zinc-50"} transition-colors`}
            >
              {/* Rank + Logo */}
              <div className="flex items-center gap-3 min-w-[140px]">
                {isBest && (
                  <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                    BEST
                  </span>
                )}
                <Image
                  src={getProviderLogo(provider.domain)}
                  alt={provider.name}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-lg shrink-0"
                />
                <div>
                  <div className="font-semibold text-zinc-900">{provider.name}</div>
                  <div className="text-xs text-zinc-500">{provider.trustpilot}</div>
                </div>
              </div>

              {/* Amount received */}
              <div className="flex-1 text-right">
                <div className="text-lg font-bold text-zinc-900">
                  {CURRENCY_SYMBOLS[to]}{result.received.toLocaleString()}
                </div>
                <div className="text-xs text-zinc-500">
                  Fee: {CURRENCY_SYMBOLS[from]}{result.fee} · Rate: {result.rate}
                </div>
              </div>

              {/* Speed */}
              <div className="hidden sm:block text-right min-w-[80px]">
                <div className="text-sm text-zinc-700">
                  {provider.corridors.find(c => c.from === from && c.to === to)?.speed}
                </div>
                <div className="text-xs text-zinc-500">
                  {provider.corridors.find(c => c.from === from && c.to === to)?.method}
                </div>
              </div>

              {/* CTA */}
              <a
                href={provider.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${
                  isBest
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                } transition-colors`}
              >
                Send now →
              </a>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-3 bg-zinc-50 border-t border-zinc-200">
        <p className="text-xs text-zinc-400">
          Rates are indicative and updated weekly. Actual rates may vary at time of transfer.
          WeeCove is independent and not owned by any money transfer provider.
          Some links are affiliate links — we may earn a commission at no cost to you.
        </p>
      </div>
    </div>
  );
}

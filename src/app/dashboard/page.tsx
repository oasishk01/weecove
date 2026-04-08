"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BottomNav from "@/app/components/BottomNav";

const MOCK_USER = { name: "Maria", country: "PH" as const };
const MOCK_BALANCE = { available: 3.2, pending: 0.8 };
const TASKS = [
  { name: "Watch short video", payout: 0.15, tag: "Ad", color: "bg-pink-50 text-pink-600" },
  { name: "Quick survey (2 min)", payout: 0.5, tag: "Survey", color: "bg-blue-50 text-blue-600" },
  { name: "Try this app", payout: 2, tag: "App", color: "bg-amber-50 text-amber-600" },
];
const CASHOUTS = [
  { name: "Grace T.", amount: 42 },
  { name: "Ahmed R.", amount: 40 },
];

const RATES: Record<string, { rate: number; symbol: string }> = {
  PH: { rate: 7.24, symbol: "₱" },
  ID: { rate: 2050, symbol: "Rp" },
  PK: { rate: 35.8, symbol: "Rs" },
  NP: { rate: 17.2, symbol: "Rs" },
  IN: { rate: 10.8, symbol: "₹" },
  OTHER: { rate: 0.128, symbol: "$" },
};

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const user = MOCK_USER;
  const bal = MOCK_BALANCE;
  const r = RATES[user.country] || RATES.OTHER;
  const converted = Math.round(bal.available * r.rate);

  return (
    <div className="flex flex-col min-h-full bg-zinc-50">
      {/* Balance header */}
      <header className="bg-emerald-600 px-6 pt-14 pb-10">
        <p className="text-emerald-200 text-sm">{"Welcome back, " + user.name}</p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-white text-4xl font-extrabold tabular-nums">
            {"HK$ " + bal.available.toFixed(2)}
          </span>
        </div>
        <p className="text-emerald-300 text-sm mt-1 tabular-nums">
          {r.symbol + " " + converted.toLocaleString()}
          {bal.pending > 0 && (
            <span className="text-emerald-400 ml-3">
              {"+" + bal.pending.toFixed(0) + " pending"}
            </span>
          )}
        </p>
      </header>

      {/* Action buttons — overlapping header */}
      <div className="px-6 -mt-5">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Link href="/earn" className="flex-1 bg-white rounded-xl py-3.5 text-center font-semibold text-emerald-700 shadow-md shadow-emerald-900/8 active:scale-[0.98] transition-transform">
            <svg className="w-5 h-5 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>
            Earn
          </Link>
          <Link href="/cashout" className="flex-1 bg-white rounded-xl py-3.5 text-center font-semibold text-zinc-700 shadow-md shadow-zinc-900/5 active:scale-[0.98] transition-transform">
            <svg className="w-5 h-5 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Cash Out
          </Link>
          <Link href="/referral" className="flex-1 bg-white rounded-xl py-3.5 text-center font-semibold text-zinc-700 shadow-md shadow-zinc-900/5 active:scale-[0.98] transition-transform">
            <svg className="w-5 h-5 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
            Invite
          </Link>
        </div>
      </div>

      <main className="flex-1 px-6 pt-6 pb-20 max-w-lg mx-auto w-full space-y-8">
        {/* Tasks */}
        <section>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-bold text-zinc-900">Available tasks</h2>
            <Link href="/earn" className="text-emerald-600 text-sm font-medium">See all</Link>
          </div>
          {TASKS.map((t, i) => (
            <Link key={i} href="/earn" className="flex items-center justify-between py-3.5 border-b border-zinc-100 last:border-0 active:bg-zinc-50 transition-colors -mx-1 px-1 rounded">
              <div className="flex items-center gap-3">
                <span className={"text-[11px] font-semibold px-2 py-0.5 rounded-full " + t.color}>{t.tag}</span>
                <span className="text-zinc-800 font-medium text-[15px]">{t.name}</span>
              </div>
              <span className="font-semibold text-zinc-900 tabular-nums text-[15px]">{"HK$ " + t.payout}</span>
            </Link>
          ))}
        </section>

        {/* Referral banner */}
        <section>
          <Link href="/referral" className="block bg-zinc-900 rounded-2xl p-5 active:bg-zinc-800 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">Invite a friend</p>
                <p className="text-zinc-400 text-sm mt-0.5">You both get HK$ 5</p>
              </div>
              <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </div>
            <div className="mt-3 bg-zinc-800 rounded-lg px-3 py-2 text-zinc-300 text-sm font-mono">
              {"weecove.com/r/" + user.name.toLowerCase()}
            </div>
          </Link>
        </section>

        {/* Recent activity */}
        <section>
          <h2 className="font-bold text-zinc-900 mb-3">Recent cashouts</h2>
          {CASHOUTS.map((c, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                  {c.name.charAt(0)}
                </div>
                <span className="text-zinc-700 text-[15px]">{c.name}</span>
              </div>
              <span className="font-medium text-emerald-700 tabular-nums text-[15px]">{"HK$ " + c.amount}</span>
            </div>
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

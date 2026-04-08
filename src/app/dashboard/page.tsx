"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BottomNav from "@/app/components/BottomNav";
import { useAuth, logout } from "@/lib/useAuth";
import { getSupabase } from "@/lib/supabase";

const RATES: Record<string, { rate: number; symbol: string }> = {
  PH: { rate: 7.24, symbol: "₱" },
  ID: { rate: 2050, symbol: "Rp" },
  PK: { rate: 35.8, symbol: "Rs" },
  NP: { rate: 17.2, symbol: "Rs" },
  IN: { rate: 10.8, symbol: "₹" },
  OTHER: { rate: 0.128, symbol: "$" },
};

interface UserProfile {
  name: string;
  country: string;
  referral_code: string;
}

interface Balance {
  available: number;
  pending: number;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  created_at: string;
}

export default function DashboardPage() {
  const auth = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [balance, setBalance] = useState<Balance>({ available: 0, pending: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;
    const supabase = getSupabase();

    async function load() {
      const [userRes, balRes, txRes] = await Promise.all([
        supabase.from("users").select("name, country, referral_code").eq("id", auth!.id).single(),
        supabase.from("balances").select("available, pending").eq("user_id", auth!.id).single(),
        supabase.from("transactions").select("id, type, amount, description, created_at").eq("user_id", auth!.id).order("created_at", { ascending: false }).limit(5),
      ]);

      if (userRes.data) setProfile(userRes.data);
      if (balRes.data) setBalance(balRes.data);
      if (txRes.data) setTransactions(txRes.data);
      setLoading(false);
    }
    load();
  }, [auth]);

  if (!auth || loading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  const name = profile?.name || "there";
  const country = profile?.country || "OTHER";
  const referralCode = profile?.referral_code || auth.referral_code;
  const r = RATES[country] || RATES.OTHER;
  const converted = Math.round(balance.available * r.rate);

  return (
    <div className="flex flex-col min-h-full bg-zinc-50">
      <header className="bg-emerald-600 px-6 pt-14 pb-10">
        <div className="flex items-center justify-between">
          <p className="text-emerald-200 text-sm">{"Welcome back, " + name}</p>
          <button onClick={logout} className="text-emerald-300 text-xs hover:text-white transition-colors">
            Log out
          </button>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-white text-4xl font-extrabold tabular-nums">
            {"HK$ " + balance.available.toFixed(2)}
          </span>
        </div>
        <p className="text-emerald-300 text-sm mt-1 tabular-nums">
          {r.symbol + " " + converted.toLocaleString()}
          {balance.pending > 0 && (
            <span className="text-emerald-400 ml-3">
              {"+" + balance.pending.toFixed(2) + " pending"}
            </span>
          )}
        </p>
      </header>

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
              {"weecove.com/r/" + referralCode}
            </div>
          </Link>
        </section>

        {/* Recent activity */}
        <section>
          <h2 className="font-bold text-zinc-900 mb-3">Recent activity</h2>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-zinc-400 text-sm">No activity yet. Start earning!</p>
              <Link href="/earn" className="mt-3 inline-block text-emerald-600 text-sm font-medium">Go to Earn →</Link>
            </div>
          ) : (
            transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0">
                <div>
                  <p className="text-zinc-800 text-[15px] font-medium">{tx.description}</p>
                  <p className="text-zinc-400 text-xs mt-0.5">{new Date(tx.created_at).toLocaleDateString()}</p>
                </div>
                <span className={"font-semibold tabular-nums text-[15px] " + (tx.amount >= 0 ? "text-emerald-700" : "text-zinc-500")}>
                  {(tx.amount >= 0 ? "+" : "") + "HK$ " + Math.abs(tx.amount).toFixed(2)}
                </span>
              </div>
            ))
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

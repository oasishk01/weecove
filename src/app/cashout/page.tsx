"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BottomNav from "@/app/components/BottomNav";
import { useAuth } from "@/lib/useAuth";
import { getSupabase } from "@/lib/supabase";

const MIN_CASHOUT = 40;

const METHODS = [
  { id: "paypal" as const, name: "PayPal", desc: "Receive to your PayPal email" },
  { id: "gcash" as const, name: "GCash", desc: "Philippines only" },
  { id: "wise" as const, name: "Wise", desc: "Low-fee international transfer" },
];

export default function CashoutPage() {
  const auth = useAuth();
  const [balance, setBalance] = useState(0);
  const [method, setMethod] = useState<"paypal" | "gcash" | "wise" | "">("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [gcashNumber, setGcashNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth) return;
    const supabase = getSupabase();
    supabase
      .from("balances")
      .select("available")
      .eq("user_id", auth.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setBalance(Number(data.available));
          if (Number(data.available) >= MIN_CASHOUT) {
            setAmount(data.available.toString());
          }
        }
        setPageLoading(false);
      });
  }, [auth]);

  const canCashout = balance >= MIN_CASHOUT;
  const amountNum = parseFloat(amount) || 0;
  const isValid = canCashout && amountNum >= MIN_CASHOUT && amountNum <= balance && method !== "" &&
    (method !== "paypal" || paypalEmail.includes("@")) &&
    (method !== "gcash" || gcashNumber.length >= 10);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || !auth) return;
    setLoading(true);
    setError("");
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (auth.token) headers["Authorization"] = `Bearer ${auth.token}`;
      const res = await fetch("/api/cashout", {
        method: "POST",
        headers,
        body: JSON.stringify({
          user_id: auth.id,
          amount: amountNum, method,
          paypal_email: method === "paypal" ? paypalEmail : null,
          gcash_number: method === "gcash" ? gcashNumber : null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!auth || pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-2xl font-bold">Cash Out Requested</h1>
        <p className="text-zinc-500 mt-2 max-w-xs">
          {"HK$ " + amountNum.toFixed(2) + " via " + method + ". You'll receive it within 24-48 hours."}
        </p>
        <Link href="/dashboard" className="mt-8 bg-emerald-600 text-white font-semibold rounded-xl px-6 py-3 hover:bg-emerald-700 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-zinc-50">
      <header className="bg-white px-6 pt-12 pb-6 border-b border-zinc-100">
        <h1 className="text-2xl font-bold">Cash Out</h1>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-sm text-zinc-500">Available</span>
          <span className="text-2xl font-bold text-zinc-900 tabular-nums">{"HK$ " + balance.toFixed(2)}</span>
        </div>
        {!canCashout && (
          <p className="mt-3 text-amber-700 text-sm bg-amber-50 rounded-lg px-3 py-2">
            {"Minimum HK$ " + MIN_CASHOUT + ". Keep earning!"}
          </p>
        )}
      </header>

      <form onSubmit={handleSubmit} className="flex-1 px-6 py-6 space-y-6 max-w-lg mx-auto w-full pb-24">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Amount (HK$)</label>
          <input
            type="number" min={MIN_CASHOUT} max={balance} step="0.01"
            value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder={"Min HK$ " + MIN_CASHOUT} disabled={!canCashout}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Method</label>
          {METHODS.map((m) => (
            <button
              key={m.id} type="button" onClick={() => setMethod(m.id)}
              className={"w-full flex items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left transition-colors mb-2 " +
                (method === m.id ? "border-emerald-500 bg-emerald-50" : "border-zinc-200 bg-white")}
            >
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-zinc-500 text-sm">{m.desc}</p>
              </div>
              {method === m.id && (
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              )}
            </button>
          ))}
        </div>

        {method === "paypal" && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">PayPal email</label>
            <input type="email" required value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)}
              placeholder="your@paypal.com"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
        )}
        {method === "gcash" && (
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">GCash number</label>
            <input type="tel" required value={gcashNumber} onChange={(e) => setGcashNumber(e.target.value)}
              placeholder="09XX XXX XXXX"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
        )}
        {method === "wise" && (
          <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-medium">Save on fees with Wise</p>
            <p className="mt-1">~1% fee vs 5-8% at Western Union.</p>
          </div>
        )}

        {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg px-4 py-2">{error}</p>}

        <button type="submit" disabled={!isValid || loading}
          className="w-full rounded-xl bg-emerald-600 text-white font-semibold text-lg py-3.5 hover:bg-emerald-700 transition-colors disabled:opacity-50">
          {loading ? "Processing..." : "Cash Out HK$ " + (amountNum > 0 ? amountNum.toFixed(2) : "0.00")}
        </button>
      </form>

      <BottomNav />
    </div>
  );
}

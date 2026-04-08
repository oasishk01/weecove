"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/app/components/BottomNav";
import { useAuth } from "@/lib/useAuth";
import { getSupabase } from "@/lib/supabase";

interface ReferralEntry {
  name: string;
  date: string;
  earned: number;
}

export default function ReferralPage() {
  const auth = useAuth();
  const [referralCode, setReferralCode] = useState("");
  const [totalReferred, setTotalReferred] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [referrals, setReferrals] = useState<ReferralEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;
    const supabase = getSupabase();

    async function load() {
      // Get user's referral code
      const { data: user } = await supabase
        .from("users")
        .select("referral_code")
        .eq("id", auth!.id)
        .single();

      if (user) setReferralCode(user.referral_code);

      // Get referrals
      const { data: refs } = await supabase
        .from("referrals")
        .select("referred_id, created_at")
        .eq("referrer_id", auth!.id);

      if (refs && refs.length > 0) {
        setTotalReferred(refs.length);

        // Get referred users' names
        const referredIds = refs.map(r => r.referred_id);
        const { data: users } = await supabase
          .from("users")
          .select("id, name")
          .in("id", referredIds);

        const nameMap: Record<string, string> = {};
        users?.forEach(u => { nameMap[u.id] = u.name; });

        setReferrals(refs.map(r => ({
          name: nameMap[r.referred_id] || "User",
          date: new Date(r.created_at).toLocaleDateString(),
          earned: 5,
        })));
      }

      // Get total earned from referrals
      const { data: commissions } = await supabase
        .from("transactions")
        .select("amount")
        .eq("user_id", auth!.id)
        .in("type", ["referral_bonus", "referral_commission"]);

      if (commissions) {
        const total = commissions.reduce((sum, tx) => sum + Number(tx.amount), 0);
        setTotalEarned(total);
      }

      setLoading(false);
    }
    load();
  }, [auth]);

  const referralLink = "weecove.com/r/" + referralCode;

  function copyLink() {
    navigator.clipboard.writeText("https://" + referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareLink() {
    if (navigator.share) {
      navigator.share({
        title: "WeeCove",
        text: "I earn extra cash with WeeCove. Sign up with my link and we both get HK$5!",
        url: "https://" + referralLink,
      });
    } else {
      copyLink();
    }
  }

  if (!auth || loading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-zinc-50">
      <header className="bg-white px-6 pt-12 pb-6 border-b border-zinc-100">
        <h1 className="text-2xl font-bold">Invite Friends</h1>
        <p className="text-zinc-500 text-sm mt-1">Earn together. You both get HK$ 5.</p>
      </header>

      <main className="flex-1 px-6 py-6 space-y-6 max-w-lg mx-auto w-full pb-24">
        {/* How it works */}
        <div className="bg-zinc-900 rounded-2xl p-5 text-white">
          <h2 className="font-bold">How it works</h2>
          <div className="mt-3 space-y-3 text-sm text-zinc-300">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <p>Friend signs up — <span className="text-white font-medium">you both get HK$ 5</span></p>
            </div>
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <p>Friend earns from tasks — <span className="text-white font-medium">you get 10% forever</span></p>
            </div>
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <p>No limit on invites</p>
            </div>
          </div>
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">Your referral link</label>
          <div className="flex gap-2">
            <div className="flex-1 bg-white rounded-xl border border-zinc-200 px-4 py-3 font-mono text-sm text-zinc-700 truncate">
              {referralLink}
            </div>
            <button onClick={copyLink}
              className="bg-emerald-600 text-white rounded-xl px-5 py-3 text-sm font-semibold hover:bg-emerald-700 transition-colors flex-shrink-0">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <button onClick={shareLink}
            className="w-full mt-3 bg-zinc-900 text-white font-semibold rounded-xl py-3.5 hover:bg-zinc-800 transition-colors text-sm">
            Share with Friends
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-zinc-200 p-4 text-center">
            <p className="text-3xl font-bold text-zinc-900 tabular-nums">{totalReferred}</p>
            <p className="text-zinc-500 text-sm mt-1">Friends invited</p>
          </div>
          <div className="bg-white rounded-xl border border-zinc-200 p-4 text-center">
            <p className="text-3xl font-bold text-zinc-900 tabular-nums">{"HK$ " + totalEarned.toFixed(0)}</p>
            <p className="text-zinc-500 text-sm mt-1">Earned from referrals</p>
          </div>
        </div>

        {/* Referral list */}
        <div>
          <h2 className="font-bold text-zinc-900 mb-3">Your Referrals</h2>
          {referrals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-zinc-400 text-sm">No referrals yet. Share your link to start earning!</p>
            </div>
          ) : (
            referrals.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-3.5 border-b border-zinc-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-zinc-800">{r.name}</p>
                    <p className="text-zinc-400 text-sm">{r.date}</p>
                  </div>
                </div>
                <span className="font-semibold text-emerald-700 tabular-nums">{"+ HK$ " + r.earned.toFixed(0)}</span>
              </div>
            ))
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

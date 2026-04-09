"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Signing you in...");

  useEffect(() => {
    async function handleCallback() {
      const supabase = getSupabase();

      // PKCE flow: exchange the code from URL for a session
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          setStatus("Sign-in failed. Redirecting...");
          setTimeout(() => router.replace("/login"), 2000);
          return;
        }
      }

      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        setStatus("Sign-in failed. Redirecting...");
        setTimeout(() => router.replace("/login"), 2000);
        return;
      }

      const authUser = session.user;
      const email = authUser.email;
      const name = authUser.user_metadata?.full_name || authUser.user_metadata?.name || email?.split("@")[0] || "User";

      // Check if this auth user already has a profile in our users table
      const { data: existingUser } = await supabase
        .from("users")
        .select("id, referral_code")
        .eq("auth_id", authUser.id)
        .single();

      if (existingUser) {
        localStorage.setItem("weecove_user_id", existingUser.id);
        localStorage.setItem("weecove_referral_code", existingUser.referral_code);
        router.replace("/earn");
        return;
      }

      // Also check by email (for users created before OAuth migration)
      const { data: legacyUser } = await supabase
        .from("users")
        .select("id, referral_code")
        .eq("email", email?.toLowerCase())
        .single();

      if (legacyUser) {
        await supabase
          .from("users")
          .update({ auth_id: authUser.id })
          .eq("id", legacyUser.id);

        localStorage.setItem("weecove_user_id", legacyUser.id);
        localStorage.setItem("weecove_referral_code", legacyUser.referral_code);
        router.replace("/earn");
        return;
      }

      // New user — create profile
      const referralCode = name.toLowerCase().replace(/[^a-z0-9]/g, "") + Math.random().toString(36).substring(2, 6);

      const refCode = localStorage.getItem("weecove_ref");
      let referredBy: string | null = null;
      if (refCode) {
        const { data: referrer } = await supabase
          .from("users")
          .select("id")
          .eq("referral_code", refCode)
          .single();
        if (referrer) referredBy = referrer.id;
        localStorage.removeItem("weecove_ref");
      }

      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert({
          auth_id: authUser.id,
          name,
          email: email?.toLowerCase(),
          country: "OTHER",
          referral_code: referralCode,
          referred_by: referredBy,
        })
        .select("id, referral_code")
        .single();

      if (createError || !newUser) {
        setStatus("Account setup failed. Please try again.");
        setTimeout(() => router.replace("/login"), 2000);
        return;
      }

      await supabase.from("balances").insert({
        user_id: newUser.id,
        available: 0,
        pending: 0,
        withdrawn: 0,
      });

      if (referredBy) {
        const bonusAmount = 5;
        await supabase.from("referrals").insert({
          referrer_id: referredBy,
          referred_id: newUser.id,
          bonus_paid: true,
        });
        await supabase.rpc("add_balance", { p_user_id: referredBy, p_amount: bonusAmount });
        await supabase.from("transactions").insert({
          user_id: referredBy,
          type: "referral_bonus",
          amount: bonusAmount,
          currency: "HKD",
          status: "completed",
          description: `Referral bonus: ${name} signed up`,
        });
        await supabase.rpc("add_balance", { p_user_id: newUser.id, p_amount: bonusAmount });
        await supabase.from("transactions").insert({
          user_id: newUser.id,
          type: "referral_bonus",
          amount: bonusAmount,
          currency: "HKD",
          status: "completed",
          description: "Welcome bonus: signed up with referral link",
        });
      }

      localStorage.setItem("weecove_user_id", newUser.id);
      localStorage.setItem("weecove_referral_code", newUser.referral_code);
      router.replace("/earn");
    }

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-zinc-500 text-sm">{status}</p>
      </div>
    </div>
  );
}

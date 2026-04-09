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

      // Use server API to handle DB operations (bypasses RLS)
      const refCode = localStorage.getItem("weecove_ref");
      const res = await fetch("/api/auth/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_id: authUser.id,
          email,
          name,
          ref_code: refCode || undefined,
        }),
      });

      if (!res.ok) {
        setStatus("Account setup failed. Please try again.");
        setTimeout(() => router.replace("/login"), 2000);
        return;
      }

      const user = await res.json();
      if (refCode) localStorage.removeItem("weecove_ref");

      localStorage.setItem("weecove_user_id", user.id);
      localStorage.setItem("weecove_referral_code", user.referral_code);
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

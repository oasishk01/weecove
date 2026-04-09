"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessHandler() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const uid = params.get("uid");
    const rc = params.get("rc");

    if (uid && rc) {
      localStorage.setItem("weecove_user_id", uid);
      localStorage.setItem("weecove_referral_code", rc);
      router.replace("/earn");
    } else {
      router.replace("/login");
    }
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-zinc-500 text-sm">Setting up your account...</p>
      </div>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense>
      <SuccessHandler />
    </Suspense>
  );
}

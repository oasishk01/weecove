"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthUser {
  id: string;
  referral_code: string;
}

export function useAuth(): AuthUser | null {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("weecove_user_id");
    const referral_code = localStorage.getItem("weecove_referral_code") || "";
    if (!id) {
      router.replace("/login");
      return;
    }
    setUser({ id, referral_code });
  }, [router]);

  return user;
}

export function logout() {
  localStorage.removeItem("weecove_user_id");
  localStorage.removeItem("weecove_referral_code");
  window.location.href = "/";
}

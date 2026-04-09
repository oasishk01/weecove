"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

interface AuthUser {
  id: string;
  referral_code: string;
  token: string;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function useAuth(): AuthUser | null {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Read from cookie (set by server callback) or localStorage (legacy)
    const id = getCookie("weecove_user_id") || localStorage.getItem("weecove_user_id");
    const rc = getCookie("weecove_referral_code") || localStorage.getItem("weecove_referral_code") || "";

    if (!id) return;

    // Sync to localStorage for other code that reads it
    localStorage.setItem("weecove_user_id", id);
    localStorage.setItem("weecove_referral_code", rc);

    setUser({ id, referral_code: rc, token: "" });
  }, []);

  return user;
}

export async function logout() {
  const supabase = getSupabase();
  await supabase.auth.signOut();
  localStorage.removeItem("weecove_user_id");
  localStorage.removeItem("weecove_referral_code");
  document.cookie = "weecove_user_id=; path=/; max-age=0";
  document.cookie = "weecove_referral_code=; path=/; max-age=0";
  window.location.href = "/";
}

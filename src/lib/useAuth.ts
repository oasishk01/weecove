"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

interface AuthUser {
  id: string;
  referral_code: string;
  token: string;
}

export function useAuth(): AuthUser | null {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("weecove_user_id");
    const referral_code = localStorage.getItem("weecove_referral_code") || "";

    if (id) {
      // Get token from Supabase session if available
      const supabase = getSupabase();
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser({ id, referral_code, token: session?.access_token || "" });
      });
    }
  }, []);

  return user;
}

export async function logout() {
  const supabase = getSupabase();
  await supabase.auth.signOut();
  localStorage.removeItem("weecove_user_id");
  localStorage.removeItem("weecove_referral_code");
  window.location.href = "/";
}

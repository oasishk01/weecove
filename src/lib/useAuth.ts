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
    const supabase = getSupabase();

    async function loadSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Fallback: check localStorage for legacy users (will be migrated on next Google login)
        const legacyId = localStorage.getItem("weecove_user_id");
        if (legacyId) {
          setUser({
            id: legacyId,
            referral_code: localStorage.getItem("weecove_referral_code") || "",
            token: "",
          });
        }
        return;
      }

      // Get our app user from auth_id
      const { data: appUser } = await supabase
        .from("users")
        .select("id, referral_code")
        .eq("auth_id", session.user.id)
        .single();

      if (appUser) {
        // Sync localStorage for components that read it directly
        localStorage.setItem("weecove_user_id", appUser.id);
        localStorage.setItem("weecove_referral_code", appUser.referral_code);
        setUser({
          id: appUser.id,
          referral_code: appUser.referral_code,
          token: session.access_token,
        });
      }
    }

    loadSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadSession();
    });

    return () => subscription.unsubscribe();
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

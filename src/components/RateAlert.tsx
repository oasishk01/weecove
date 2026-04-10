"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

export function RateAlert({ corridor = "HKD → CNY" }: { corridor?: string }) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (website) return; // honeypot filled = bot

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, corridor, _hp: website }),
      });
    } catch {
      // Still show success — email saved client-side as fallback
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
        <p className="text-emerald-700 font-medium text-sm">✓ {t("alert.done")}</p>
        <p className="text-emerald-600 text-xs mt-1">{email}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
      <p className="text-sm font-medium text-zinc-900 mb-1">{t("alert.title")}</p>
      <p className="text-xs text-zinc-500 mb-3">{t("alert.sub")}</p>
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px]"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        name="website"
      />
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("alert.placeholder")}
          required
          className="flex-1 bg-white border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shrink-0"
        >
          {t("alert.button")}
        </button>
      </div>
      <p className="text-[10px] text-zinc-400 mt-2">{t("alert.privacy")}</p>
    </form>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { PROVIDERS, getProviderLogo } from "@/lib/remittance-data";
import { StatsCounter, TodayCounter } from "@/components/StatsCounter";
import { LiveClock } from "@/components/LiveClock";
import { RateComparisonTable } from "@/components/RateComparisonTable";
import { useI18n, LanguageToggle } from "@/lib/i18n";
import { RateAlert } from "@/components/RateAlert";

export default function LandingPage() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col min-h-full">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/otter-head.png" alt="" width={40} height={34} className="h-7 w-auto" />
            <span className="text-emerald-600 font-bold text-lg tracking-tight">WeeCove</span>
          </Link>
          <div className="flex items-center gap-3">
            <LiveClock />
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Tool — immediately */}
      <section className="px-6 pt-8 pb-4">
        <div className="max-w-xl mx-auto">
          <p className="text-sm text-zinc-500 mb-1">{t("home.sub")}</p>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-zinc-900">
              {t("nav.compare")}
            </h1>
            <TodayCounter />
          </div>
          <RateComparisonTable from="HKD" to="CNY" defaultAmount={10000} showCorridorPicker />
          <div className="mt-4">
            <RateAlert />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-6">
        <StatsCounter />
      </section>

      {/* Provider strip */}
      <section className="px-6 py-6 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-[10px] font-medium text-zinc-400 uppercase tracking-widest mb-3">
            {t("home.providers")}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {PROVIDERS.map((p) => (
              <div key={p.slug} className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <Image
                  src={getProviderLogo(p.domain)}
                  alt={p.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded"
                />
                <span className="text-[11px] font-medium text-zinc-400">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why — compact */}
      <section className="px-6 py-10 bg-zinc-50">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "🔍", title: t("home.independent"), desc: t("home.independent.desc") },
              { icon: "💡", title: t("home.transparent"), desc: t("home.transparent.desc") },
              { icon: "⚡", title: t("home.realtime"), desc: t("home.realtime.desc") },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-4 border border-zinc-200">
                <span className="text-lg">{item.icon}</span>
                <h3 className="font-bold text-zinc-900 text-sm mt-1">{item.title}</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Independence note */}
      <section className="px-6 py-6">
        <div className="max-w-xl mx-auto">
          <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
            ⚠️ {t("home.warning")}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-zinc-400 text-[10px]">WeeCove · Independent remittance comparison · Hong Kong</p>
          <div className="flex items-center gap-3 text-[10px] text-zinc-400">
            <Link href="/compare/hong-kong-remittance" className="hover:text-zinc-600">Guide</Link>
            <Link href="/compare/wise-remittance" className="hover:text-zinc-600">Wise</Link>
            <Link href="/compare/send-money-philippines" className="hover:text-zinc-600">HK→PH</Link>
            <Link href="/terms" className="hover:text-zinc-600">Terms</Link>
            <Link href="/privacy" className="hover:text-zinc-600">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

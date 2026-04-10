"use client";

import Link from "next/link";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { PROVIDERS, getProviderLogo } from "@/lib/remittance-data";
import { StatsCounter, TodayCounter } from "@/components/StatsCounter";
import { LiveClock } from "@/components/LiveClock";
import { RateComparisonTable } from "@/components/RateComparisonTable";
import { useI18n, LanguageToggle } from "@/lib/i18n";

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
            <Link href="/compare/hong-kong-remittance" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
              {t("nav.compare")}
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-8 pb-6 md:pt-14 md:pb-10">
        <div className="max-w-2xl mx-auto text-center">
          <BlurFade delay={0}>
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              {t("home.badge")}
            </div>
          </BlurFade>

          <BlurFade delay={0.1}>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
              {t("home.hero1")}
              <br />
              <span className="text-red-500">{t("home.hero2")}</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.2}>
            <p className="mt-4 text-base text-zinc-500 leading-relaxed max-w-md mx-auto">
              {t("home.sub")}
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Live comparison table on home page — immediate value */}
      <section className="px-6 pb-8">
        <div className="max-w-xl mx-auto">
          <BlurFade delay={0.3}>
            <div className="flex items-center justify-between mb-3">
              <LiveClock />
              <TodayCounter />
            </div>
            <RateComparisonTable from="HKD" to="PHP" defaultAmount={10000} showCorridorPicker />
          </BlurFade>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-8 border-t border-zinc-100">
        <BlurFade delay={0.1}>
          <StatsCounter />
        </BlurFade>
      </section>

      {/* Provider strip */}
      <section className="px-6 py-6 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-[10px] font-medium text-zinc-400 uppercase tracking-widest mb-3">
            {t("home.providers")}
          </p>
          <div className="flex items-center justify-center gap-5 flex-wrap">
            {PROVIDERS.map((p) => (
              <div key={p.slug} className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <Image
                  src={getProviderLogo(p.domain)}
                  alt={p.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded"
                />
                <span className="text-xs font-medium text-zinc-400">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corridors */}
      <section className="px-6 py-12 bg-zinc-50">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] font-semibold text-emerald-600 uppercase tracking-widest">{t("home.corridors")}</p>
          <h2 className="text-xl font-bold text-zinc-900 mt-1">{t("home.corridors.title")}</h2>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { flag: "🇵🇭", name: "Philippines", sub: "200K+", href: "/compare/send-money-philippines" },
              { flag: "🇮🇩", name: "Indonesia", sub: "150K+", href: "/compare/hong-kong-remittance" },
              { flag: "🇮🇳", name: "India", sub: "38K+", href: "/compare/hong-kong-remittance" },
            ].map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="block bg-white rounded-xl p-4 border border-zinc-200 hover:shadow-md hover:border-emerald-300 transition-all text-center"
              >
                <span className="text-2xl">{c.flag}</span>
                <p className="font-semibold text-zinc-900 text-sm mt-1">{c.name}</p>
                <p className="text-[10px] text-zinc-400">{c.sub} in HK</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why — icons, no paragraphs */}
      <section className="px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-zinc-900">{t("home.why")}</h2>
          <div className="mt-5 grid md:grid-cols-3 gap-4">
            {[
              { icon: "🔍", title: t("home.independent"), desc: t("home.independent.desc") },
              { icon: "💡", title: t("home.transparent"), desc: t("home.transparent.desc") },
              { icon: "⚡", title: t("home.realtime"), desc: t("home.realtime.desc") },
            ].map((item) => (
              <div key={item.title} className="bg-zinc-50 rounded-xl p-4 border border-zinc-200">
                <span className="text-xl">{item.icon}</span>
                <h3 className="font-bold text-zinc-900 text-sm mt-2">{item.title}</h3>
                <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning */}
      <section className="px-6 py-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs text-zinc-700 leading-relaxed">
              ⚠️ {t("home.warning")}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-zinc-400 text-[10px]">WeeCove · Independent remittance comparison · Hong Kong</p>
          <div className="flex items-center gap-3 text-[10px] text-zinc-400">
            <Link href="/compare/hong-kong-remittance" className="hover:text-zinc-600">Compare</Link>
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

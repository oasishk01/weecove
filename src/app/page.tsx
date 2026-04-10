import Link from "next/link";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { PROVIDERS } from "@/lib/remittance-data";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/otter-head.png" alt="" width={40} height={34} className="h-7 w-auto" />
            <span className="text-emerald-600 font-bold text-lg tracking-tight">WeeCove</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/compare/wise-remittance" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
              Wise 比較
            </Link>
            <Link href="/compare/hong-kong-remittance" className="hidden sm:block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
              匯款指南
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <BlurFade delay={0}>
            <div className="flex items-center justify-center gap-3 mb-6">
              {["🇭🇰", "🇵🇭", "🇮🇩", "🇮🇳", "🇳🇵", "🇧🇩"].map((flag, i) => (
                <span key={i} className="text-3xl md:text-4xl">{flag}</span>
              ))}
            </div>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              獨立比較 · 不屬於任何匯款公司
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
              匯款邊間最平？
              <br />
              <span className="text-emerald-600">即時比較，一目了然。</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3}>
            <p className="mt-5 text-lg text-zinc-500 leading-relaxed max-w-md mx-auto">
              Compare remittance rates from Hong Kong. Find the cheapest way to send money home.
            </p>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/compare/wise-remittance"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold text-base px-7 py-3.5 rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Wise 匯款比較
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <Link
                href="/compare/hong-kong-remittance"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 text-zinc-700 font-medium text-base px-7 py-3.5 hover:bg-zinc-200 transition-all"
              >
                所有匯款方法比較
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Corridors */}
      <section className="px-6 py-16 bg-zinc-50">
        <div className="max-w-3xl mx-auto">
          <BlurFade delay={0.1}>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Popular corridors</p>
            <h2 className="text-2xl font-bold text-zinc-900 mt-2">從香港匯款去邊？</h2>
          </BlurFade>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              { flag: "🇵🇭", name: "Philippines", local: "菲律賓", workers: "~200K workers in HK", href: "/compare/send-money-philippines" },
              { flag: "🇮🇩", name: "Indonesia", local: "印尼", workers: "~150K workers in HK", href: "/compare/hong-kong-remittance" },
              { flag: "🇮🇳", name: "India", local: "印度", workers: "~38K workers in HK", href: "/compare/hong-kong-remittance" },
            ].map((c, i) => (
              <BlurFade key={c.name} delay={0.2 + i * 0.1}>
                <Link
                  href={c.href}
                  className="block bg-white rounded-xl p-6 border border-zinc-200/60 hover:shadow-md hover:border-emerald-200 transition-all duration-300"
                >
                  <span className="text-4xl">{c.flag}</span>
                  <h3 className="mt-3 font-bold text-zinc-900">{c.local} {c.name}</h3>
                  <p className="text-sm text-zinc-500 mt-1">{c.workers}</p>
                  <p className="text-emerald-600 text-sm font-medium mt-3">比較匯率 →</p>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Providers */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <BlurFade delay={0.1}>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Providers compared</p>
            <h2 className="text-2xl font-bold text-zinc-900 mt-2">我哋比較嘅匯款平台</h2>
          </BlurFade>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {PROVIDERS.map((p, i) => (
              <BlurFade key={p.slug} delay={0.15 + i * 0.05}>
                <div className="bg-zinc-50 rounded-xl p-4 text-center border border-zinc-200/60">
                  <span
                    className="inline-flex w-10 h-10 rounded-lg items-center justify-center text-xs font-bold mx-auto"
                    style={{ backgroundColor: p.brandColor, color: p.textColor }}
                  >
                    {p.logo}
                  </span>
                  <p className="font-bold text-zinc-900 mt-2">{p.name}</p>
                  <p className="text-xs text-zinc-500 mt-1">{p.trustpilot}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Why WeeCove */}
      <section className="px-6 py-16 bg-zinc-50">
        <div className="max-w-3xl mx-auto">
          <BlurFade delay={0.1}>
            <h2 className="text-2xl font-bold text-zinc-900">點解用 WeeCove 比較？</h2>
            <h3 className="text-lg text-zinc-500 mt-1">Why use WeeCove?</h3>
          </BlurFade>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { title: "獨立", subtitle: "Independent", desc: "WeeCove 唔屬於任何匯款公司。排名純粹基於數據。" },
              { title: "透明", subtitle: "Transparent", desc: "我哋顯示真實匯率同手續費。冇隱藏收費。" },
              { title: "免費", subtitle: "Free", desc: "完全免費使用。我哋只透過 affiliate link 收入維持運作。" },
            ].map((item, i) => (
              <BlurFade key={item.title} delay={0.2 + i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-zinc-200/60">
                  <h3 className="font-bold text-zinc-900 text-lg">{item.title}</h3>
                  <p className="text-emerald-600 text-xs font-medium">{item.subtitle}</p>
                  <p className="text-sm text-zinc-500 mt-3">{item.desc}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Note about Exiap */}
      <section className="px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <p className="text-sm text-zinc-700">
                <strong>你知道嗎？</strong> 某些匯款比較網站（例如 Exiap）實際上係被匯款公司擁有嘅。
                WeeCove 係完全獨立嘅 — 我哋唔屬於 Wise、Western Union 或任何 provider。
                我哋嘅排名只基於一個標準：邊間畀你收到最多錢。
              </p>
              <p className="text-xs text-zinc-500 mt-2">
                Did you know? Some comparison sites are owned by money transfer companies.
                WeeCove is fully independent. Our rankings are based on one thing: which provider delivers the most money.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-zinc-900 text-sm">WeeCove</p>
            <p className="text-zinc-400 text-xs">Independent remittance comparison for Hong Kong</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <Link href="/compare/wise-remittance" className="hover:text-zinc-600 transition-colors">Wise 比較</Link>
            <Link href="/compare/hong-kong-remittance" className="hover:text-zinc-600 transition-colors">匯款指南</Link>
            <Link href="/compare/send-money-philippines" className="hover:text-zinc-600 transition-colors">HK→PH</Link>
            <Link href="/terms" className="hover:text-zinc-600 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-zinc-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { PROVIDERS, getProviderLogo } from "@/lib/remittance-data";
import { StatsCounter } from "@/components/StatsCounter";

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
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <Link href="/compare/hong-kong-remittance" className="hover:text-zinc-900 transition-colors">
              比較匯率
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero — impact number first */}
      <section className="px-6 pt-10 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <BlurFade delay={0}>
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              你知唔知揀錯匯款方法可以蝕幾多？
            </div>
          </BlurFade>

          <BlurFade delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
              匯 HK$10,000 去菲律賓
              <br />
              <span className="text-red-500">揀錯蝕 ₱2,816</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.2}>
            <p className="mt-5 text-lg text-zinc-500 leading-relaxed max-w-md mx-auto">
              即時比較 6 間匯款平台嘅匯率同手續費。
              <br />
              <span className="text-zinc-400 text-sm">
                Compare 6 providers. Find the cheapest way to send money from Hong Kong.
              </span>
            </p>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/compare/hong-kong-remittance"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold text-base px-7 py-3.5 rounded-xl hover:bg-emerald-700 transition-colors"
              >
                即時比較匯率
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <Link
                href="/compare/send-money-philippines"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 text-zinc-700 font-medium text-base px-7 py-3.5 hover:bg-zinc-200 transition-all"
              >
                🇵🇭 匯去菲律賓
              </Link>
            </div>
          </BlurFade>

          {/* Stats */}
          <BlurFade delay={0.4}>
            <div className="mt-10">
              <StatsCounter />
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Provider logos strip — social proof */}
      <section className="px-6 py-8 border-t border-b border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-[10px] font-medium text-zinc-400 uppercase tracking-widest mb-4">
            資料來源：各平台官方網站 · Data from official provider websites
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {PROVIDERS.map((p) => (
              <div key={p.slug} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <Image
                  src={getProviderLogo(p.domain)}
                  alt={p.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded"
                />
                <span className="text-sm font-medium text-zinc-400">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corridors */}
      <section className="px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <BlurFade delay={0.1}>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Popular corridors</p>
            <h2 className="text-2xl font-bold text-zinc-900 mt-2">從香港匯款去邊？</h2>
          </BlurFade>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { flag: "🇵🇭", name: "Philippines", local: "菲律賓", sub: "~200K workers in HK", href: "/compare/send-money-philippines" },
              { flag: "🇮🇩", name: "Indonesia", local: "印尼", sub: "~150K workers in HK", href: "/compare/hong-kong-remittance" },
              { flag: "🇮🇳", name: "India", local: "印度", sub: "~38K workers in HK", href: "/compare/hong-kong-remittance" },
            ].map((c, i) => (
              <BlurFade key={c.name} delay={0.15 + i * 0.1}>
                <Link
                  href={c.href}
                  className="block bg-white rounded-xl p-5 border border-zinc-200 hover:shadow-md hover:border-emerald-300 transition-all duration-200"
                >
                  <span className="text-3xl">{c.flag}</span>
                  <h3 className="mt-2 font-bold text-zinc-900">{c.local} {c.name}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{c.sub}</p>
                  <p className="text-emerald-600 text-sm font-medium mt-3">比較匯率 →</p>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Why WeeCove */}
      <section className="px-6 py-14 bg-zinc-50">
        <div className="max-w-3xl mx-auto">
          <BlurFade delay={0.1}>
            <h2 className="text-2xl font-bold text-zinc-900">點解用 WeeCove？</h2>
          </BlurFade>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              { icon: "🔍", title: "獨立 Independent", desc: "WeeCove 唔屬於任何匯款公司。排名純粹基於數據：邊間畀你收到最多錢，排最高。" },
              { icon: "💡", title: "透明 Transparent", desc: "顯示真實匯率、手續費同埋隱藏成本。唔好再被「零手續費」呃。" },
              { icon: "⚡", title: "即時 Real-time", desc: "匯率定期更新。輸入金額即刻睇到每間嘅差別。" },
            ].map((item, i) => (
              <BlurFade key={item.title} delay={0.15 + i * 0.1}>
                <div className="bg-white rounded-xl p-5 border border-zinc-200">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-bold text-zinc-900 mt-2">{item.title}</h3>
                  <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Independence callout */}
      <section className="px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <p className="text-sm text-zinc-700 font-medium mb-1">⚠️ 你知道嗎？</p>
              <p className="text-sm text-zinc-600">
                某些匯款比較網站（例如 Exiap）實際上係被匯款公司擁有嘅。
                WeeCove 係完全獨立嘅。我哋嘅排名只基於一個標準：<strong>邊間畀你收到最多錢</strong>。
              </p>
              <p className="text-[10px] text-zinc-400 mt-2">
                Some comparison sites are owned by money transfer companies. WeeCove is fully independent.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-zinc-900 text-sm">WeeCove</p>
            <p className="text-zinc-400 text-[10px]">Independent remittance comparison · Hong Kong</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <Link href="/compare/hong-kong-remittance" className="hover:text-zinc-600">匯款比較</Link>
            <Link href="/compare/wise-remittance" className="hover:text-zinc-600">Wise Review</Link>
            <Link href="/compare/send-money-philippines" className="hover:text-zinc-600">HK→PH</Link>
            <Link href="/terms" className="hover:text-zinc-600">Terms</Link>
            <Link href="/privacy" className="hover:text-zinc-600">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

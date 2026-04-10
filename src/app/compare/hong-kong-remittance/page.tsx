import type { Metadata } from "next";
import Link from "next/link";
import { RateComparisonTable } from "@/components/RateComparisonTable";
import { PROVIDERS } from "@/lib/remittance-data";

export const metadata: Metadata = {
  title: "香港海外匯款比較 (2026) — 最平匯款方法 | Hong Kong Remittance Guide | WeeCove",
  description:
    "比較香港所有匯款方法：Wise、Western Union、Remitly、WorldRemit、銀行電匯。邊個最平？邊個最快？獨立比較，唔屬於任何匯款公司。",
  alternates: {
    languages: {
      "zh-HK": "/compare/hong-kong-remittance",
      en: "/compare/hong-kong-remittance",
    },
  },
};

const FAQ = [
  {
    q: "香港匯款去外國邊間最平？",
    a: "大部分情況 Wise 最平，因為佢用中間市場匯率。但如果你要即時到賬或現金提取，Remitly（去菲律賓用 GCash）或 Western Union 可能更適合。",
  },
  {
    q: "銀行電匯同 Wise 邊個好？",
    a: "銀行電匯通常比 Wise 貴好多。銀行會喺匯率上面加 2-4%，仲要收 HK$100-300 手續費。Wise 用真實匯率加 HK$15-30 手續費。",
  },
  {
    q: "What is the cheapest way to send money from Hong Kong?",
    a: "Wise and Revolut typically offer the lowest total cost for bank-to-bank transfers. For cash pickup, Western Union has the widest network but charges more through rate markup. Compare rates for your specific corridor above.",
  },
  {
    q: "找換店匯款同 Wise 比點樣？",
    a: "找換店通常匯率比銀行好，但仲係比 Wise 差。而且你要親身去，冇得網上做。Wise 可以手機搞掂。",
  },
  {
    q: "跨境匯款要注意咩？",
    a: "1) 比較總成本（唔好只睇手續費，要計匯率差價）。2) 確認到賬時間。3) 確認收款方式（銀行轉帳、現金、mobile wallet）。4) 大額匯款可能需要 ID 驗證。",
  },
];

export default function HongKongRemittancePage() {
  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "香港海外匯款比較 — 最平匯款方法",
    description: metadata.description,
    author: { "@type": "Organization", name: "WeeCove" },
    publisher: { "@type": "Organization", name: "WeeCove", url: "https://weecove.com" },
    datePublished: "2026-04-10",
    dateModified: "2026-04-10",
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />

      <nav className="text-sm text-zinc-500 mb-6">
        <Link href="/" className="hover:text-emerald-600">WeeCove</Link>
        {" › "}
        <span>香港匯款比較</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
        香港海外匯款比較 (2026)
      </h1>
      <p className="text-lg text-zinc-600 mb-2">
        Hong Kong Remittance Comparison — Find the Cheapest Way to Send Money Abroad
      </p>

      <div className="flex items-center gap-3 mb-8 text-sm text-zinc-500">
        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold">
          獨立比較 · Independent
        </span>
        <span>Updated April 2026</span>
        <span>·</span>
        <span>{PROVIDERS.length} providers compared</span>
      </div>

      {/* Overview */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          邊間匯款最平？/ Which Provider Is Cheapest?
        </h2>
        <p className="text-zinc-700 mb-4">
          答案取決於你匯去邊度、匯幾多、同你要幾快到賬。以下係三條最常見走廊嘅即時比較。
          輸入你嘅金額就可以睇到每間公司你會收到幾多。
        </p>
        <p className="text-zinc-600 text-sm mb-4">
          The answer depends on where you are sending, how much, and how fast you need it.
          Below are live comparisons for the three most popular corridors from Hong Kong.
        </p>
      </section>

      {/* Corridor: Philippines */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">
          🇵🇭 匯去菲律賓 (PHP)
        </h2>
        <p className="text-sm text-zinc-500 mb-4">
          ~200,000 Filipino workers in Hong Kong send money home regularly
        </p>
        <RateComparisonTable from="HKD" to="PHP" defaultAmount={10000} />
      </section>

      {/* Corridor: Indonesia */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">
          🇮🇩 匯去印尼 (IDR)
        </h2>
        <p className="text-sm text-zinc-500 mb-4">
          ~150,000 Indonesian workers in Hong Kong
        </p>
        <RateComparisonTable from="HKD" to="IDR" defaultAmount={10000} />
      </section>

      {/* Corridor: India */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">
          🇮🇳 匯去印度 (INR)
        </h2>
        <p className="text-sm text-zinc-500 mb-4">
          ~38,000 Indian workers in Hong Kong
        </p>
        <RateComparisonTable from="HKD" to="INR" defaultAmount={10000} />
      </section>

      {/* Provider quick summaries */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          各平台簡評 / Provider Quick Reviews
        </h2>
        <div className="space-y-4">
          {PROVIDERS.map((p) => (
            <div key={p.slug} className="border border-zinc-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{p.logo}</span>
                <h3 className="font-bold text-zinc-900">{p.name}</h3>
                <span className="text-xs text-zinc-500">{p.trustpilot}</span>
              </div>
              <p className="text-zinc-600 text-sm">{p.tagline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key tips */}
      <section className="mb-10 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-zinc-900 mb-3">
          匯款前必知 / Before You Transfer
        </h2>
        <ul className="space-y-2 text-zinc-700 text-sm">
          <li>✓ <strong>比較總成本</strong>，唔好只睇手續費。匯率差價通常比手續費更多。</li>
          <li>✓ <strong>Compare total cost</strong>, not just the fee. Exchange rate markup is usually more expensive than the fee.</li>
          <li>✓ <strong>大額匯款</strong>（HK$50,000+）考慮用 OFX — 零手續費，匯率好。</li>
          <li>✓ <strong>要即時到賬</strong>？Remitly 去菲律賓 GCash 最快。Western Union 現金提取全球覆蓋。</li>
          <li>✓ <strong>銀行電匯最貴</strong>。除非你銀行有特別優惠，否則網上匯款服務幾乎一定更平。</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">常見問題 / FAQ</h2>
        <div className="space-y-4">
          {FAQ.map((f, i) => (
            <details key={i} className="border border-zinc-200 rounded-lg">
              <summary className="p-4 font-semibold text-zinc-900 cursor-pointer hover:bg-zinc-50">
                {f.q}
              </summary>
              <p className="px-4 pb-4 text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Internal links */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4">相關文章</h2>
        <div className="grid gap-3">
          <Link
            href="/compare/wise-remittance"
            className="block p-4 border border-zinc-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <div className="font-semibold text-zinc-900">Wise 匯款完整指南</div>
            <div className="text-sm text-zinc-500">Is Wise really the cheapest? Full review + comparison</div>
          </Link>
          <Link
            href="/compare/send-money-philippines"
            className="block p-4 border border-zinc-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <div className="font-semibold text-zinc-900">Send Money HK → Philippines</div>
            <div className="text-sm text-zinc-500">Detailed HKD to PHP corridor comparison</div>
          </Link>
        </div>
      </section>

      <footer className="text-xs text-zinc-400 border-t border-zinc-200 pt-4">
        <p>
          WeeCove is operated independently. We are not affiliated with, endorsed by, or owned by any money transfer provider.
          Content is for informational purposes. Always verify current rates before making a transfer.
        </p>
      </footer>
    </main>
  );
}

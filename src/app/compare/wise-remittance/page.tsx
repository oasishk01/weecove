import type { Metadata } from "next";
import Link from "next/link";
import { RateComparisonTable } from "@/components/RateComparisonTable";
import { LiveClock } from "@/components/LiveClock";
import { PROVIDERS } from "@/lib/remittance-data";

export const metadata: Metadata = {
  title: "Wise 匯款完整指南 (2026) — 手續費、匯率、同其他平台比較 | WeeCove",
  description:
    "獨立 Wise 匯款 review。比較 Wise 同 Western Union、Remitly、WorldRemit 嘅手續費同匯率。睇吓 Wise 係咪真係最平。Independent Wise review for Hong Kong.",
  alternates: {
    canonical: "/compare/wise-remittance",
  },
  openGraph: {
    title: "Wise 匯款完整指南 (2026) | WeeCove",
    description: "Independent Wise review. Compare fees and rates with Western Union, Remitly, WorldRemit.",
    url: "https://weecove.com/compare/wise-remittance",
    type: "article",
  },
};

const FAQ = [
  {
    q: "Wise 匯款安全嗎？",
    a: "Wise 受多國金融監管機構監管，包括英國 FCA、美國 FinCEN、香港海關。全球超過 1600 萬客戶使用。",
  },
  {
    q: "Wise 手續費幾多？",
    a: "Wise 用中間市場匯率（mid-market rate），冇隱藏加價。手續費因走廊而異，從 HK 匯去菲律賓大約 HK$15-30。",
  },
  {
    q: "Wise 同 Western Union 邊個平？",
    a: "大部分情況 Wise 更平。Western Union 嘅匯率加價通常有 3-5%，即使手續費標示為零。Wise 用真實匯率加低手續費。",
  },
  {
    q: "Is Wise the cheapest way to send money from Hong Kong?",
    a: "For most corridors, Wise offers the best combination of low fees and real exchange rates. However, for cash pickup in the Philippines, Remitly to GCash can be faster. Compare rates above for your specific transfer.",
  },
  {
    q: "Wise 要幾耐到賬？",
    a: "銀行轉帳通常 1-2 個工作天。部分走廊支持即時到賬。",
  },
];

export default function WiseRemittancePage() {
  const wise = PROVIDERS.find((p) => p.slug === "wise")!;

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
    headline: "Wise 匯款完整指南 — 手續費、匯率、同其他平台比較",
    description: "Independent Wise review for Hong Kong. Compare Wise fees and exchange rates with Western Union, Remitly, WorldRemit.",
    author: { "@type": "Organization", name: "WeeCove", url: "https://weecove.com" },
    publisher: {
      "@type": "Organization",
      name: "WeeCove",
      url: "https://weecove.com",
      logo: { "@type": "ImageObject", url: "https://weecove.com/otter-head.png" },
    },
    mainEntityOfPage: "https://weecove.com/compare/wise-remittance",
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

      {/* Breadcrumb */}
      <nav className="text-sm text-zinc-500 mb-6">
        <Link href="/" className="hover:text-emerald-600">WeeCove</Link>
        {" › "}
        <span>Wise 匯款比較</span>
      </nav>

      {/* H1 — exact keyword match */}
      <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
        Wise 匯款完整指南 (2026)
      </h1>
      <p className="text-lg text-zinc-600 mb-2">
        Wise Review: Is It Really the Cheapest Way to Send Money from Hong Kong?
      </p>

      {/* Trust badge + live clock */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-8">
        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold w-fit">
          獨立評測 · Independent Review
        </span>
        <LiveClock />
      </div>

      {/* Quick verdict */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-emerald-800 mb-2">
          快速結論 / Quick Verdict
        </h2>
        <p className="text-zinc-700 mb-2">
          <strong>Wise 係大部分情況下從香港匯款最平嘅選擇。</strong>
          佢用中間市場匯率（即銀行之間嘅真實匯率），加一個透明嘅低手續費。
          唔似 Western Union 或傳統銀行，Wise 冇隱藏嘅匯率加價。
        </p>
        <p className="text-zinc-700">
          <strong>Wise is the cheapest option for most transfers from Hong Kong.</strong>{" "}
          It uses the mid-market rate (the real rate banks use between themselves) plus a small, transparent fee.
          Unlike Western Union or traditional banks, there is no hidden exchange rate markup.
        </p>
      </div>

      {/* Comparison table — HKD to PHP */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          匯率比較：HK$ 匯去菲律賓 (PHP)
        </h2>
        <p className="text-zinc-600 mb-4">
          Send HK$10,000 to the Philippines. Compare how much arrives with each provider.
        </p>
        <RateComparisonTable from="HKD" to="PHP" defaultAmount={10000} />
      </section>

      {/* Comparison table — HKD to IDR */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          匯率比較：HK$ 匯去印尼 (IDR)
        </h2>
        <RateComparisonTable from="HKD" to="IDR" defaultAmount={10000} />
      </section>

      {/* Comparison table — HKD to INR */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          匯率比較：HK$ 匯去印度 (INR)
        </h2>
        <RateComparisonTable from="HKD" to="INR" defaultAmount={10000} />
      </section>

      {/* Why Wise section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          點解 Wise 通常最平？/ Why Is Wise Usually Cheapest?
        </h2>
        <div className="space-y-4 text-zinc-700">
          <p>
            大部分匯款公司（包括銀行同 Western Union）賺錢嘅方式係喺匯率上面加價 3-5%。
            佢哋可能標示「零手續費」，但你實際收到嘅金額會少幾百蚊，因為匯率比市場差。
          </p>
          <p>
            Wise 嘅做法唔同：佢用中間市場匯率（你 Google search &quot;HKD to PHP&quot; 見到嗰個），
            然後收一個透明嘅手續費。呢個模式通常 total cost 更低。
          </p>
          <p className="text-sm text-zinc-500 italic">
            Most money transfer companies (including banks and Western Union) make money by marking up the exchange rate by 3-5%.
            They may advertise &quot;zero fees,&quot; but you receive less money because the rate is worse than the market rate.
            Wise uses the mid-market rate and charges a small transparent fee, which usually results in lower total cost.
          </p>
        </div>
      </section>

      {/* WeeCove independence statement */}
      <section className="mb-10 bg-zinc-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-zinc-900 mb-3">
          WeeCove 嘅獨立性 / Our Independence
        </h2>
        <p className="text-zinc-700 mb-2">
          WeeCove 唔屬於任何匯款公司。我哋唔係 Wise、Western Union 或任何 provider 嘅附屬公司。
          呢篇文章嘅排名完全基於數據 — 邊間畀你最多錢，排最高。
        </p>
        <p className="text-zinc-600 text-sm">
          Note: Some comparison sites (such as Exiap) are owned by Wise.
          WeeCove is fully independent. Rankings are based purely on total amount received.
          We may earn affiliate commissions when you use a link, at no extra cost to you.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          常見問題 / FAQ
        </h2>
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
            href="/compare/hong-kong-remittance"
            className="block p-4 border border-zinc-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <div className="font-semibold text-zinc-900">香港匯款完整指南</div>
            <div className="text-sm text-zinc-500">Hong Kong Remittance Guide — compare all providers</div>
          </Link>
          <Link
            href="/compare/send-money-philippines"
            className="block p-4 border border-zinc-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <div className="font-semibold text-zinc-900">Send Money from HK to Philippines</div>
            <div className="text-sm text-zinc-500">Cheapest ways to send money to the Philippines from Hong Kong</div>
          </Link>
        </div>
      </section>

      {/* Footer note */}
      <footer className="text-xs text-zinc-400 border-t border-zinc-200 pt-4">
        <p>
          WeeCove is operated independently. We are not affiliated with, endorsed by, or owned by Wise, Western Union, or any money transfer provider.
          Content is for informational purposes. Always verify current rates before making a transfer.
        </p>
      </footer>
    </main>
  );
}

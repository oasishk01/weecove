import type { Metadata } from "next";
import Link from "next/link";
import { RateComparisonTable } from "@/components/RateComparisonTable";
import { LiveClock } from "@/components/LiveClock";
import { PROVIDERS } from "@/lib/remittance-data";

export const metadata: Metadata = {
  title: "Send Money from Hong Kong to Philippines (2026) — Cheapest Ways Compared | WeeCove",
  description:
    "Compare the cheapest ways to send money from Hong Kong to the Philippines. Wise vs Western Union vs Remitly vs GCash. Independent comparison with real rates.",
  alternates: {
    canonical: "/compare/send-money-philippines",
  },
  openGraph: {
    title: "Send Money HK to Philippines (2026) | WeeCove",
    description: "Compare cheapest ways to send HKD to PHP. Wise vs Western Union vs Remitly vs GCash.",
    url: "https://weecove.com/compare/send-money-philippines",
    type: "article",
  },
};

const FAQ = [
  {
    q: "What is the cheapest way to send money to the Philippines from Hong Kong?",
    a: "Wise is cheapest for bank transfers (uses mid-market rate + small fee). Remitly is best for instant GCash delivery. Western Union is most expensive but offers cash pickup at thousands of locations.",
  },
  {
    q: "Can I send money to GCash from Hong Kong?",
    a: "Yes. Remitly supports direct GCash delivery from HK. WorldRemit also offers GCash as a payout option. Wise does not support GCash directly but delivers to Philippine bank accounts.",
  },
  {
    q: "How much does it cost to send HK$10,000 to the Philippines?",
    a: "With Wise, you would pay about HK$25 in fees and receive the full mid-market rate. With Western Union, the fee may show as zero but the exchange rate markup means you lose about HK$300-400 in hidden costs.",
  },
  {
    q: "How long does a money transfer from HK to Philippines take?",
    a: "Remitly to GCash: minutes. Wise bank transfer: 1-2 business days. Western Union cash pickup: minutes. Bank wire (HSBC/BOC): 2-5 business days.",
  },
  {
    q: "Do I need ID to send money to the Philippines?",
    a: "Yes. All licensed money transfer services require ID verification. You will need your HKID or passport. First-time transfers may take longer for verification.",
  },
];

export default function SendMoneyPhilippinesPage() {
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
    headline: "Send Money from Hong Kong to Philippines — Cheapest Ways Compared",
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
        <Link href="/compare/hong-kong-remittance" className="hover:text-emerald-600">HK Remittance</Link>
        {" › "}
        <span>Philippines</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
        Send Money from Hong Kong to Philippines (2026)
      </h1>
      <p className="text-lg text-zinc-600 mb-2">
        Compare the cheapest and fastest ways to send HKD to PHP
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-8">
        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold w-fit">
          🇭🇰 → 🇵🇭 Independent Comparison
        </span>
        <LiveClock />
      </div>

      {/* Context */}
      <section className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-zinc-900 mb-2">
          About This Corridor
        </h2>
        <p className="text-zinc-700 text-sm">
          About 200,000 Filipino workers live in Hong Kong, making HK→Philippines one of the
          busiest remittance corridors in Asia. The Philippines received $35.6 billion in
          remittances in 2025, with Hong Kong as one of the top sending countries.
          The most popular methods are bank transfer (to BDO, BPI, Metrobank) and mobile
          wallet (GCash, Maya).
        </p>
      </section>

      {/* Main comparison */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          Compare: Send HK$ to Philippines
        </h2>
        <RateComparisonTable from="HKD" to="PHP" defaultAmount={10000} />
      </section>

      {/* Method breakdown */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          Best Option by Priority
        </h2>
        <div className="space-y-4">
          <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
            <h3 className="font-bold text-emerald-800">💰 Cheapest: Wise</h3>
            <p className="text-sm text-zinc-700 mt-1">
              Mid-market rate + HK$25 fee. No hidden markup. Best if you can wait 1-2 days.
              Delivers to any Philippine bank account.
            </p>
          </div>
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
            <h3 className="font-bold text-blue-800">⚡ Fastest to GCash: Remitly</h3>
            <p className="text-sm text-zinc-700 mt-1">
              Arrives in minutes via GCash or Maya. Slightly higher rate markup (~1.4%)
              but worth it if your family needs money now.
            </p>
          </div>
          <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
            <h3 className="font-bold text-amber-800">📍 Cash Pickup: Western Union</h3>
            <p className="text-sm text-zinc-700 mt-1">
              Pickup at thousands of locations across the Philippines. Highest cost (~4% rate markup)
              but the only option if receiver has no bank account or GCash.
            </p>
          </div>
          <div className="border border-zinc-200 rounded-lg p-4">
            <h3 className="font-bold text-zinc-800">🏦 Large Transfers (HK$50K+): OFX</h3>
            <p className="text-sm text-zinc-700 mt-1">
              Zero fees, good rates. Best for large one-time transfers. Not ideal for small
              regular remittances.
            </p>
          </div>
        </div>
      </section>

      {/* How much you lose */}
      <section className="mb-10 bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-red-800 mb-3">
          How Much Are You Losing?
        </h2>
        <p className="text-zinc-700 mb-3">
          If you send HK$10,000 monthly through a bank or Western Union instead of Wise,
          you could be losing HK$200-400 every month in hidden exchange rate markup.
          That is HK$2,400-4,800 per year.
        </p>
        <p className="text-zinc-700 font-semibold">
          In 5 years, that is HK$12,000-24,000 lost to bad exchange rates.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">FAQ</h2>
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
        <h2 className="text-xl font-bold text-zinc-900 mb-4">Related Guides</h2>
        <div className="grid gap-3">
          <Link
            href="/compare/wise-remittance"
            className="block p-4 border border-zinc-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <div className="font-semibold text-zinc-900">Wise 匯款完整指南</div>
            <div className="text-sm text-zinc-500">Full Wise review — fees, rates, and comparison</div>
          </Link>
          <Link
            href="/compare/hong-kong-remittance"
            className="block p-4 border border-zinc-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <div className="font-semibold text-zinc-900">香港海外匯款比較</div>
            <div className="text-sm text-zinc-500">All corridors — Philippines, Indonesia, India</div>
          </Link>
        </div>
      </section>

      <footer className="text-xs text-zinc-400 border-t border-zinc-200 pt-4">
        <p>
          WeeCove is operated independently. We are not affiliated with any money transfer provider.
          Rates are indicative and updated weekly. Always verify current rates before transferring.
        </p>
      </footer>
    </main>
  );
}

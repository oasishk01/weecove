import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RateComparisonTable } from "@/components/RateComparisonTable";
import { LiveClock } from "@/components/LiveClock";
import { CORRIDOR_PAGES, getCorridorBySlug } from "@/lib/corridor-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return CORRIDOR_PAGES.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCorridorBySlug(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/compare/${c.slug}` },
    openGraph: {
      title: c.ogTitle,
      description: c.description,
      url: `https://weecove.com/compare/${c.slug}`,
      type: "article",
    },
  };
}

const COLOR_MAP = {
  emerald: { border: "border-emerald-200", bg: "bg-emerald-50", title: "text-emerald-800" },
  blue: { border: "border-blue-200", bg: "bg-blue-50", title: "text-blue-800" },
  amber: { border: "border-amber-200", bg: "bg-amber-50", title: "text-amber-800" },
  zinc: { border: "border-zinc-200", bg: "", title: "text-zinc-800" },
} as const;

export default async function CorridorPage({ params }: Props) {
  const { slug } = await params;
  const c = getCorridorBySlug(slug);
  if (!c) notFound();

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Send Money from Hong Kong to ${c.country} — Cheapest Ways Compared`,
    description: c.description,
    author: { "@type": "Organization", name: "WeeCove" },
    publisher: { "@type": "Organization", name: "WeeCove", url: "https://weecove.com" },
    datePublished: "2026-04-10",
    dateModified: "2026-04-10",
  };

  const related = CORRIDOR_PAGES.filter((r) => r.slug !== c.slug).slice(0, 3);

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
        <span>{c.country}</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
        Send Money from Hong Kong to {c.country} (2026)
      </h1>
      <p className="text-lg text-zinc-600 mb-2">
        Compare the cheapest and fastest ways to send HKD to {c.currency}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-8">
        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold w-fit">
          {"🇭🇰"} → {c.flag} Independent Comparison
        </span>
        <LiveClock />
      </div>

      {/* Context */}
      <section className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-zinc-900 mb-2">About This Corridor</h2>
        <p className="text-zinc-700 text-sm">{c.context}</p>
      </section>

      {/* Main comparison */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">
          Compare: Send HK$ to {c.country}
        </h2>
        <RateComparisonTable from="HKD" to={c.currency} defaultAmount={c.savingsAmount} />
      </section>

      {/* Best options */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Best Option by Priority</h2>
        <div className="space-y-4">
          {c.bestOptions.map((opt) => {
            const colors = COLOR_MAP[opt.color];
            return (
              <div key={opt.label} className={`border ${colors.border} ${colors.bg} rounded-lg p-4`}>
                <h3 className={`font-bold ${colors.title}`}>{opt.icon} {opt.label}</h3>
                <p className="text-sm text-zinc-700 mt-1">{opt.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Savings */}
      <section className="mb-10 bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-red-800 mb-3">How Much Are You Losing?</h2>
        <p className="text-zinc-700 mb-3">
          If you send HK${c.savingsAmount.toLocaleString()} monthly through a bank or Western Union instead of Wise,
          you could be losing {c.savingsLossMonthly} every month in hidden exchange rate markup.
          That is {c.savingsLossYearly} per year.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">FAQ</h2>
        <div className="space-y-4">
          {c.faq.map((f, i) => (
            <details key={i} className="border border-zinc-200 rounded-lg">
              <summary className="p-4 font-semibold text-zinc-900 cursor-pointer hover:bg-zinc-50">
                {f.q}
              </summary>
              <p className="px-4 pb-4 text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-900 mb-4">Related Guides</h2>
        <div className="grid gap-3">
          <Link
            href="/compare/wise-remittance"
            className="block p-4 border border-zinc-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <div className="font-semibold text-zinc-900">Wise Review</div>
            <div className="text-sm text-zinc-500">Full Wise review, fees, rates, and comparison</div>
          </Link>
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/compare/${r.slug}`}
              className="block p-4 border border-zinc-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
            >
              <div className="font-semibold text-zinc-900">{r.flag} Send Money to {r.country}</div>
              <div className="text-sm text-zinc-500">HKD to {r.currency} corridor comparison</div>
            </Link>
          ))}
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

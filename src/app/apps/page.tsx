import Link from "next/link";
import Image from "next/image";
import { APPS } from "./data";
import { BlurFade } from "@/components/ui/blur-fade";

export const metadata = {
  title: "Best Earning Apps in Hong Kong (2026) — WeeCove",
  description: "Compare the top reward and survey apps available in Hong Kong. Honest reviews, real data, updated for 2026.",
};

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < Math.round(score / 2) ? "text-amber-400" : "text-zinc-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-zinc-500 ml-1">{score}/10</span>
    </div>
  );
}

export default function AppsDirectoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Earning Apps in Hong Kong (2026)",
    description: "Compare the top reward and survey apps available in Hong Kong.",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: APPS.length,
    itemListElement: APPS.map((app, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: app.name,
        description: app.tagline,
        applicationCategory: "FinanceApplication",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: app.rating,
          bestRating: 5,
          worstRating: 1,
        },
        url: `https://weecove.com/apps/${app.slug}`,
      },
    })),
  };

  return (
    <div className="min-h-full bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/otter-head.png" alt="" width={40} height={34} className="h-7 w-auto" />
            <span className="text-emerald-600 font-bold text-lg tracking-tight">WeeCove</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/apps" className="text-sm text-zinc-900 font-medium hidden sm:block">Apps</Link>
            <Link href="/login" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Log in</Link>
            <Link href="/signup" className="text-sm font-medium bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      <section className="px-6 pt-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <BlurFade delay={0.1}>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Updated April 2026</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 mt-2 tracking-tight">
              Best Earning Apps in Hong Kong
            </h1>
            <p className="mt-4 text-zinc-500 leading-relaxed max-w-xl">
              We tested every major reward and survey app available in Hong Kong. Here are our honest rankings based on earning potential, cashout speed, and ease of use.
            </p>
          </BlurFade>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto space-y-4">
          {APPS.map((app, i) => (
            <BlurFade key={app.slug} delay={0.1 + i * 0.05}>
              <Link href={`/apps/${app.slug}`} className="block">
                <div className={`rounded-2xl border p-6 transition-all duration-300 hover:shadow-md ${app.featured ? "border-emerald-200 bg-emerald-50/30 ring-1 ring-emerald-100" : "border-zinc-200/60 bg-white hover:border-emerald-200"}`}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-2xl">{app.icon}</span>
                    <span className="text-zinc-300 font-bold text-lg">#{i + 1}</span>
                    <h2 className="text-lg font-bold text-zinc-900">{app.name}</h2>
                    {app.featured && (
                      <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Our Pick</span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 mt-1">{app.tagline}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <StarRating score={app.score} />
                    <div className="text-right">
                      <p className="text-sm font-bold text-zinc-900">{app.earningRange}</p>
                      <p className="text-xs text-zinc-400">Min: {app.minCashout}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {app.methods.map((m) => (
                      <span key={m} className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded-md">{m}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <BlurFade delay={0.1}>
            <Link
              href="/apps/compare"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 text-white font-semibold text-sm px-6 py-3 hover:bg-zinc-800 transition-all"
            >
              Compare Top Apps Side-by-Side
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </BlurFade>
        </div>
      </section>

      <section className="px-6 pb-16 bg-zinc-50 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-zinc-900">How We Rank These Apps</h2>
          <p className="text-zinc-500 text-sm mt-2 max-w-lg mx-auto">
            We sign up, complete tasks, and cash out on every app we review. Rankings are based on actual earning potential in Hong Kong, cashout speed, minimum withdrawal, and user trust scores.
          </p>
        </div>
      </section>

      <footer className="px-6 py-10 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-zinc-900 text-sm">WeeCove</p>
            <p className="text-zinc-400 text-xs">Operated by Sobie Tech Limited, Hong Kong</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <Link href="/" className="hover:text-zinc-600 transition-colors">Home</Link>
            <Link href="/apps" className="hover:text-zinc-600 transition-colors">Apps</Link>
            <Link href="/terms" className="hover:text-zinc-600 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-zinc-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

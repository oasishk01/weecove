import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { APPS } from "../data";
import { BlurFade } from "@/components/ui/blur-fade";

export function generateStaticParams() {
  return APPS.map((app) => ({ slug: app.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const app = APPS.find((a) => a.slug === params.slug);
  if (!app) return {};
  return {
    title: `${app.name} Review (2026) — Is It Legit? | WeeCove`,
    description: `Honest ${app.name} review for Hong Kong users. ${app.tagline}. Earning potential: ${app.earningRange}.`,
  };
}

function StarRating({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < Math.round(score / 2) ? "text-amber-400" : "text-zinc-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-lg font-bold text-zinc-700 ml-2">{score}/10</span>
    </div>
  );
}

export default async function AppReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = APPS.find((a) => a.slug === slug);
  if (!app) notFound();

  const rank = APPS.findIndex((a) => a.slug === slug) + 1;

  // Only add Review schema for third-party apps (not self-review)
  const jsonLd = app.slug === "weecove" ? null : {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${app.name} Review`,
    reviewBody: app.verdict,
    author: { "@type": "Organization", name: "WeeCove" },
    itemReviewed: {
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
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: app.score,
      bestRating: 10,
      worstRating: 1,
    },
  };

  return (
    <div className="min-h-full bg-white">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/otter-head.png" alt="" width={40} height={34} className="h-7 w-auto" />
            <span className="text-emerald-600 font-bold text-lg tracking-tight">WeeCove</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/apps" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">All Apps</Link>
            <Link href="/login" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Log in</Link>
            <Link href="/signup" className="text-sm font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              Sign up free
            </Link>
          </div>
        </div>
      </nav>

      <article className="px-6 pt-12 pb-16">
        <div className="max-w-2xl mx-auto">
          <BlurFade delay={0.1}>
            <Link href="/apps" className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
              &larr; Back to all apps
            </Link>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-zinc-400">#{rank} in Hong Kong</span>
                {app.featured && (
                  <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Our Pick</span>
                )}
              </div>
              <h1 className="text-3xl font-extrabold text-zinc-900">
                <span className="text-4xl mr-2">{app.icon}</span>
                {app.name} Review
              </h1>
              <p className="text-zinc-500 mt-2">{app.tagline}</p>
              <div className="mt-4">
                <StarRating score={app.score} />
              </div>
              {app.trustpilot !== "New" && (
                <p className="text-xs text-zinc-400 mt-1">Trustpilot: {app.trustpilot}</p>
              )}
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-zinc-50 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-400 uppercase tracking-wide">Earning</p>
                <p className="text-lg font-bold text-zinc-900 mt-1">{app.earningRange}</p>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-400 uppercase tracking-wide">Min. Cashout</p>
                <p className="text-lg font-bold text-zinc-900 mt-1">{app.minCashout}</p>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 text-center">
                <p className="text-xs text-zinc-400 uppercase tracking-wide">Rating</p>
                <p className="text-lg font-bold text-zinc-900 mt-1">{app.rating}/5</p>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.25}>
            <div className="mt-8">
              <h2 className="text-lg font-bold text-zinc-900">How You Earn</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {app.methods.map((m) => (
                  <span key={m} className="text-sm bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-medium">{m}</span>
                ))}
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="mt-8">
              <h2 className="text-lg font-bold text-zinc-900">Payment Methods</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {app.payments.map((p) => (
                  <span key={p} className="text-sm bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-lg">{p}</span>
                ))}
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.35}>
            <div className="mt-8">
              <h2 className="text-lg font-bold text-zinc-900">Available On</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {app.platforms.map((p) => (
                  <span key={p} className="text-sm bg-zinc-100 text-zinc-600 px-3 py-1.5 rounded-lg">{p}</span>
                ))}
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-bold text-emerald-700">Pros</h2>
                <ul className="mt-3 space-y-2">
                  {app.pros.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-zinc-700">
                      <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold text-red-600">Cons</h2>
                <ul className="mt-3 space-y-2">
                  {app.cons.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-zinc-700">
                      <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.45}>
            <div className="mt-10 bg-zinc-50 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-zinc-900">Our Verdict</h2>
              <p className="text-zinc-600 mt-2 leading-relaxed">{app.verdict}</p>
            </div>
          </BlurFade>

          <BlurFade delay={0.5}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white font-semibold text-base px-7 py-3.5 hover:bg-emerald-700 transition-all text-center"
              >
                Try {app.name}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
              <Link
                href="/apps"
                className="flex-1 inline-flex items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 font-medium text-base px-7 py-3.5 hover:bg-zinc-200 transition-all text-center"
              >
                Compare All Apps
              </Link>
            </div>
          </BlurFade>
        </div>
      </article>

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

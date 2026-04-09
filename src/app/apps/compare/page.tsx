import Link from "next/link";
import Image from "next/image";
import { APPS } from "../data";
import { BlurFade } from "@/components/ui/blur-fade";

export const metadata = {
  title: "Compare Earning Apps — WeeCove vs Freecash vs Swagbucks | WeeCove",
  description: "Side-by-side comparison of the best earning apps in Hong Kong. Compare earning potential, cashout speed, and payment methods.",
};

export default function ComparePage() {
  const compareApps = APPS.slice(0, 4);

  return (
    <div className="min-h-full bg-white">
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

      <section className="px-6 pt-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <BlurFade delay={0.1}>
            <Link href="/apps" className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
              &larr; Back to all apps
            </Link>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mt-6">Comparison</p>
            <h1 className="text-3xl font-extrabold text-zinc-900 mt-2 tracking-tight">
              Side-by-Side Comparison
            </h1>
            <p className="mt-3 text-zinc-500 max-w-lg">
              How do the top earning apps stack up against each other? Here is an honest comparison based on real testing.
            </p>
          </BlurFade>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <BlurFade delay={0.2}>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-zinc-200">
                  <th className="text-left py-4 pr-4 font-semibold text-zinc-500 w-40" />
                  {compareApps.map((app) => (
                    <th key={app.slug} className="text-center py-4 px-4 font-bold text-zinc-900">
                      <Link href={`/apps/${app.slug}`} className="hover:text-emerald-600 transition-colors">
                        <span className="text-2xl block mb-1">{app.icon}</span>
                        {app.name}
                        {app.featured && (
                          <span className="block text-xs font-semibold text-emerald-600 mt-1">Our Pick</span>
                        )}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-100">
                  <td className="py-4 pr-4 font-medium text-zinc-500">Score</td>
                  {compareApps.map((app) => (
                    <td key={app.slug} className="text-center py-4 px-4">
                      <span className={`text-lg font-bold ${app.score >= 9 ? "text-emerald-600" : "text-zinc-900"}`}>{app.score}/10</span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                  <td className="py-4 pr-4 font-medium text-zinc-500">Earning</td>
                  {compareApps.map((app) => (
                    <td key={app.slug} className="text-center py-4 px-4 font-semibold text-zinc-900">{app.earningRange}</td>
                  ))}
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="py-4 pr-4 font-medium text-zinc-500">Min. Cashout</td>
                  {compareApps.map((app) => (
                    <td key={app.slug} className="text-center py-4 px-4 text-zinc-700">{app.minCashout}</td>
                  ))}
                </tr>
                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                  <td className="py-4 pr-4 font-medium text-zinc-500">Trustpilot</td>
                  {compareApps.map((app) => (
                    <td key={app.slug} className="text-center py-4 px-4 text-zinc-700">{app.trustpilot}</td>
                  ))}
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="py-4 pr-4 font-medium text-zinc-500">Methods</td>
                  {compareApps.map((app) => (
                    <td key={app.slug} className="text-center py-4 px-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {app.methods.map((m) => (
                          <span key={m} className="text-xs bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">{m}</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-zinc-100 bg-zinc-50/50">
                  <td className="py-4 pr-4 font-medium text-zinc-500">Payments</td>
                  {compareApps.map((app) => (
                    <td key={app.slug} className="text-center py-4 px-4 text-zinc-700 text-xs">{app.payments.join(", ")}</td>
                  ))}
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="py-4 pr-4 font-medium text-zinc-500">Platforms</td>
                  {compareApps.map((app) => (
                    <td key={app.slug} className="text-center py-4 px-4 text-zinc-700 text-xs">{app.platforms.join(", ")}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium text-zinc-500">HK Optimised</td>
                  {compareApps.map((app) => (
                    <td key={app.slug} className="text-center py-4 px-4">
                      {app.slug === "weecove" ? (
                        <span className="text-emerald-600 font-bold">Yes</span>
                      ) : (
                        <span className="text-zinc-400">No</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </BlurFade>
        </div>

        <div className="max-w-4xl mx-auto mt-10">
          <BlurFade delay={0.3}>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
              <p className="text-emerald-800 font-semibold">Our recommendation for Hong Kong users</p>
              <p className="text-emerald-600 text-sm mt-1">WeeCove is purpose-built for HK, supports GCash, and has the lowest cashout in HKD.</p>
              <Link
                href="/signup"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white font-semibold text-sm px-6 py-3 hover:bg-emerald-700 transition-all"
              >
                Try WeeCove Free
              </Link>
            </div>
          </BlurFade>
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

import Link from "next/link";
import Image from "next/image";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";

const FAQ = [
  {
    q: "Is WeeCove free?",
    a: "Yes, 100% free. You never pay anything. Companies pay us, and we share the money with you.",
  },
  {
    q: "Where does the money come from?",
    a: "Companies pay us to find people who will try their apps and answer surveys. You get 70% of what they pay. We keep 30% to run the service.",
  },
  {
    q: "How much can I earn?",
    a: "It depends on how much time you spend. Most users earn HK$50-200 per month doing surveys and tasks in their spare time.",
  },
  {
    q: "How do I get paid?",
    a: "Cash out via PayPal once you reach HK$40. Payments are processed within 24-48 hours.",
  },
  {
    q: "Is WeeCove legitimate?",
    a: "Yes. WeeCove is operated by Sobie Tech Limited, a registered Hong Kong company. We use trusted survey and offer partners to source tasks.",
  },
];

const STEPS = [
  {
    title: "Create your account",
    desc: "Name and email. Takes 10 seconds. No documents, no fees.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Complete tasks",
    desc: "Answer surveys, try apps, share your opinion. All from your phone.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Get paid",
    desc: "Cash out from HK$40 via PayPal. Money arrives in 24-48 hours.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
];

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
            <Link href="/apps" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
              Apps
            </Link>
            <Link href="/login" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Sign up free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-2xl mx-auto text-center">
          <BlurFade delay={0}>
            <div className="flex items-center justify-center gap-3 mb-6">
              {["🇭🇰", "🇵🇭", "🇮🇩", "🇮🇳", "🇳🇵", "🇧🇩"].map((flag, i) => (
                <span
                  key={i}
                  className="text-3xl md:text-4xl animate-float"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {flag}
                </span>
              ))}
            </div>
            <p className="text-xs text-zinc-400 mb-4">Hong Kong, Philippines, Indonesia, India, Nepal, Bangladesh</p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <AnimatedShinyText>Free to use — no fees, ever</AnimatedShinyText>
            </div>
          </BlurFade>

          <BlurFade delay={0.2}>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
              Earn extra cash.
              <br />
              <span className="text-emerald-600">Send more home.</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3}>
            <p className="mt-5 text-lg text-zinc-500 leading-relaxed max-w-md mx-auto">
              Complete surveys and tasks on your phone. Get paid in HK$ via PayPal. Takes 10 seconds to start.
            </p>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/signup">
                <ShimmerButton
                  className="h-12 px-7 text-base font-semibold"
                  shimmerColor="#10b981"
                  shimmerSize="0.1em"
                  background="rgba(16, 185, 129, 1)"
                >
                  Start Earning
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </ShimmerButton>
              </Link>
              <Link
                href="/how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 text-zinc-700 font-medium text-base px-7 py-3.5 hover:bg-zinc-200 transition-all"
              >
                How it works
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Trust logos */}
      <section className="px-6 py-10 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <BlurFade delay={0.1}>
            <p className="text-center text-xs font-medium text-zinc-400 uppercase tracking-widest mb-6">Partnered with trusted global platforms</p>
            <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
              {/* PayPal */}
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#003087]" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.322c-.533 0-.988.393-1.07.92l-.848 5.36-.244 1.546a.641.641 0 0 1-.633.54l-.452-.36z"/>
                </svg>
                <span className="text-sm font-bold text-zinc-400">PayPal</span>
              </div>
              {/* Wise */}
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#9FE870]" fill="currentColor">
                  <path d="M12.5 3L20 8.5l-3 5.5-5-2-5 2L4 8.5 12.5 3zM12.5 6l-5 3.5 2 3.5 3-1 3 1 2-3.5L12.5 6z"/>
                </svg>
                <span className="text-sm font-bold text-zinc-400">Wise</span>
              </div>
              {/* BitLabs */}
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#6366f1]" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="14" width="7" height="7" rx="1.5"/>
                </svg>
                <span className="text-sm font-bold text-zinc-400">BitLabs</span>
              </div>
              {/* Google Play */}
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <path d="M3 20.5V3.5c0-.8.5-1.3 1-1.5l9.5 9.5L4 21c-.5-.2-1-.7-1-1.5z" fill="#4285F4"/>
                  <path d="M17.5 14.5L13.5 11.5 4 21c.3.1.7.2 1 0l12.5-6.5z" fill="#34A853"/>
                  <path d="M20 12c.5-.3.5-.7 0-1l-2.5-1.5L13.5 11.5l4 3 2.5-1.5z" fill="#FBBC04"/>
                  <path d="M4 3c.3-.1.7-.2 1 0l12.5 6.5L13.5 11.5 4 3z" fill="#EA4335"/>
                </svg>
                <span className="text-sm font-bold text-zinc-400">Google Play</span>
              </div>
              {/* GCash */}
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#007DFE]" fill="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">G</text>
                </svg>
                <span className="text-sm font-bold text-zinc-400">GCash</span>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 bg-zinc-50">
        <div className="max-w-3xl mx-auto">
          <BlurFade delay={0.1}>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">How it works</p>
            <h2 className="text-2xl font-bold text-zinc-900 mt-2">Three steps to your first payout</h2>
          </BlurFade>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <BlurFade key={s.title} delay={0.2 + i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-zinc-200/60 h-full hover:shadow-md hover:border-emerald-200 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <h3 className="mt-4 font-semibold text-zinc-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue split */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 md:p-10 text-white overflow-hidden relative">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }} />
              <div className="relative">
                <p className="text-emerald-200 text-xs font-semibold uppercase tracking-widest">Transparent</p>
                <h2 className="text-2xl font-bold mt-2">Where does the money come from?</h2>
                <p className="mt-3 text-emerald-100 leading-relaxed max-w-lg">
                  Companies pay us to find people who will try their apps and answer surveys.
                  We share the revenue with you.
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex-1 bg-white/15 backdrop-blur rounded-xl px-5 py-4 text-center">
                    <p className="text-3xl font-bold text-white">70%</p>
                    <p className="text-emerald-200 text-sm mt-1">Goes to you</p>
                  </div>
                  <div className="text-emerald-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5" /></svg>
                  </div>
                  <div className="flex-1 bg-white/10 backdrop-blur rounded-xl px-5 py-4 text-center">
                    <p className="text-3xl font-bold text-emerald-200">30%</p>
                    <p className="text-emerald-300 text-sm mt-1">Runs the platform</p>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 bg-zinc-50">
        <div className="max-w-2xl mx-auto">
          <BlurFade delay={0.1}>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">FAQ</p>
            <h2 className="text-2xl font-bold text-zinc-900 mt-2">Common questions</h2>
          </BlurFade>
          <div className="mt-8 space-y-0">
            {FAQ.map((item, i) => (
              <BlurFade key={i} delay={0.15 + i * 0.05}>
                <details className="group border-b border-zinc-200 last:border-0">
                  <summary className="flex items-center justify-between py-5 cursor-pointer text-zinc-900 font-medium text-sm">
                    {item.q}
                    <svg className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <p className="pb-5 text-zinc-500 text-sm leading-relaxed">{item.a}</p>
                </details>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Payment methods */}
      <section className="px-6 py-12">
        <BlurFade delay={0.1}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Cash out via</p>
            <div className="mt-5 flex items-center justify-center gap-6">
              {["PayPal", "Wise", "GCash"].map((name) => (
                <div key={name} className="bg-zinc-50 border border-zinc-200/60 rounded-xl px-6 py-3 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300">
                  <p className="text-lg font-bold text-zinc-400">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="bg-zinc-900 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "20px 20px",
              }} />
              <div className="relative">
                <Image
                  src="/otter-full.png"
                  alt="WeeCove Otter"
                  width={320}
                  height={180}
                  className="mx-auto mb-5 h-32 w-auto drop-shadow-2xl"
                />
                <p className="text-zinc-500 text-xs uppercase tracking-widest">Hong Kong registered company</p>
                <h2 className="text-2xl font-bold text-white mt-3">Ready to start earning?</h2>
                <p className="text-zinc-400 mt-2 text-sm">Join WeeCove and earn from your phone.</p>
                <Link href="/signup" className="mt-6 inline-block">
                  <ShimmerButton
                    className="h-12 px-7 text-base font-semibold"
                    shimmerColor="#10b981"
                    shimmerSize="0.1em"
                    background="rgba(16, 185, 129, 1)"
                  >
                    Create Free Account
                  </ShimmerButton>
                </Link>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-zinc-900 text-sm">WeeCove</p>
            <p className="text-zinc-400 text-xs">Operated by Sobie Tech Limited, Hong Kong</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <Link href="/how-it-works" className="hover:text-zinc-600 transition-colors">How It Works</Link>
            <Link href="/apps" className="hover:text-zinc-600 transition-colors">Best Apps</Link>
            <Link href="/terms" className="hover:text-zinc-600 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-zinc-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

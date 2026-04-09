import Link from "next/link";
import Image from "next/image";

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
          <Link href="/" className="text-emerald-600 font-bold text-lg tracking-tight">
            WeeCove
          </Link>
          <div className="flex items-center gap-4">
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
          <div className="animate-float animate-glow mb-6">
            <Image
              src="/otter-full.png"
              alt="WeeCove Otter"
              width={280}
              height={160}
              className="mx-auto h-36 w-auto"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            Free to use — no fees, ever
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
            Earn extra cash.
            <br />
            <span className="text-emerald-600">Get paid fast.</span>
          </h1>
          <p className="mt-5 text-lg text-zinc-500 leading-relaxed max-w-md mx-auto">
            Complete surveys and tasks on your phone. Get paid in HK$ via PayPal. Takes 10 seconds to start.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white font-semibold text-base px-7 py-3.5 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
            >
              Start Earning
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
            <Link
              href="/how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-100 text-zinc-700 font-medium text-base px-7 py-3.5 hover:bg-zinc-200 transition-all"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 bg-zinc-50">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">How it works</p>
          <h2 className="text-2xl font-bold text-zinc-900 mt-2">Three steps to your first payout</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-zinc-200/60">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  {s.icon}
                </div>
                <h3 className="mt-4 font-semibold text-zinc-900">{s.title}</h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue split */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 md:p-10 text-white">
            <p className="text-emerald-200 text-xs font-semibold uppercase tracking-widest">Transparent</p>
            <h2 className="text-2xl font-bold mt-2">Where does the money come from?</h2>
            <p className="mt-3 text-emerald-100 leading-relaxed max-w-lg">
              Companies pay us to find people who will try their apps and answer surveys.
              We give you 70% of what they pay. We keep 30% to run the service.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex-1 bg-white/15 backdrop-blur rounded-xl px-5 py-4 text-center">
                <p className="text-3xl font-bold">70%</p>
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
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 bg-zinc-50">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">FAQ</p>
          <h2 className="text-2xl font-bold text-zinc-900 mt-2">Common questions</h2>
          <div className="mt-8 space-y-0">
            {FAQ.map((item, i) => (
              <details key={i} className="group border-b border-zinc-200 last:border-0">
                <summary className="flex items-center justify-between py-5 cursor-pointer text-zinc-900 font-medium text-sm">
                  {item.q}
                  <svg className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="pb-5 text-zinc-500 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Payment methods */}
      <section className="px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Cash out via</p>
          <div className="mt-5 flex items-center justify-center gap-6">
            {["PayPal", "Wise", "GCash"].map((name) => (
              <div key={name} className="bg-zinc-50 border border-zinc-200/60 rounded-xl px-6 py-3">
                <p className="text-lg font-bold text-zinc-400">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-zinc-900 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Hong Kong registered company</p>
            <h2 className="text-2xl font-bold text-white mt-3">Ready to start earning?</h2>
            <p className="text-zinc-400 mt-2 text-sm">Join WeeCove and earn from your phone.</p>
            <Link
              href="/signup"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-white font-semibold text-base px-7 py-3.5 hover:bg-emerald-400 transition-all"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/otter-head.png" alt="WeeCove" width={24} height={24} className="w-6 h-6" />
            <div>
              <p className="font-semibold text-zinc-900 text-sm">WeeCove</p>
              <p className="text-zinc-400 text-xs">Operated by Sobie Tech Limited, Hong Kong</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <Link href="/how-it-works" className="hover:text-zinc-600 transition-colors">How It Works</Link>
            <Link href="/terms" className="hover:text-zinc-600 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-zinc-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

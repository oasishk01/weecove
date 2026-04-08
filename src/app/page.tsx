import Link from "next/link";

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

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero */}
      <section className="relative bg-emerald-600 px-6 pt-12 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }} />

        <div className="relative max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <span className="text-white font-bold text-xl">WeeCove</span>
            <Link href="/login" className="text-emerald-200 text-sm font-medium hover:text-white transition-colors">
              Log in
            </Link>
          </div>
          <p className="text-emerald-200 text-sm font-medium tracking-wide uppercase">Earn from your phone</p>
          <h1 className="text-[2.5rem] leading-[1.1] font-extrabold text-white mt-3">
            Earn extra cash.<br />Get paid fast.
          </h1>
          <p className="text-emerald-100 text-lg mt-4 leading-relaxed max-w-xs">
            Complete surveys and tasks on your phone. Get paid in HK$ via PayPal.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-emerald-700 font-bold text-lg px-7 py-3.5 shadow-xl shadow-emerald-900/20 hover:bg-emerald-50 transition-all active:scale-[0.98]"
          >
            Start Earning — Free
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
          <p className="text-emerald-300 text-sm mt-4">No fees, ever. No credit card needed.</p>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-14 max-w-md mx-auto w-full">
        <h2 className="text-xl font-bold text-zinc-900">How it works</h2>
        <div className="mt-6 space-y-0">
          {[
            { step: "01", title: "Sign up free", desc: "Name and email. 10 seconds. No documents needed." },
            { step: "02", title: "Complete tasks", desc: "Answer surveys, try apps, play games. All free." },
            { step: "03", title: "Cash out", desc: "Withdraw from HK$40 via PayPal. Money in 24-48 hours." },
          ].map((s, i) => (
            <div key={i} className="flex gap-4 py-5 border-b border-zinc-100 last:border-0">
              <span className="text-emerald-600 font-mono text-sm font-bold mt-0.5">{s.step}</span>
              <div>
                <h3 className="font-semibold text-zinc-900">{s.title}</h3>
                <p className="text-zinc-500 text-sm mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Revenue split — transparent */}
      <section className="bg-zinc-50 px-6 py-14">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-zinc-900">Where does the money come from?</h2>
          <p className="text-zinc-600 mt-3 leading-relaxed">
            Companies pay us to find people who will try their apps and answer surveys.
            We give you <strong className="text-zinc-900">70%</strong> of what they pay. We keep 30% to run the service.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm">
            <div className="flex-1 bg-emerald-50 rounded-lg px-4 py-3 text-center">
              <p className="text-2xl font-bold text-emerald-700">70%</p>
              <p className="text-emerald-600 mt-0.5">Goes to you</p>
            </div>
            <div className="text-zinc-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5" /></svg>
            </div>
            <div className="flex-1 bg-zinc-100 rounded-lg px-4 py-3 text-center">
              <p className="text-2xl font-bold text-zinc-500">30%</p>
              <p className="text-zinc-400 mt-0.5">WeeCove</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-14 max-w-md mx-auto w-full">
        <h2 className="text-xl font-bold text-zinc-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-0">
          {FAQ.map((item, i) => (
            <details key={i} className="group border-b border-zinc-100 last:border-0">
              <summary className="flex items-center justify-between py-4 cursor-pointer text-zinc-900 font-medium">
                {item.q}
                <svg className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <p className="pb-4 text-zinc-500 text-sm leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Payment methods */}
      <section className="bg-zinc-50 px-6 py-10">
        <div className="max-w-md mx-auto text-center">
          <p className="text-zinc-400 text-sm font-medium uppercase tracking-wide">Cash out via</p>
          <div className="mt-4 flex items-center justify-center gap-8 text-zinc-400">
            <div className="text-center">
              <p className="text-2xl font-bold">PayPal</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">Wise</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">GCash</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-zinc-900 px-6 py-14 text-center">
        <p className="text-zinc-400 text-sm uppercase tracking-wide">Hong Kong registered company</p>
        <h2 className="text-2xl font-bold text-white mt-2">Start earning today</h2>
        <Link
          href="/signup"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 text-white font-bold text-lg px-7 py-3.5 hover:bg-emerald-400 transition-all"
        >
          Create Free Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 max-w-md mx-auto w-full text-center text-zinc-400 text-xs space-y-2">
        <p className="font-medium text-zinc-500">Sobie Tech Limited</p>
        <p>Hong Kong</p>
        <div className="flex items-center justify-center gap-3 mt-3">
          <Link href="/how-it-works" className="hover:text-zinc-600">How It Works</Link>
          <span>&middot;</span>
          <Link href="/terms" className="hover:text-zinc-600">Terms</Link>
          <span>&middot;</span>
          <Link href="/privacy" className="hover:text-zinc-600">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}

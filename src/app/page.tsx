import Link from "next/link";

const CASHOUTS = [
  { name: "Grace T.", amount: 43, ago: "2h" },
  { name: "Ahmed R.", amount: 40, ago: "5h" },
  { name: "Devi S.", amount: 51, ago: "8h" },
  { name: "Rina M.", amount: 40, ago: "12h" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero — full bleed, punchy */}
      <section className="relative bg-emerald-600 px-6 pt-20 pb-16 overflow-hidden">
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }} />

        <div className="relative max-w-md mx-auto">
          <p className="text-emerald-200 text-sm font-medium tracking-wide uppercase">For overseas workers in Hong Kong</p>
          <h1 className="text-[2.5rem] leading-[1.1] font-extrabold text-white mt-3">
            Earn money.<br />Send more home.
          </h1>
          <p className="text-emerald-100 text-lg mt-4 leading-relaxed max-w-xs">
            Complete tasks on your phone. Get paid in HK$. Cash out to PayPal.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-emerald-700 font-bold text-lg px-7 py-3.5 shadow-xl shadow-emerald-900/20 hover:bg-emerald-50 transition-all active:scale-[0.98]"
          >
            Start Earning
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
          <p className="text-emerald-300 text-sm mt-4">Free forever. No catches.</p>
        </div>
      </section>

      {/* Social proof ticker */}
      <section className="bg-emerald-700 px-6 py-3">
        <div className="max-w-md mx-auto flex items-center gap-3 text-sm text-emerald-100">
          <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
          <p>127 workers earned HK$ 4,380 this week</p>
        </div>
      </section>

      {/* How it works — horizontal, not vertical cards */}
      <section className="px-6 py-14 max-w-md mx-auto w-full">
        <h2 className="text-xl font-bold text-zinc-900">How it works</h2>
        <div className="mt-6 space-y-0">
          {[
            { step: "01", title: "Sign up", desc: "Name, email, country. 10 seconds. No documents." },
            { step: "02", title: "Do tasks", desc: "Play games, try apps, complete surveys. All free." },
            { step: "03", title: "Get paid", desc: "Cash out from HK$40 via PayPal. Money in 24-48 hrs." },
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

      {/* Live cashouts — minimal, not cards */}
      <section className="bg-zinc-50 px-6 py-14">
        <div className="max-w-md mx-auto">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900">Recent cashouts</h2>
            <span className="text-xs text-zinc-400">Live</span>
          </div>
          <div className="space-y-0">
            {CASHOUTS.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-3.5 border-b border-zinc-200/60 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                    {c.name.charAt(0)}
                  </div>
                  <span className="font-medium text-zinc-800">{c.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold tabular-nums">HK$ {c.amount}</span>
                  <span className="text-zinc-400 text-xs ml-2">{c.ago}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / where money comes from */}
      <section className="px-6 py-14 max-w-md mx-auto w-full">
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

      <footer className="px-6 py-6 text-center text-zinc-400 text-xs">
        <p>Sobie Tech Limited &middot; Hong Kong</p>
        <Link href="/how-it-works" className="mt-1 inline-block hover:text-zinc-600">How It Works</Link>
      </footer>
    </div>
  );
}

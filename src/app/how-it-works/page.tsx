import Link from "next/link";

const STEPS = [
  { step: "01", title: "Companies pay for users", desc: "Game studios, survey platforms, and app makers pay money to find people who will try their products." },
  { step: "02", title: "We connect you to them", desc: "WeeCove shows you these tasks — play a game, try an app, answer a survey. All free for you." },
  { step: "03", title: "You get 70% of what they pay", desc: "When a company pays us HK$100, you get HK$70. We keep HK$30 to run the service. You never pay anything." },
  { step: "04", title: "Cash out to PayPal", desc: "Once you reach HK$40 (~$5 USD), request a cashout. We review and send it within 24-48 hours." },
];

const CASHOUTS = [
  { name: "Grace T.", amount: 43, method: "PayPal", ago: "2h" },
  { name: "Ahmed R.", amount: 40, method: "PayPal", ago: "5h" },
  { name: "Devi S.", amount: 51, method: "PayPal", ago: "8h" },
  { name: "Rina M.", amount: 40, method: "GCash", ago: "12h" },
  { name: "Raj K.", amount: 45, method: "PayPal", ago: "1d" },
];

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="bg-emerald-600 px-6 pt-14 pb-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }} />
        <div className="relative">
          <Link href="/" className="text-emerald-200 text-sm hover:text-white">
            {"← Back to home"}
          </Link>
          <h1 className="text-3xl font-extrabold text-white mt-4">How WeeCove Works</h1>
          <p className="text-emerald-100 mt-2 max-w-sm mx-auto">
            Companies pay us to find users. We share the money with you.
          </p>
        </div>
      </header>

      {/* Steps */}
      <section className="px-6 py-14 max-w-md mx-auto w-full">
        {STEPS.map((s, i) => (
          <div key={i} className="flex gap-4 py-5 border-b border-zinc-100 last:border-0">
            <span className="text-emerald-600 font-mono text-sm font-bold mt-0.5">{s.step}</span>
            <div>
              <h3 className="font-semibold text-zinc-900">{s.title}</h3>
              <p className="text-zinc-500 text-sm mt-1 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Money flow */}
      <section className="bg-zinc-50 px-6 py-14">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-zinc-900">Where the money flows</h2>
          <div className="mt-6 space-y-3">
            <div className="bg-white border border-zinc-200 rounded-xl px-5 py-4 text-center">
              <p className="text-zinc-500 text-sm">Company pays</p>
              <p className="text-2xl font-bold text-zinc-900 tabular-nums">HK$ 100</p>
            </div>
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 bg-emerald-50 border-2 border-emerald-200 rounded-xl px-4 py-4 text-center">
                <p className="text-emerald-600 text-sm font-medium">You get</p>
                <p className="text-2xl font-bold text-emerald-700 tabular-nums">HK$ 70</p>
              </div>
              <div className="flex-1 bg-white border border-zinc-200 rounded-xl px-4 py-4 text-center">
                <p className="text-zinc-500 text-sm">WeeCove</p>
                <p className="text-2xl font-bold text-zinc-500 tabular-nums">HK$ 30</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cashout log */}
      <section className="px-6 py-14">
        <div className="max-w-md mx-auto">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900">Recent cashouts</h2>
            <span className="text-xs text-zinc-400">Live</span>
          </div>
          {CASHOUTS.map((c, i) => (
            <div key={i} className="flex items-center justify-between py-3.5 border-b border-zinc-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-bold">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-zinc-800">{c.name}</p>
                  <p className="text-zinc-400 text-xs">{"via " + c.method}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold tabular-nums">{"HK$ " + c.amount}</span>
                <span className="text-zinc-400 text-xs ml-2">{c.ago}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-zinc-50 px-6 py-14">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold text-zinc-900">About us</h2>
          <p className="text-zinc-600 mt-3 leading-relaxed">
            WeeCove is built by <strong className="text-zinc-900">Sobie Tech Limited</strong>, a registered Hong Kong company. We believe overseas workers deserve fair access to earning opportunities.
          </p>
          <div className="mt-4 inline-block bg-white border border-zinc-200 rounded-lg px-4 py-2 text-sm text-zinc-500">
            Hong Kong Company Registration
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 px-6 py-14 text-center">
        <h2 className="text-2xl font-bold text-white">Ready to start earning?</h2>
        <Link
          href="/signup"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 text-white font-bold text-lg px-7 py-3.5 hover:bg-emerald-400 transition-all"
        >
          Create Free Account
        </Link>
      </section>

      <footer className="px-6 py-6 text-center text-zinc-400 text-xs">
        <p>Sobie Tech Limited &middot; Hong Kong</p>
      </footer>
    </div>
  );
}

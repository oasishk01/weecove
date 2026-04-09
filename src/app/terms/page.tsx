import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — WeeCove",
};

export default function TermsPage() {
  return (
    <div className="min-h-full bg-white">
      <div className="px-6 pt-12 pb-16 max-w-2xl mx-auto">
        <Link href="/" className="text-emerald-600 font-bold text-xl">WeeCove</Link>
        <h1 className="text-3xl font-bold mt-8">Terms of Service</h1>
        <p className="text-zinc-400 text-sm mt-2">Last updated: April 8, 2026</p>

        <div className="mt-8 prose prose-zinc prose-sm max-w-none space-y-6 text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-zinc-900">1. About WeeCove</h2>
            <p>WeeCove is a rewards platform operated by Sobie Tech Limited, a company registered in Hong Kong. By using WeeCove, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">2. Eligibility</h2>
            <p>You must be at least 18 years old to use WeeCove. You may only create one account per person. Duplicate accounts will be terminated.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">3. How It Works</h2>
            <p>WeeCove connects you with third-party survey and offer providers. When you complete tasks, you earn rewards in HK$. Rewards are credited to your WeeCove balance after our partners confirm completion.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">4. Cash Out</h2>
            <p>You may request a cash out once your available balance reaches HK$40. Payments are processed within 24-48 hours via PayPal, GCash, or Wise. We reserve the right to review cash out requests for fraud prevention.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">5. Referral Program</h2>
            <p>You may earn rewards by referring friends. Both you and your friend receive HK$5 when they sign up using your referral link. You also earn 10% of your referrals task earnings. Abuse of the referral program (fake accounts, self-referrals) will result in account termination and forfeiture of earnings.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">6. Prohibited Conduct</h2>
            <p>You may not: use bots or automated tools to complete tasks, create multiple accounts, provide false information, attempt to manipulate or defraud the platform, or engage in any activity that violates applicable law.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">7. Account Termination</h2>
            <p>We may suspend or terminate your account at any time for violation of these terms. Unpaid balances may be forfeited if your account is terminated for fraud or abuse.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">8. Limitation of Liability</h2>
            <p>WeeCove is provided &ldquo;as is.&rdquo; We are not responsible for the availability, accuracy, or content of third-party surveys and offers. Our total liability is limited to the amount of your unpaid balance at the time of any claim.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">9. Changes</h2>
            <p>We may update these terms at any time. Continued use of WeeCove after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">10. Contact</h2>
            <p>For questions about these terms, contact us at support@weecove.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — WeeCove",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-full bg-white">
      <div className="px-6 pt-12 pb-16 max-w-2xl mx-auto">
        <Link href="/" className="text-emerald-600 font-bold text-xl">WeeCove</Link>
        <h1 className="text-3xl font-bold mt-8">Terms of Service</h1>
        <p className="text-zinc-400 text-sm mt-2">Last updated: April 10, 2026</p>

        <div className="mt-8 prose prose-zinc prose-sm max-w-none space-y-6 text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-zinc-900">1. About WeeCove</h2>
            <p>WeeCove is an independent remittance comparison platform operated by Sobie Tech Limited, a company registered in Hong Kong. We provide exchange rate and fee comparisons across money transfer providers. We are not a money transfer service and do not process any transactions.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">2. Nature of Service</h2>
            <p>WeeCove provides information and comparison tools for educational purposes. Exchange rates and fees shown are indicative and may differ from actual rates at the time of transfer. Always verify current rates on the provider&apos;s website before making a transfer.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">3. Independence</h2>
            <p>WeeCove is not owned by, affiliated with, or endorsed by any money transfer provider. Our rankings are based solely on total amount received by the recipient after all fees and exchange rate markup. No provider can pay to influence their ranking.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">4. Affiliate Links</h2>
            <p>WeeCove contains affiliate links. When you click through to a provider and complete a transaction, we may earn a commission. This does not affect the price you pay. It is how we keep WeeCove free.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">5. No Financial Advice</h2>
            <p>Nothing on WeeCove constitutes financial advice. We provide comparison data to help you make informed decisions. You are responsible for your own transfer decisions and should conduct your own research before using any provider.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">6. Accuracy</h2>
            <p>We make reasonable efforts to keep our data accurate and up to date. However, exchange rates fluctuate constantly and provider fees may change without notice. WeeCove is not liable for any losses arising from reliance on the data shown on this site.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">7. Rate Alerts</h2>
            <p>If you subscribe to rate alerts, you agree to receive email notifications about exchange rate changes. You may unsubscribe at any time. We will never share your email with third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">8. Limitation of Liability</h2>
            <p>WeeCove is provided &ldquo;as is.&rdquo; We are not responsible for any transactions you make with third-party providers. We are not liable for any direct, indirect, or consequential losses arising from the use of this site.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">9. Changes</h2>
            <p>We may update these terms at any time. Continued use of WeeCove after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">10. Contact</h2>
            <p>For questions: support@weecove.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}

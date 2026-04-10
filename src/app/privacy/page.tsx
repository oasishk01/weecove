import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — WeeCove",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-full bg-white">
      <div className="px-6 pt-12 pb-16 max-w-2xl mx-auto">
        <Link href="/" className="text-emerald-600 font-bold text-xl">WeeCove</Link>
        <h1 className="text-3xl font-bold mt-8">Privacy Policy</h1>
        <p className="text-zinc-400 text-sm mt-2">Last updated: April 10, 2026</p>

        <div className="mt-8 prose prose-zinc prose-sm max-w-none space-y-6 text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-zinc-900">1. Who We Are</h2>
            <p>WeeCove is an independent remittance comparison platform operated by Sobie Tech Limited, a Hong Kong registered company. We help users compare exchange rates and fees across money transfer providers.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">2. What We Collect</h2>
            <p>We collect minimal data: your email address (only if you subscribe to rate alerts), and technical data such as IP address, device type, and browser information for analytics purposes.</p>
            <p>We do not require registration. We do not collect passwords, bank details, or payment information.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">3. How We Use Your Data</h2>
            <p>We use your data to: send rate alert notifications (if you subscribed), improve our comparison tools and content, and analyse site traffic to understand which corridors and providers are most useful.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">4. Affiliate Links</h2>
            <p>WeeCove contains affiliate links to money transfer providers. When you click a link and use a provider, we may earn a commission at no extra cost to you. This is how WeeCove stays free. Affiliate relationships never affect our rankings, which are based solely on total amount received.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">5. Third-Party Services</h2>
            <p>We use third-party services for analytics and rate data. These services may collect anonymised usage data. We do not sell or share your personal information with any third party for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">6. Data Security</h2>
            <p>We use industry-standard security measures including encrypted connections (HTTPS). WeeCove will never ask for your password, bank details, or payment information via email or any other channel.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">7. Your Rights</h2>
            <p>You may request deletion of your email from our rate alert list at any time by clicking unsubscribe or contacting us at support@weecove.com. We will remove your data within 7 days.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">8. Cookies</h2>
            <p>We use essential cookies for site functionality and language preferences. We do not use tracking cookies for advertising purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">9. Changes</h2>
            <p>We may update this policy from time to time. Changes will be posted on this page with an updated date.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">10. Contact</h2>
            <p>For privacy-related questions: support@weecove.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}

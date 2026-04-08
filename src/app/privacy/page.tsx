import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-full bg-white">
      <div className="px-6 pt-12 pb-16 max-w-2xl mx-auto">
        <Link href="/" className="text-emerald-600 font-bold text-xl">WeeCove</Link>
        <h1 className="text-3xl font-bold mt-8">Privacy Policy</h1>
        <p className="text-zinc-400 text-sm mt-2">Last updated: April 8, 2026</p>

        <div className="mt-8 prose prose-zinc prose-sm max-w-none space-y-6 text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-zinc-900">1. Who We Are</h2>
            <p>WeeCove is operated by Sobie Tech Limited, a Hong Kong registered company. This policy explains how we collect, use, and protect your personal data.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">2. What We Collect</h2>
            <p>We collect: your name, email address, and country (provided during registration); your task completion history and earnings; and technical data such as IP address, device type, and browser information.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">3. How We Use Your Data</h2>
            <p>We use your data to: operate your account and process payments; match you with relevant surveys and offers through our partners; prevent fraud and abuse; and improve our service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">4. Third-Party Partners</h2>
            <p>When you complete surveys or offers, your user ID is shared with our offerwall partners (such as BitLabs, ayeT-Studios, and others) so they can track your task completion and credit your rewards. These partners have their own privacy policies.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">5. Payment Processing</h2>
            <p>When you cash out, your payment details (PayPal email, GCash number, or Wise account) are used solely to process your payment. We do not store full payment credentials beyond what is needed to process your request.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">6. Data Security</h2>
            <p>We use industry-standard security measures to protect your data, including encrypted connections (HTTPS) and secure database storage. However, no system is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">7. Data Retention</h2>
            <p>We retain your account data for as long as your account is active. If you request account deletion, we will remove your personal data within 30 days, except where we are required to retain it by law.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">8. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at support@weecove.com.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">9. Cookies</h2>
            <p>We use essential cookies to keep you logged in. We do not use tracking cookies for advertising purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">10. Changes</h2>
            <p>We may update this policy from time to time. We will notify you of significant changes via email or in-app notice.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">11. Contact</h2>
            <p>For privacy-related questions, contact us at support@weecove.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

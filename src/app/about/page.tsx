import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "About WeeCove — Independent Remittance Comparison",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-full bg-white">
      <div className="px-6 pt-12 pb-16 max-w-2xl mx-auto">
        <Logo />
        <h1 className="text-3xl font-bold mt-8">About WeeCove</h1>
        <p className="text-zinc-500 text-sm mt-2">Independent remittance comparison for Hong Kong</p>

        <div className="mt-8 space-y-8 text-zinc-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-zinc-900">What We Do</h2>
            <p className="mt-2">
              WeeCove compares exchange rates and fees across 12 money transfer providers for 12 currency corridors.
              We show you exactly how much your recipient receives after all fees and markup, so you can pick the best option.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">Our Independence</h2>
            <p className="mt-2">
              WeeCove is not owned by, affiliated with, or endorsed by any money transfer provider.
              Some comparison sites (such as Exiap) are owned by Wise. We are not.
              Our rankings are based on one criterion only: total amount received by the recipient.
              No provider can pay to rank higher.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">How We Make Money</h2>
            <p className="mt-2">
              When you click a provider link on WeeCove and make a transfer, we may earn an affiliate commission.
              This costs you nothing extra. It is the only way we generate revenue, and it is how WeeCove stays free.
              Affiliate relationships do not influence rankings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">How We Rank Providers</h2>
            <p className="mt-2">
              For any given amount and corridor, we calculate the total amount the recipient receives after all fees
              and exchange rate markup. The provider that delivers the most, ranks first. We use live mid-market
              exchange rates updated daily from open-source financial data APIs.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">Important Disclaimer</h2>
            <p className="mt-2">
              Exchange rates shown on WeeCove are indicative and may differ from the actual rate at the time of your transfer.
              Always verify current rates on the provider&apos;s official website before making a transfer.
              WeeCove does not process any transactions. We are a comparison and information service only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">Company Information</h2>
            <div className="mt-2 bg-zinc-50 rounded-xl p-4 border border-zinc-200 text-sm">
              <p><strong>Operated by:</strong> Sobie Tech Limited</p>
              <p><strong>Location:</strong> Hong Kong</p>
              <p><strong>Contact:</strong> support@weecove.com</p>
              <p><strong>Website:</strong> weecove.com</p>
              <p className="mt-2 text-zinc-500 text-xs">
                WeeCove is not a licensed money service operator. We do not handle, process, or transmit any funds.
                We provide comparison information only.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900">Security</h2>
            <p className="mt-2">
              WeeCove will never ask for your password, bank details, or payment information.
              We use HTTPS encryption, Content Security Policy, and follow security best practices.
              To report a security concern: support@weecove.com or see our
              {" "}<Link href="/.well-known/security.txt" className="text-emerald-600 underline">security.txt</Link>.
            </p>
          </section>

          <section className="flex gap-4 pt-4 border-t border-zinc-200">
            <Link href="/terms" className="text-emerald-600 text-sm underline">Terms of Service</Link>
            <Link href="/privacy" className="text-emerald-600 text-sm underline">Privacy Policy</Link>
            <Link href="/" className="text-emerald-600 text-sm underline">Compare Rates</Link>
          </section>
        </div>
      </div>
    </div>
  );
}

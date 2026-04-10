import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = "https://weecove.com";

export const metadata: Metadata = {
  title: "WeeCove — Hong Kong Remittance Comparison",
  description:
    "Independent remittance comparison tool. Compare Wise, Western Union, Remitly fees and rates. Find the cheapest way to send money from Hong Kong.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "s7HY1_X3uIAsp5RrTs4PlT0NJ7wM-Mb6sj2JTM2m0dQ",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "WeeCove — Hong Kong Remittance Comparison",
    description: "Compare 13+ money transfer providers. Find the cheapest way to send money from Hong Kong. Independent, free, updated daily.",
    url: siteUrl,
    siteName: "WeeCove",
    locale: "en_HK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "WeeCove — Hong Kong Remittance Comparison",
    description: "Compare 13+ money transfer providers. Find the cheapest way to send money from Hong Kong.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "WeeCove",
              url: "https://weecove.com",
              description: "Independent remittance comparison tool for Hong Kong",
              publisher: {
                "@type": "Organization",
                name: "Sobie Tech Limited",
                url: "https://weecove.com",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-900 antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}

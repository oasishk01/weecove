import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeeCove — 香港匯款比較 | HK Remittance Comparison",
  description:
    "獨立匯款比較工具。比較 Wise、Western Union、Remitly 嘅手續費同匯率，搵到最平嘅匯款方法。Independent remittance comparison for Hong Kong.",
  verification: {
    google: "s7HY1_X3uIAsp5RrTs4PlT0NJ7wM-Mb6sj2JTM2m0dQ",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}

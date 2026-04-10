import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeeCove — Earn Money, Send More Home",
  description:
    "Earn extra cash from your phone. Complete tasks, get paid in HK$ via PayPal. Free forever.",
  verification: {
    google: "s7HY1_X3uIAsp5RrTs4PlT0NJ7wM-Mb6sj2JTM2m0dQ",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WeeCove",
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

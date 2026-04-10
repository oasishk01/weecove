import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.weecove.com" }],
        destination: "https://weecove.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { hostname: "www.google.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.google.com; font-src 'self'; connect-src 'self' https://cdn.jsdelivr.net https://latest.currency-api.pages.dev; frame-ancestors 'none'" },
        ],
      },
    ];
  },
};

export default nextConfig;

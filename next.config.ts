import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Without this, opening the dev site through 127.0.0.1 returns 403s on Next's
  // own assets and the page never hydrates, with no message anywhere.
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      { source: "/", destination: "/fr" },
      { source: "/projets", destination: "/fr/projects" },
      { source: "/projets/:slug", destination: "/fr/projects/:slug" },
      { source: "/a-propos", destination: "/fr/about" },
      { source: "/contact", destination: "/fr/contact" },
      { source: "/mentions-legales", destination: "/fr/legal-notice" },
      {
        source: "/politique-de-confidentialite",
        destination: "/fr/privacy-policy",
      },
    ];
  },

  async redirects() {
    return [
      { source: "/fr", destination: "/", permanent: true },
      { source: "/fr/projects", destination: "/projets", permanent: true },
      {
        source: "/fr/projects/:slug",
        destination: "/projets/:slug",
        permanent: true,
      },
      { source: "/fr/about", destination: "/a-propos", permanent: true },
      { source: "/fr/contact", destination: "/contact", permanent: true },
      {
        source: "/fr/legal-notice",
        destination: "/mentions-legales",
        permanent: true,
      },
      {
        source: "/fr/privacy-policy",
        destination: "/politique-de-confidentialite",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content Security Policy without nonces, so pages stay static (a nonce would force every page to render per
// request). Inline scripts are allowed because Next.js and the theme script use them; everything else is
// limited to this site, plus the youtube-nocookie player in iframes.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.youtube-nocookie.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    // YouTube video thumbnails on the Entertainment page.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The CSP is sent on the production domain only, so Vercel preview deployments keep their toolbar.
      {
        source: "/:path*",
        has: [{ type: "host", value: "darislamtech.com" }],
        headers: [{ key: "Content-Security-Policy", value: contentSecurityPolicy }],
      },
    ];
  },
  async redirects() {
    return [
      // One public address: the Vercel production URL sends visitors and search engines to the domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "darislamtech.vercel.app" }],
        destination: "https://darislamtech.com/:path*",
        permanent: true,
      },
    ];
  },
  experimental: {
    // Serves app/global-not-found.tsx for URLs outside the [lang] routes.
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

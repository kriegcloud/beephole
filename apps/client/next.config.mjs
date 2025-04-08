import { createTheme } from "@mui/material";
import { withPigment } from "@pigment-css/nextjs-plugin";

const ENABLE_CSP =
  process.env.VERCEL_ENV === "preview" ||
  process.env.VERCEL_ENV === "production";
const CSP_DIRECTIVES = {
  "default-src": ["'self'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "script-src": [
    "'self'",
    "https://www.google.com",
    "https://maps.googleapis.com",
    "https://www.gstatic.com",
    "https://api.simplesvg.com",
    "https://api.iconify.design",
    "https://api.unisvg.com",
    "blob:",
  ],
  "worker-src": ["'self'", "blob:"],
  "style-src": ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
  "font-src": [
    "'self'",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
  ],
  "style-src-elem": [
    "'self'",
    "https://fonts.googleapis.com",
    "'unsafe-inline'",
  ],
  "script-src-elem": [
    "'self'",
    "blob:",
    "https://www.google.com",
    "https://www.gstatic.com",
    "https://cdn.jsdelivr.net",
    "https://vercel.live",
    "'unsafe-inline'",
  ],
  "connect-src": [
    "'self'",
    "https://api.unisvg.com",
    "https://api.iconify.design",
    process.env.NEXT_PUBLIC_STATIC_URL,
    "https://assets.rocketinventory.com",
    "https://api.simplesvg.com",
    "https://cdn.jsdelivr.net",
    "https://sdk-api.scandit.com",
    "https://vercel.live/",
    "https://vercel.com",
    "https://static.rocketinventory.com",
    "https://s3.us-east-1.amazonaws.com",
  ],
  "media-src": ["'self'", "data:"],
  "frame-ancestors": ["'self'", "https://vercel.live", "https://vercel.com"],
  "img-src": [
    "'self'",
    "https://www.google-analytics.com",
    process.env.NEXT_PUBLIC_STATIC_URL,
    "https://assets.rocketinventory.com",
    "data:",
  ],
  "frame-src": [
    "'self'",
    "https://google-analytics.com",
    "https://vercel.live",
    "https://vercel.com",
  ],
};

const genCSP = () => {
  let csp = "";
  for (const key in CSP_DIRECTIVES) {
    // @ts-ignore
    csp += `${key} ${CSP_DIRECTIVES[key].join(" ")}; `;
  }
  return csp;
};

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "same-origin",
  },
  {
    key: "Content-Security-Policy",
    value: ENABLE_CSP
      ? genCSP()
          .replace(/\s{2,}/g, " ")
          .trim()
      : "",
  },
  // this may be needed to work locally
  // {
  //   key: "Access-Control-Allow-Origin",
  //   value: "http://localhost:3000",
  // }
];
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@beep/domain", "@beep/kernel"],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_STATIC_URL}`.replace(
          "https://",
          "",
        ),
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.rocketinventory.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*?)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withPigment(nextConfig, {
  theme: createTheme({
    cssVariables: {
      colorSchemeSelector: "class",
    },
    colorSchemes: { light: true, dark: true },
    typography: {
      fontFamily: "var(--font-roboto)",
    },
  }),
  transformLibraries: ["@mui/material"],
});

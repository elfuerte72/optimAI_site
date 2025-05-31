const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 дней
  },
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
    ],
  },
  experimental: {
    // optimizeCss: true,
    // optimizePackageImports: ['framer-motion', '@headlessui/react'], // Лучше временно отключить
  },
  async headers() {
    const TELEGRAM_API_DOMAIN = 'api.telegram.org';
    // Add other external domains your app connects to for content, scripts, etc.
    // Example: Vercel Blob Storage, analytics, etc.
    const VERCEL_BLOB_DOMAIN = '*.public.blob.vercel-storage.com'; // If using Vercel Blob

    // A basic CSP policy. This should be carefully reviewed and extended based on the application's needs.
    // 'unsafe-eval' and 'unsafe-inline' should ideally be removed by refactoring or using nonces/hashes.
    const cspDirectives = {
      'default-src': "'self'",
      'script-src': "'self' 'unsafe-eval' 'unsafe-inline'", // Next.js in dev often needs unsafe-eval/inline
      'style-src': "'self' 'unsafe-inline'", // unsafe-inline for legacy styles, next/font inline styles
      'img-src': "'self' data: ${VERCEL_BLOB_DOMAIN}", // Allow self, data URIs, and Vercel blob storage for images
      'font-src': "'self'", // next/font might inline some font data or load from self
      'connect-src': `'self' https://${TELEGRAM_API_DOMAIN} ${VERCEL_BLOB_DOMAIN}`, // For Telegram API, Vercel Blob, and self
      'frame-src': "'self'",
      'object-src': "'none'",
      'base-uri': "'self'",
      'form-action': "'self'",
      'frame-ancestors': "'none'",
      // upgrade-insecure-requests: "", // Not needed if HSTS is well configured
    };

    const cspValue = Object.entries(cspDirectives)
      .map(([key, value]) => `${key} ${value}`)
      .join('; ');

    return [
      {
        source: '/:path*', // Apply to all paths
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspValue,
          },
          {
            key: 'Strict-Transport-Security',
            // Start with a shorter max-age for testing, then increase.
            // e.g., max-age=600; includeSubDomains (10 minutes)
            // Production: max-age=63072000; includeSubDomains; preload
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions-Policy can be added here for finer control over browser features
          // {
          //   key: 'Permissions-Policy',
          //   value: 'camera=(), microphone=(), geolocation=()' // Example: disable some features
          // }
        ],
      },
    ];
  },
  // webpack: (config, { dev, isServer }) => {
  //   // Turbopack не поддерживает кастомный webpack-конфиг
  //   return config;
  // },
};

module.exports = withPWA(withBundleAnalyzer(nextConfig));

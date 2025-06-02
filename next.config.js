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
    const GOOGLE_FONTS_DOMAIN = 'fonts.googleapis.com fonts.gstatic.com';
    const VERCEL_BLOB_DOMAIN = '*.public.blob.vercel-storage.com';

    // CSP политика с учётом development/production
    const isDev = process.env.NODE_ENV === 'development';
    const cspDirectives = {
      'default-src': "'self'",
      'script-src': isDev ? "'self' 'unsafe-eval' 'unsafe-inline'" : "'self' 'unsafe-inline'", // unsafe-inline нужен для Next.js
      'style-src': `'self' 'unsafe-inline' ${GOOGLE_FONTS_DOMAIN}`, // unsafe-inline для CSS-in-JS и Google Fonts
      'img-src': `'self' data: ${VERCEL_BLOB_DOMAIN}`, // self, data URIs и Vercel blob storage
      'font-src': `'self' ${GOOGLE_FONTS_DOMAIN}`, // self и Google Fonts
      'connect-src': `'self' https://${TELEGRAM_API_DOMAIN} ${VERCEL_BLOB_DOMAIN}`,
      'frame-src': "'self'",
      'object-src': "'none'",
      'base-uri': "'self'",
      'form-action': "'self'",
      'frame-ancestors': "'none'",
      'upgrade-insecure-requests': '',
      'block-all-mixed-content': '',
    };

    const cspValue = Object.entries(cspDirectives)
      .map(([key, value]) => value ? `${key} ${value}` : key)
      .join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspValue,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload', // 365 дней
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
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
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

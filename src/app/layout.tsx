import type { Metadata, Viewport } from "next";
import "./globals.css";
import dynamic from 'next/dynamic';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono'; // Optional: if mono is also used from Geist

// Динамический импорт Footer для оптимизации загрузки
const Footer = dynamic(() => import('@/components/layout/Footer'), {
  ssr: true
});

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Fallback for local dev

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: "OptimaAI — Сила в простоте",
    template: `%s | OptimaAI`,
  },
  description: "OptimaAI — интеграция искусственного интеллекта в бизнес. Обучение, автоматизация, создание AI-агентов.",
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png', // For Apple devices
  },
  openGraph: {
    title: 'OptimaAI — Сила в простоте',
    description: 'Интеграция ИИ для вашего бизнеса: обучение, автоматизация и разработка AI-агентов.',
    url: new URL(siteBaseUrl),
    siteName: 'OptimaAI',
    images: [
      {
        url: '/og-default.png', // Replace with your actual default OG image path
        width: 1200,
        height: 630,
        alt: 'OptimaAI - Интеграция Искусственного Интеллекта',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OptimaAI — Сила в простоте',
    description: 'Интеграция ИИ для вашего бизнеса: обучение, автоматизация и разработка AI-агентов.',
    // images: ['/twitter-og.png'], // Replace with your actual Twitter OG image path
    // creator: '@yourTwitterHandle', // Optional: Twitter handle of content creator
    // site: '@yourSiteTwitterHandle', // Optional: Twitter handle of the website
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: { // Optional: Add verification tags if needed
  //   google: 'your-google-site-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
  alternates: {
    canonical: '/',
    // languages: { // If you have multiple languages
    //   'en-US': '/en-US',
    // },
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
      <body
        className="antialiased bg-black min-h-screen flex flex-col font-sans"
      >
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

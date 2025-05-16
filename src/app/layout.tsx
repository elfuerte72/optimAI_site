import type { Metadata } from "next";
import "./globals.css";
import dynamic from 'next/dynamic';

// Динамический импорт Footer для оптимизации загрузки
const Footer = dynamic(() => import('@/components/layout/Footer'), {
  ssr: true
});

export const metadata: Metadata = {
  title: "OptimaAI — Сила в простоте",
  description: "OptimaAI — интеграция искусственного интеллекта в бизнес",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
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

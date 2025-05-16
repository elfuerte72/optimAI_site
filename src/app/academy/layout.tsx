import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Академия OptimaAI - Обучение ИИ',
  description: 'Курсы и программы обучения по работе с искусственным интеллектом от OptimaAI. Промптинг, метапромптинг и эффективное применение ИИ в бизнесе.',
  openGraph: {
    title: 'Академия OptimaAI - Обучение ИИ',
    description: 'Развивайте навыки работы с ИИ вместе с OptimaAI.',
    // images: [ // Optionally add a specific OG image for this page
    //   {
    //     url: '/og-academy.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Академия OptimaAI',
    //   },
    // ],
  },
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 
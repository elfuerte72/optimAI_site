'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';

// Lazy load ReviewsAndNewsSection component
const ReviewsAndNewsSection = dynamic(() => import('@/components/reviews/ReviewsAndNewsSection'), {
  loading: () => <div className="w-full h-40 bg-gray-900 animate-pulse rounded-lg mt-12"></div>,
  ssr: false,
});

export default function NewsPage() {
  useEffect(() => {
    document.title = "OptimaAI — Отзывы и новости";
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <section className="max-w-5xl mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em' }}>
            Отзывы и новости
          </h1>
          
          <ReviewsAndNewsSection />
        </section>
      </main>
    </div>
  );
}
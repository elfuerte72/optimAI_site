'use client';

import Image from "next/image";
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import dynamic from 'next/dynamic';
import { setupLazyLoading } from '@/utils/lazyLoad';
import Link from 'next/link';

// Lazy load ChatBot component
const ChatBot = dynamic(() => import('@/components/ChatBot'), {
  loading: () => <div className="w-full h-40 bg-gray-900 animate-pulse rounded-lg"></div>,
  ssr: false,
});

// Lazy load ReviewsAndNewsSection component
const ReviewsAndNewsSection = dynamic(() => import('@/components/reviews/ReviewsAndNewsSection'), {
  loading: () => <div className="w-full h-40 bg-gray-900 animate-pulse rounded-lg mt-12"></div>,
  ssr: false,
});

export default function Home() {
  useEffect(() => {
    document.title = "OptimaAI — Сила в простоте";
    
    // Set up lazy loading for below-the-fold elements
    setupLazyLoading();
  }, []);

  return (
    <div className="bg-black">
      <Navbar />

      <main className="flex flex-col items-center justify-center px-4 py-12">
        {/* Секция с логотипом - высокий приоритет */}
        <section className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-8">
            <Image 
              src="/images/logo-updated.png" 
              alt="OptimaAI Logo" 
              width={300} 
              height={100} 
              className="w-auto h-auto select-none"
              draggable="false"
              priority
              style={{ pointerEvents: 'none' }}
            />
          </div>
        </section>
        
        {/* Секция с заголовком */}
        <section className="max-w-3xl mx-auto text-center mb-12">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em' }}
          >
            Ваш проводник в мир искусственного интеллекта
          </h1>

          <p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, lineHeight: 1.6 }}
          >
          </p>
        </section>

        {/* Секция с чат-ботом - низкий приоритет, загружаем лениво */}
        <section className="max-w-4xl mx-auto w-full">
          <ChatBot />
        </section>
        
        {/* Секция с отзывами и новостями - низкий приоритет, загружаем лениво */}
        <section className="max-w-5xl mx-auto w-full">
          <ReviewsAndNewsSection />
          <div className="text-center mt-6">
            <Link 
              href="/news" 
              className="inline-block px-6 py-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Подробнее →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
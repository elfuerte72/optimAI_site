'use client';

import Image from "next/image";
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import dynamic from 'next/dynamic';
// import { setupLazyLoading } from '@/utils/lazyLoad'; // Removed as it seems unused
import Link from 'next/link';

// Lazy load ChatBot component
const ChatBot = dynamic(() => import('@/components/ChatBot'), {
  loading: () => <div className="w-full h-40 bg-gray-900 animate-pulse rounded-lg"></div>,
  ssr: false,
});

// Lazy load ReviewsAndNewsSection component - TODO: Decide if this component should be used on the homepage or remove this import.
// const ReviewsAndNewsSection = dynamic(() => import('@/components/reviews/ReviewsAndNewsSection'), {
//   loading: () => <div className="w-full h-40 bg-gray-900 animate-pulse rounded-lg mt-12"></div>,
//   ssr: false,
// });

export default function Home() {
  useEffect(() => {
    // document.title = "OptimaAI — Сила в простоте"; // Redundant: title is set in root layout metadata
    
    // Set up lazy loading for below-the-fold elements
    // setupLazyLoading(); // Removed as its features (data-src, data-bg, animate-on-scroll) are not used
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
              className="w-auto h-auto select-none pointer-events-none"
              draggable="false"
              priority
            />
          </div>
        </section>
        
        {/* Секция с заголовком */}
        <section className="max-w-3xl mx-auto text-center mb-12">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-sans tracking-[-0.02em]"
          >
            Ваш проводник в мир искусственного интеллекта
          </h1>

          {/* Empty paragraph removed 
          <p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, lineHeight: 1.6 }}
          >
          </p> */}
        </section>

        {/* Секция с чат-ботом - низкий приоритет, загружаем лениво */}
        <section className="max-w-4xl mx-auto w-full">
          <ChatBot />
        </section>
      </main>
    </div>
  );
}
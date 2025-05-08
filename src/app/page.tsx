'use client';

import Image from "next/image";
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import dynamic from 'next/dynamic';
import { setupLazyLoading } from '@/utils/lazyLoad';

// Lazy load ChatBot component
const ChatBot = dynamic(() => import('@/components/ChatBot'), {
  loading: () => <div className="w-full h-40 bg-gray-900 animate-pulse rounded-lg"></div>,
  ssr: false,
});

export default function Home() {
  useEffect(() => {
    document.title = "OptimaAI — Сила в простоте";
    
    // Set up lazy loading for below-the-fold elements
    setupLazyLoading();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Секция с логотипом - высокий приоритет */}
        <section className="max-w-3xl mx-auto text-center mb-12 mt-16">
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
            Ваш партнёр в мире искусственного интеллекта
          </h1>

          <p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, lineHeight: 1.6 }}
          >
            OptimaAI помогает внедрить ИИ в бизнес, автоматизировать процессы и обучить команду пользоваться нейросетями эффективно.
          </p>
        </section>

        {/* Секция с чат-ботом - низкий приоритет, загружаем лениво */}
        <section className="max-w-4xl mx-auto w-full">
          <ChatBot />
        </section>
      </main>
    </div>
  );
}
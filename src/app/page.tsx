'use client';

import Image from "next/image";
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  useEffect(() => {
    // Устанавливаем заголовок страницы при загрузке
    document.title = "OptimaAI — Сила в простоте";
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Секция с логотипом */}
        <section className="max-w-3xl mx-auto text-center mb-12 mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
            whileHover={{ scale: 1.05 }}
            className="flex justify-center mb-8"
          >
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
          </motion.div>
        </section>
        
        {/* Секция с анимированным заголовком */}
        <section className="max-w-3xl mx-auto text-center mb-12" data-component-name="Home">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-sans)', letterSpacing: '-0.02em' }}
          >
            Ваш партнёр в мире искусственного интеллекта
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, lineHeight: 1.6 }}
          >
            OptimaAI помогает внедрить ИИ в бизнес, автоматизировать процессы и обучить команду пользоваться нейросетями эффективно.
          </motion.p>
        </section>

        {/* Секция с чат-ботом */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-4xl mx-auto w-full"
        >
          <ChatBot />
        </motion.section>
      </main>
    </div>
  );
}
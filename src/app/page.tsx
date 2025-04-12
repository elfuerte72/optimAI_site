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

      <main className="pt-32 pb-20 container mx-auto px-4">
        {/* Секция с логотипом */}
        <section className="max-w-3xl mx-auto text-center mb-8">
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
              width={350} 
              height={120} 
              className="w-auto h-auto select-none"
              draggable="false"
              priority
              style={{ pointerEvents: 'none' }}
            />
          </motion.div>
        </section>
        
        {/* Секция с анимированным заголовком */}
        <section className="max-w-3xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Сила — в простоте.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="text-xl text-gray-300"
          >
            Искусственный интеллект, который не мешает, а помогает.
          </motion.p>
        </section>

        {/* Секция с чат-ботом */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <ChatBot />
        </motion.section>
      </main>
    </div>
  );
}

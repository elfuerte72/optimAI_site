'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import ServicesSection from '@/components/services-section';
import ChatSection from '@/components/ChatSection'; // Added import for ChatSection
import LogoAnimation from '@/components/logo-animation';
import FeatureCard from '@/components/feature-card';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';

// Простые варианты анимации для блоков
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Варианты для анимации "печатающегося" текста
const heroLine1Words = "Ваш проводник в мир".split(" ");
const heroLine2Words = "искусственного интеллекта".split(" ");

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

// Удалена анимация Light Streaks в пользу нового компонента

export default function HomePage() {

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 overflow-hidden bg-black"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="relative z-10 flex flex-col items-center">
          <LogoAnimation />
          
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-white font-press-start-hero text-center"
          >
            <div>
              {heroLine1Words.map((word, i) => (
                <motion.span
                  key={`l1-${word}-${i}`}
                  className="inline-block mr-3 md:mr-4"
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div>
              {heroLine2Words.map((word, i) => (
                <motion.span
                  key={`l2-${word}-${i}`}
                  className="inline-block mr-3 md:mr-4"
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  custom={heroLine1Words.length + i}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.h1>
        </div>
      </motion.section>

      {/* Chat Section */}
      <ChatSection />

      {/* Services Section and 'Узнать больше' link removed as per request */}

      {/* 'Готовые кейсы' section removed as per request */}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black text-center">
        <Link
          href="https://t.me/optimaai_tg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white font-medium transition-colors duration-300 text-xl px-6 py-3"
        >
          Связаться с нами
        </Link>
      </section>

      {/* Footer будет добавлен автоматически из RootLayout */}
    </div>
  );
} 
'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import ServicesSection from '@/components/services-section';
import ChatSection from '@/components/ChatSection'; // Import ChatSection
import NewsSection from '@/components/news/NewsSection'; // Import NewsSection
import LogoAnimation from '@/components/logo-animation';
import FeatureCard from '@/components/feature-card';
import { motion, Variants } from 'framer-motion';
import { pacificoFont } from '@/lib/fonts';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
import TestimonialSliderWrapper from '@/components/TestimonialSliderWrapper';
import { useState, useEffect } from 'react';
import QuickQuestionButtons from '@/components/QuickQuestionButtons';
import '@/components/StyledButton.css'; // Import the CSS for styled buttons

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
        className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 overflow-hidden bg-black"
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
      
      {/* Кнопки быстрых вопросов */}
      <QuickQuestionButtons />

      {/* News Section */}
      <NewsSection />

      {/* Services Section and 'Узнать больше' link removed as per request */}

      {/* 'Готовые кейсы' section removed as per request */}

      {/* Testimonials Section */}
      <motion.section
        className="py-12 md:py-16 bg-black text-center px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto">
          <h2 
            ref={(el) => {
              if (!el) return;
              
              // Создаем анимацию с триггером при скроллинге
              setTimeout(() => {
                // Создаем анимацию с триггером при скроллинге
                gsap.fromTo(el, 
                  { opacity: 0, y: 30 }, // начальное состояние
                  { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                      trigger: el,
                      start: "top 80%",
                      toggleActions: "play none none reverse",
                      markers: false
                    }
                  }
                );
              }, 100);
            }}
            className={`text-2xl sm:text-3xl font-bold tracking-tight leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 ${pacificoFont.className} mb-4 md:mb-6 py-2`}
          >
            Отзывы наших клиентов
          </h2>
          <TestimonialSliderWrapper />
        </div>
      </motion.section>

      {/* CTA Section - Moved to bottom of page before footer */}
      <section className="py-12 md:py-16 bg-black text-center">
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
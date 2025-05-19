'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import ServicesSection from '@/components/services-section';
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
const heroText = "Ваш проводник в мир исскуственного интелекта";
const heroTextWords = heroText.split(" ");

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
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white"
          >
            {heroTextWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block mr-2 md:mr-3"
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </motion.section>

      {/* Services Section - заменено на импортированный компонент */}
      <ServicesSection />

      {/* Воссозданная ссылка "Узнать больше о наших услугах" со стилизацией */}
      <div className="py-12 bg-black text-center">
        <Link
          href="/services"
          className="text-white hover:opacity-70 font-medium group transition-opacity duration-300 text-lg inline-flex items-center"
        >
          Узнать больше о наших услугах
          <span className="inline-block transition-transform group-hover:translate-x-1 ml-2 text-white">&rarr;</span>
        </Link>
      </div>

      {/* Why OptimaAI Section - остается без изменений фона, т.к. уже bg-black */}
      <motion.section 
        className="py-16 md:py-24 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Почему OptimaAI?</h2>
            <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Мы не просто следуем трендам – мы создаем будущее, где искусственный интеллект работает на вас.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              index={0}
              title="Экспертиза" 
              description="Глубокое понимание технологий ИИ и опыт в различных индустриях."
              icon={<svg className="w-16 h-16 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
              category="Core Value"
            />
            <FeatureCard 
              index={1}
              title="Индивидуальный подход" 
              description="Решения, разработанные специально под ваши бизнес-цели и задачи."
              icon={<svg className="w-16 h-16 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
              category="Core Value"
            />
            <FeatureCard 
              index={2}
              title="Прозрачность и Поддержка" 
              description="Открытое сотрудничество и полное сопровождение на всех этапах."
              icon={<svg className="w-16 h-16 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
              category="Core Value"
            />
          </div>
        </div>
      </motion.section>

      {/* Готовые кейсы */}
      <motion.section
        className="py-12 md:py-24 bg-gradient-to-b from-black to-neutral-900" // Updated background for new theme
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Adjusted viewport amount
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-12 md:mb-16">Готовые кейсы</h2> {/* Added margin bottom to h2 */}
            <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"> {/* Updated text color */}
              Реальные примеры внедрения искусственного интеллекта, которые приносят измеримые результаты.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              index={0}
              title="Чат-бот для поддержки клиентов"
              description="Интеллектуальный бот для Telegram, способный отвечать на 95% запросов клиентов без участия оператора."
              category="Ритейл"
              icon={<svg className="w-16 h-16 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>}
            />
            <FeatureCard
              index={1}
              title="Аналитический агент"
              description="AI-агент для анализа бизнес-данных и автоматической генерации еженедельных отчетов с инсайтами."
              category="Финансы"
              icon={<svg className="w-16 h-16 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2.172a2 2 0 01.586-1.414l5.414-5.414a2 2 0 000-2.828L12.828 3a2 2 0 00-2.828 0L4.586 8.414A2 2 0 004 9.828V17a2 2 0 002 2h3zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>}
            />
            <FeatureCard
              index={2}
              title="Система компьютерного зрения"
              description="Решение для автоматического распознавания и классификации дефектов продукции на производственной линии."
              category="Производство"
              icon={<svg className="w-16 h-16 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>}
            />
          </div>
        </div>
      </motion.section>

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
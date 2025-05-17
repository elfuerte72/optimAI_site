'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import ServicesSection from '@/components/services-section';
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

// Interface for Light Streaks
interface LightStreak {
  id: string;
  length: number; // Length of the streak
  angle: number;  // Angle for radial positioning
  animationDelay: number; // Delay for staggered animation
  animationDuration: number; // Duration of the streak's burst
}

// Variants for Light Streaks
const streakVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scaleX: 0, 
    transition: { duration: 0.1 } // Quick fade/shrink out
  },
  hover: (streak: LightStreak) => ({
    opacity: [0, 0.9, 0], // Fade in, visible, fade out
    scaleX: 1,
    transition: {
      delay: streak.animationDelay,
      duration: streak.animationDuration,
      ease: "easeOut", // Streak shoots out quickly
      times: [0, 0.7, 1] // Controls timing of opacity keyframes (70% of duration to be visible)
    },
  }),
};

export default function HomePage() {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [lightStreaks, setLightStreaks] = useState<LightStreak[]>([]);

  useEffect(() => {
    const numStreaks = 40; // Number of light streaks
    const generatedStreaks: LightStreak[] = [];
    for (let i = 0; i < numStreaks; i++) {
      generatedStreaks.push({
        id: `streak-${i}`,
        length: 30 + Math.random() * 70, // Streak length: 30px to 100px
        angle: Math.random() * 360, // Random angle from 0 to 360 degrees
        animationDelay: Math.random() * 0.4, // Staggered appearance up to 0.4s
        animationDuration: 0.3 + Math.random() * 0.4, // Burst duration: 0.3s to 0.7s
      });
    }
    setLightStreaks(generatedStreaks);
  }, []); // Empty dependency array ensures this runs once on client after mount

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
          <motion.div
            className="mb-8 relative group isolate" 
            onHoverStart={() => setIsLogoHovered(true)}
            onHoverEnd={() => setIsLogoHovered(false)}
            style={{ cursor: 'default' }}
          >
            <Image
              src="/images/logo-updated.png"
              alt="OptimaAI Logo"
              width={288}
              height={96}
              priority
              className="pointer-events-none relative z-10"
            />
            {/* Container for streaks, centered on the logo */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ width: '100%', height: '100%' }}
            >
              {lightStreaks.map((streak) => (
                <motion.div
                  key={streak.id}
                  className="absolute bg-white opacity-70 blur-[0.5px]"
                  style={{
                    width: streak.length, // Initial width controlled by variant's scaleX
                    height: '1.5px', // Thickness of the streak
                    transformOrigin: 'left center', // Scale from the left (center of the logo)
                    rotate: `${streak.angle}deg`, // Apply rotation
                    // Position absolutely, rotation handles radial distribution from center
                  }}
                  variants={streakVariants}
                  initial="hidden"
                  animate={isLogoHovered ? "hover" : "hidden"}
                  custom={streak}
                />
              ))}
            </div>
          </motion.div>
          
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
            <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Экспертиза</h3>
              <p className="text-gray-400 text-sm">Глубокое понимание технологий ИИ и опыт в различных индустриях.</p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Индивидуальный подход</h3>
              <p className="text-gray-400 text-sm">Решения, разработанные специально под ваши бизнес-цели и задачи.</p>
            </div>
            <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Прозрачность и Поддержка</h3>
              <p className="text-gray-400 text-sm">Открытое сотрудничество и полное сопровождение на всех этапах.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Новая CTA Section - только кнопка "Связаться с нами" со стилизацией */}
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
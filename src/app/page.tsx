'use client';

import Link from 'next/link';
import { Navbar, LogoAnimation } from '@shared/ui';
import { ChatSection } from '@features/chat'; // Import ChatSection
import { NewsSection } from '@features/news'; // Import NewsSection
import { motion, Variants } from 'framer-motion';
import { pacificoFont } from '@shared/lib';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
import { TestimonialSliderWrapper } from '@features/reviews';
import { QuickQuestionButtons } from '@shared/ui';
import '@shared/ui/StyledButton.css'; // Import the CSS for styled buttons

// Простые варианты анимации для блоков
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Варианты для анимации "печатающегося" текста
const heroLine1Words = 'Ваш проводник в мир'.split(' ');
const heroLine2Words = 'искусственного интеллекта'.split(' ');

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
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative flex flex-col items-center justify-center overflow-hidden bg-black px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8 lg:py-24"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="relative z-10 flex flex-col items-center">
          <LogoAnimation />

          <motion.h1 className="font-press-start-hero text-center text-2xl font-normal tracking-tight text-white sm:text-3xl md:text-4xl">
            <div>
              {heroLine1Words.map((word, i) => (
                <motion.span
                  key={`l1-${word}-${i}`}
                  className="mr-3 inline-block md:mr-4"
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
                  className="mr-3 inline-block md:mr-4"
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
        className="bg-black px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="mx-auto max-w-6xl">
          <h2
            ref={(el) => {
              if (!el) return;

              // Создаем анимацию с триггером при скроллинге
              setTimeout(() => {
                // Создаем анимацию с триггером при скроллинге
                gsap.fromTo(
                  el,
                  { opacity: 0, y: 30 }, // начальное состояние
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                      trigger: el,
                      start: 'top 80%',
                      toggleActions: 'play none none reverse',
                      markers: false,
                    },
                  }
                );
              }, 100);
            }}
            className={`bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-2xl leading-relaxed font-bold tracking-tight text-transparent sm:text-3xl ${pacificoFont.className} mb-4 py-2 md:mb-6`}
          >
            Отзывы наших клиентов
          </h2>
          <TestimonialSliderWrapper />
        </div>
      </motion.section>

      {/* CTA Section - Moved to bottom of page before footer */}
      <section className="bg-black py-12 text-center md:py-16">
        <Link
          href="https://t.me/optimaai_tg"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-xl font-medium text-gray-400 transition-colors duration-300 hover:text-white"
        >
          Связаться с нами
        </Link>
      </section>

      {/* Footer будет добавлен автоматически из RootLayout */}
    </div>
  );
}

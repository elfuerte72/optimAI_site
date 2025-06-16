'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { pacificoFont } from '@shared/lib';

// Динамические импорты для клиентских компонентов
const Navbar = dynamic(() => import('@shared/ui').then(mod => ({ default: mod.Navbar })), {
  ssr: false,
  loading: () => <div className="h-16" />,
});

const LogoAnimation = dynamic(() => import('@shared/ui/LogoAnimation'), {
  ssr: false,
  loading: () => <div style={{ height: 80 }} />,
});

const ChatSection = dynamic(() => import('@features/chat').then(mod => ({ default: mod.ChatSection })), {
  ssr: false,
  loading: () => <div className="h-32" />,
});

const NewsSection = dynamic(() => import('@features/news').then(mod => ({ default: mod.NewsSection })), {
  ssr: false,
  loading: () => <div className="h-64" />,
});

const TestimonialSliderWrapper = dynamic(() => import('@features/reviews').then(mod => ({ default: mod.TestimonialSliderWrapper })), {
  ssr: false,
  loading: () => <div className="h-96" />,
});

const QuickQuestionButtons = dynamic(() => import('@shared/ui').then(mod => ({ default: mod.QuickQuestionButtons })), {
  ssr: false,
  loading: () => <div className="h-16" />,
});

const ChatWidget = dynamic(() => import('@features/chat/ui/ChatWidget'), {
  ssr: false,
  loading: () => null,
});

const MotionSection = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.section })), {
  ssr: false,
  loading: () => <section />,
});

const MotionH1 = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.h1 })), {
  ssr: false,
  loading: () => <h1 className="sr-only">Загрузка заголовка...</h1>,
});

const MotionSpan = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.span })), {
  ssr: false,
  loading: () => <span />,
});

// Варианты анимации
const heroLine1Words = 'Ваш проводник в мир'.split(' ');
const heroLine2Words = 'искусственного интеллекта'.split(' ');

export default function ClientHomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header role="banner">
        <Navbar />
      </header>

      <main role="main">
        {/* Hero Section */}
        <MotionSection
          className="relative flex flex-col items-center justify-center overflow-hidden bg-black px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8 lg:py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          aria-label="Главная секция"
        >
          <div className="relative z-10 flex flex-col items-center">
            <LogoAnimation />

            <MotionH1 className="font-press-start-hero text-center text-2xl font-normal tracking-tight text-white sm:text-3xl md:text-4xl">
              <div>
                {heroLine1Words.map((word, i) => (
                  <MotionSpan
                    key={`l1-${word}-${i}`}
                    className="mr-3 inline-block md:mr-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.15,
                      duration: 0.4,
                      ease: 'easeOut',
                    }}
                  >
                    {word}
                  </MotionSpan>
                ))}
              </div>
              <div>
                {heroLine2Words.map((word, i) => (
                  <MotionSpan
                    key={`l2-${word}-${i}`}
                    className="mr-3 inline-block md:mr-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: (heroLine1Words.length + i) * 0.15,
                      duration: 0.4,
                      ease: 'easeOut',
                    }}
                  >
                    {word}
                  </MotionSpan>
                ))}
              </div>
            </MotionH1>
          </div>
        </MotionSection>

        {/* Chat Section */}
        <section aria-label="Чат с ИИ">
          <ChatSection />
        </section>

        {/* Кнопки быстрых вопросов */}
        <section aria-label="Быстрые вопросы">
          <QuickQuestionButtons />
        </section>

        {/* News Section */}
        <section aria-label="Новости искусственного интеллекта">
          <NewsSection />
        </section>

        {/* Testimonials Section */}
        <MotionSection
          className="bg-black px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          aria-label="Отзывы клиентов"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              className={`bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-2xl leading-relaxed font-bold tracking-tight text-transparent sm:text-3xl ${pacificoFont.className} mb-4 py-2 md:mb-6`}
            >
              Отзывы наших клиентов
            </h2>
            <TestimonialSliderWrapper />
          </div>
        </MotionSection>
      </main>

      {/* CTA Section */}
      <footer role="contentinfo" className="bg-black py-12 text-center md:py-16">
        <Link
          href="https://t.me/academyOptima"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-xl font-medium text-gray-400 transition-colors duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Связаться с нами через Telegram"
        >
          Связаться с нами
        </Link>
      </footer>

      {/* Чат-виджет для быстрого доступа (без приветственного сообщения) */}
      <ChatWidget />
    </div>
  );
}
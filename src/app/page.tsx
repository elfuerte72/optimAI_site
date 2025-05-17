'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import ServicesSection from '@/components/services-section';
import { motion } from 'framer-motion';

// Простые варианты анимации для блоков
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 relative"
          >
            <Image
              src="/images/logo-updated.png"
              alt="OptimaAI Logo"
              width={240}
              height={80}
              priority
              className="pointer-events-none"
            />
          </motion.div>
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Ваш проводник в мир исскуственного интелекта
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
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-2">Экспертиза</h3>
              <p className="text-gray-400 text-sm">Глубокое понимание технологий ИИ и опыт в различных индустриях.</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-2">Индивидуальный подход</h3>
              <p className="text-gray-400 text-sm">Решения, разработанные специально под ваши бизнес-цели и задачи.</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
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
          className="text-white hover:opacity-70 font-medium transition-opacity duration-300 text-xl px-6 py-3 border border-white rounded-md hover:bg-white hover:text-black"
        >
          Связаться с нами
        </Link>
      </section>

      {/* Footer будет добавлен автоматически из RootLayout */}
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { pacificoFont } from '@shared/lib';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@shared/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { NewsCard } from '../';
import { newsItems } from '@entities/newsData';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Варианты анимации
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedNewsId, setExpandedNewsId] = useState<string | null>(null);

  // Переключение слайдов
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1));
    setExpandedNewsId(null);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1));
    setExpandedNewsId(null);
  };

  // Обработка клика по новости
  const toggleNewsExpand = (id: string) => {
    setExpandedNewsId(expandedNewsId === id ? null : id);
  };

  return (
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
          Новости ИИ
        </h2>

        <div className="relative mx-auto max-w-3xl">
          <NewsCard
            news={newsItems[currentIndex]}
            isExpanded={expandedNewsId === newsItems[currentIndex].id}
            onToggle={() => toggleNewsExpand(newsItems[currentIndex].id)}
          />

          {/* Навигационные кнопки */}
          <div className="mt-6 flex justify-between">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="border-neutral-700 text-white hover:bg-neutral-800 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Индикаторы */}
            <div className="flex items-center space-x-2">
              {newsItems.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-neutral-700'
                    }`}
                  onClick={() => {
                    setCurrentIndex(index);
                    setExpandedNewsId(null);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Переключиться на новость ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="border-neutral-700 text-white hover:bg-neutral-800 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

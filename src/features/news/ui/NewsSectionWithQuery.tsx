'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { pacificoFont } from '@shared/lib';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@shared/ui';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

import { NewsCard } from './NewsCard';
import { useNews } from '../model';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Варианты анимации
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

interface NewsSectionWithQueryProps {
  limit?: number;
  showPagination?: boolean;
}

export default function NewsSectionWithQuery({ 
  limit = 5, 
  showPagination = true 
}: NewsSectionWithQueryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedNewsId, setExpandedNewsId] = useState<string | null>(null);

  // Используем React Query для получения новостей
  const { 
    data: newsResponse, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useNews({ 
    limit,
    page: 1 
  });

  const newsItems = newsResponse?.data || [];

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

  // Состояние загрузки
  if (isLoading) {
    return (
      <motion.section
        className="bg-black px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="mx-auto max-w-6xl">
          <h2
            className={`bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-2xl leading-relaxed font-bold tracking-tight text-transparent sm:text-3xl ${pacificoFont.className} mb-4 py-2 md:mb-6`}
          >
            Новости ИИ
          </h2>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-neutral-400">Загрузка новостей...</span>
          </div>
        </div>
      </motion.section>
    );
  }

  // Состояние ошибки
  if (isError) {
    return (
      <motion.section
        className="bg-black px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="mx-auto max-w-6xl">
          <h2
            className={`bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-2xl leading-relaxed font-bold tracking-tight text-transparent sm:text-3xl ${pacificoFont.className} mb-4 py-2 md:mb-6`}
          >
            Новости ИИ
          </h2>
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
            <span className="text-neutral-400 mb-4">
              Ошибка загрузки новостей: {error?.message || 'Неизвестная ошибка'}
            </span>
            <Button 
              onClick={() => refetch()} 
              variant="outline"
              className="border-neutral-700 text-white hover:bg-neutral-800"
            >
              Попробовать снова
            </Button>
          </div>
        </div>
      </motion.section>
    );
  }

  // Если нет новостей
  if (!newsItems.length) {
    return (
      <motion.section
        className="bg-black px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="mx-auto max-w-6xl">
          <h2
            className={`bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-2xl leading-relaxed font-bold tracking-tight text-transparent sm:text-3xl ${pacificoFont.className} mb-4 py-2 md:mb-6`}
          >
            Новости ИИ
          </h2>
          <div className="py-12">
            <span className="text-neutral-400">Новости пока не добавлены</span>
          </div>
        </div>
      </motion.section>
    );
  }

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
          {showPagination && newsItems.length > 1 && (
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
                    className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                      index === currentIndex ? 'bg-blue-500' : 'bg-neutral-700 hover:bg-neutral-600'
                    }`}
                    onClick={() => {
                      setCurrentIndex(index);
                      setExpandedNewsId(null);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Переключиться на новость ${index + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setCurrentIndex(index);
                        setExpandedNewsId(null);
                      }
                    }}
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
          )}

          {/* Информация о пагинации */}
          {newsResponse?.pagination && (
            <div className="mt-4 text-sm text-neutral-500">
              Показано {newsItems.length} из {newsResponse.pagination.total} новостей
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
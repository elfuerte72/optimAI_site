'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Noto_Sans_JP } from 'next/font/google';

const notoSansJapanese = Noto_Sans_JP({ subsets: ['latin'] });

const values = [
  {
    id: 'flexibility',
    title: 'Гибкость',
    subtitle: 'Умение адаптироваться',
    content: '',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 'openness',
    title: 'Открытость',
    subtitle: 'Делиться знаниями и опытом',
    content: '',
    color: 'from-green-400 to-green-600',
  },
  {
    id: 'innovation',
    title: 'Инновации',
    subtitle: 'Держать руку на пульсе технологических изменений в мире',
    content: '',
    color: 'from-purple-400 to-purple-600',
  },
];

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function BookCards() {
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Эффект для анимации переворачивания страниц
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Enhanced page turn animation
    pageRefs.current.forEach((page, index) => {
      if (!page) return;

      if (index === currentPage) {
        gsap.to(page, {
          opacity: 1,
          rotateY: 0,
          scale: 1,
          z: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      } else {
        const direction = index < currentPage ? -1 : 1;
        gsap.to(page, {
          opacity: 0,
          rotateY: direction * 90,
          scale: 0.9,
          z: -100,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    });
  }, [currentPage]);

  // Эффект для анимации скроллинга
  useEffect(() => {
    if (!containerRef.current || !bookRef.current) return;

    // Начальное состояние - невидимый и смещенный вниз
    gsap.set(containerRef.current, {
      opacity: 0,
      y: 50,
    });

    // Создаем анимацию скроллинга
    const scrollAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%', // Начинаем анимацию, когда верх элемента достигает 80% высоты экрана
        end: 'bottom 20%',
        toggleActions: 'play none none reverse', // play при входе, reverse при выходе
        markers: false, // Для отладки можно установить true
      },
    });

    // Анимация появления
    scrollAnimation.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Анимация книги с небольшой задержкой
    scrollAnimation.from(
      bookRef.current,
      {
        scale: 0.95,
        opacity: 0.9,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.4'
    );

    // Очистка при размонтировании
    return () => {
      if (scrollAnimation.scrollTrigger) {
        scrollAnimation.scrollTrigger.kill();
      }
      scrollAnimation.kill();
    };
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % values.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + values.length) % values.length);
  };

  return (
    <div ref={containerRef} className="mx-auto mt-0 flex max-w-2xl flex-col items-center">
      {/* Book Container */}
      <div
        ref={bookRef}
        className="perspective-1000 relative h-64 w-full max-w-md"
        style={{ perspective: '1200px' }}
      >
        {values.map((value, index) => (
          <div
            key={value.id}
            ref={(el) => {
              pageRefs.current[index] = el;
            }}
            className="absolute inset-0 rounded-xl border border-[#FFFFFF25] bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-5 shadow-2xl"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="flex h-full flex-col text-center">
              <div className="flex flex-1 flex-col justify-center">
                <h3
                  className={`mb-2 bg-gradient-to-r text-xl font-semibold ${value.color} bg-clip-text text-transparent`}
                >
                  {value.title}
                </h3>
                <p className="mb-4 text-lg text-white italic">{value.subtitle}</p>
                <p
                  className={`text-sm leading-relaxed text-[#FFFFFF] ${notoSansJapanese.className}`}
                  suppressHydrationWarning
                >
                  {value.content}
                </p>
              </div>

              {/* Page number */}
              <div className="mt-3 text-center text-xs text-white">
                {index + 1} / {values.length}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={prevPage}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFFFF25] bg-[#FFFFFF15] transition-all duration-300 hover:scale-110 hover:bg-[#FFFFFF25]"
          aria-label="Previous page"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>

        {/* Page indicators */}
        <div className="flex gap-2">
          {values.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 w-2 rounded-full transition-all duration-500 ${
                index === currentPage
                  ? 'scale-125 bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg'
                  : 'bg-[#FFFFFF25] hover:scale-110 hover:bg-[#FFFFFF40]'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFFFF25] bg-[#FFFFFF15] transition-all duration-300 hover:scale-110 hover:bg-[#FFFFFF25]"
          aria-label="Next page"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Определяем структуру отзыва
export interface Testimonial {
  name: string;
  text: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Эффект для анимации перелистывания отзывов
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Enhanced page turn animation
    pageRefs.current.forEach((page, index) => {
      if (!page) return;

      if (index === currentIndex) {
        gsap.to(page, {
          opacity: 1,
          rotateY: 0,
          scale: 1,
          z: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      } else {
        const direction = index < currentIndex ? -1 : 1;
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
  }, [currentIndex]);

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

    // Анимация карточки с небольшой задержкой
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
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) {
    return <p className="text-center text-white">Нет доступных отзывов.</p>;
  }

  return (
    <div ref={containerRef} className="mx-auto mt-0 flex max-w-2xl flex-col items-center">
      {/* Testimonial Container */}
      <div
        ref={bookRef}
        className="perspective-1000 relative h-auto min-h-[380px] w-full max-w-2xl"
        style={{ perspective: '1200px' }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            ref={(el) => {
              pageRefs.current[index] = el;
            }}
            className="absolute inset-0 rounded-xl border border-[#FFFFFF25] bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-6 shadow-2xl md:p-8"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="flex h-full flex-col text-center">
              <div className="flex flex-1 flex-col justify-center">
                <h3 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-xl font-medium text-transparent">
                  {testimonial.name}
                </h3>
                <p className="mb-4 text-xs font-light text-[#FFFFFF70] italic">Отзыв участника</p>
                <p className="text-base leading-relaxed font-light text-[#F5F5F5] md:text-lg">
                  {testimonial.text}
                </p>
              </div>

              {/* Удалено отображение номера страницы */}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={prevPage}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFFFF25] bg-[#FFFFFF15] transition-all duration-300 hover:scale-110 hover:bg-[#FFFFFF25]"
          aria-label="Previous testimonial"
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
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? 'scale-125 bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg'
                  : 'bg-[#FFFFFF25] hover:scale-110 hover:bg-[#FFFFFF40]'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFFFF25] bg-[#FFFFFF15] transition-all duration-300 hover:scale-110 hover:bg-[#FFFFFF25]"
          aria-label="Next testimonial"
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
};

export default TestimonialSlider;
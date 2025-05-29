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

// SVG иконки для навигации (минималистичные, белые)
const LeftArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const RightArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Эффект для анимации перелистывания отзывов
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
          ease: "power3.out",
        });
      } else {
        const direction = index < currentIndex ? -1 : 1;
        gsap.to(page, {
          opacity: 0,
          rotateY: direction * 90,
          scale: 0.9,
          z: -100,
          duration: 0.8,
          ease: "power3.out",
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
        start: "top 80%", // Начинаем анимацию, когда верх элемента достигает 80% высоты экрана
        end: "bottom 20%",
        toggleActions: "play none none reverse", // play при входе, reverse при выходе
        markers: false, // Для отладки можно установить true
      }
    });
    
    // Анимация появления
    scrollAnimation.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });
    
    // Анимация карточки с небольшой задержкой
    scrollAnimation.from(bookRef.current, {
      scale: 0.95,
      opacity: 0.9,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.4");
    
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
    return <p className="text-white text-center">Нет доступных отзывов.</p>;
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center max-w-2xl mx-auto mt-0">
      {/* Testimonial Container */}
      <div ref={bookRef} className="relative w-full max-w-2xl h-auto min-h-[380px] perspective-1000" style={{ perspective: "1200px" }}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            ref={(el) => {
              pageRefs.current[index] = el;
            }}
            className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-xl border border-[#FFFFFF25] p-6 md:p-8 shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="h-full flex flex-col text-center">
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-medium mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {testimonial.name}
                </h3>
                <p className="text-xs text-[#FFFFFF70] mb-4 font-light italic">Отзыв участника</p>
                <p className="text-base md:text-lg leading-relaxed text-[#F5F5F5] font-light">{testimonial.text}</p>
              </div>

              {/* Удалено отображение номера страницы */}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={prevPage}
          className="w-9 h-9 rounded-full bg-[#FFFFFF15] border border-[#FFFFFF25] flex items-center justify-center hover:bg-[#FFFFFF25] hover:scale-110 transition-all duration-300"
          aria-label="Previous testimonial"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>

        {/* Page indicators */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-blue-400 to-purple-500 scale-125 shadow-lg"
                  : "bg-[#FFFFFF25] hover:bg-[#FFFFFF40] hover:scale-110"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          className="w-9 h-9 rounded-full bg-[#FFFFFF15] border border-[#FFFFFF25] flex items-center justify-center hover:bg-[#FFFFFF25] hover:scale-110 transition-all duration-300"
          aria-label="Next testimonial"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );

};

export default TestimonialSlider;

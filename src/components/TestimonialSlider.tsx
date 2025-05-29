'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [direction, setDirection] = useState(0);

  // Обработчики навигации
  const handleNext = () => {
    if (currentIndex < testimonials.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Варианты анимации для Framer Motion
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  if (!testimonials || testimonials.length === 0) {
    return <p className="text-white text-center">Нет доступных отзывов.</p>;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto mt-0">
      <div className="w-full relative overflow-hidden min-h-[240px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30, duration: 0.3 },
              opacity: { duration: 0.2 },
            }}
            className="mission-card relative w-full bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-xl border border-[#FFFFFF15] p-5 shadow-2xl"
          >
            <div className="h-full flex flex-col text-center">
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-medium mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {currentTestimonial.name}
                </h3>
                <p className="text-xs text-[#FFFFFF70] mb-4 font-light italic">Отзыв участника</p>
                <p className="text-sm leading-relaxed text-[#F5F5F5] font-light">{currentTestimonial.text}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Индикаторы страниц */}
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-600'
              }`}
              aria-label={`Перейти к отзыву ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Навигационные кнопки */}
      <div className="flex justify-between w-full mt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          aria-label="Предыдущий отзыв"
        >
          <LeftArrowIcon />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === testimonials.length - 1}
          className="bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
          aria-label="Следующий отзыв"
        >
          <RightArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;

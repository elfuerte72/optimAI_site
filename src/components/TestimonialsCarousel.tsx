'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the testimonial structure
export interface Testimonial {
  name: string;
  text: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

// SVG Icon Components (Minimalistic White)
const LeftArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6 text-white"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const RightArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6 text-white"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6 text-white"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Modal component for all reviews
const AllReviewsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  testimonials: Testimonial[];
}> = ({ isOpen, onClose, testimonials }) => {
  if (!isOpen) return null;

  return (
    <div
      className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black"
      role="dialog"
      aria-modal="true"
      aria-labelledby="all-reviews-modal-title"
      onClick={onClose} // Close modal on overlay click
    >
      <div
        className="testimonial-card-custom-border max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-black p-6 shadow-xl md:p-8"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 id="all-reviews-modal-title" className="text-xl font-semibold text-white">
            Все отзывы
          </h3>
          <button
            onClick={onClose}
            aria-label="Закрыть модальное окно"
            className="text-white hover:text-gray-300"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card-custom-border bg-black p-4">
              {' '}
              {/* Ensure bg-black for consistent card background */}
              <p className="font-bold text-white">{testimonial.name}</p>
              <p className="mt-2 text-white">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsInView, setCardsInView] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Responsive adjustments for cards in view
  const updateCardsInView = useCallback(() => {
    if (window.innerWidth < 768) {
      setCardsInView(1);
    } else if (window.innerWidth < 1024) {
      // Adjusted breakpoint for 2 cards if desired, or keep as 1
      setCardsInView(1); // Example: 1 card for tablets
    } else {
      setCardsInView(3);
    }
  }, []);

  useEffect(() => {
    updateCardsInView();
    window.addEventListener('resize', updateCardsInView);
    return () => window.removeEventListener('resize', updateCardsInView);
  }, [updateCardsInView]);

  const totalPages = Math.ceil(testimonials.length / cardsInView);
  const currentDisplayIndex = Math.floor(currentIndex / cardsInView);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + cardsInView, testimonials.length - cardsInView)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - cardsInView, 0));
  };

  // Framer Motion variants for sliding animation
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

  // Calculate which testimonials to display based on currentIndex and cardsInView
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + cardsInView);

  if (!testimonials || testimonials.length === 0) {
    return <p className="text-center text-white">Нет доступных отзывов.</p>;
  }

  return (
    <div
      role="region"
      aria-label="Отзывы участников"
      aria-roledescription="carousel"
      className="relative mx-auto w-full max-w-6xl"
    >
      {/* Carousel Viewport */}
      <div className="relative h-auto min-h-[250px] overflow-hidden">
        {' '}
        {/* Adjust min-h as needed */}
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentDisplayIndex} // Change key to trigger animation for the set of cards
            className={`grid grid-cols-1 md:grid-cols-${cardsInView === 1 ? '1' : cardsInView} gap-4`}
            custom={currentIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30, duration: 0.3 },
              opacity: { duration: 0.2 },
            }}
          >
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card-custom-border flex min-h-[200px] flex-col justify-between bg-black p-6" // Ensure bg-black for consistent card background
              >
                <div>
                  <p className="text-lg font-bold text-white">{testimonial.name}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {testimonials.length > cardsInView && (
        <>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="bg-opacity-50 hover:bg-opacity-75 absolute top-1/2 left-0 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black p-2 disabled:cursor-not-allowed disabled:opacity-50 md:-translate-x-full"
            aria-label="Предыдущий отзыв"
            role="button"
          >
            <LeftArrowIcon />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= testimonials.length - cardsInView}
            className="bg-opacity-50 hover:bg-opacity-75 absolute top-1/2 right-0 z-10 translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black p-2 disabled:cursor-not-allowed disabled:opacity-50 md:translate-x-full"
            aria-label="Следующий отзыв"
            role="button"
          >
            <RightArrowIcon />
          </button>
        </>
      )}

      {/* "All Reviews" Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 text-xl font-medium text-gray-400 transition-colors duration-300 hover:text-white"
        >
          Все отзывы
        </button>
      </div>

      {/* All Reviews Modal */}
      <AllReviewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        testimonials={testimonials}
      />
    </div>
  );
};

export default TestimonialsCarousel;

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
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const RightArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      role="dialog"
      aria-modal="true"
      aria-labelledby="all-reviews-modal-title"
      onClick={onClose} // Close modal on overlay click
    >
      <div
        className="bg-black p-6 md:p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto testimonial-card-custom-border"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <div className="flex justify-between items-center mb-4">
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
            <div key={index} className="testimonial-card-custom-border p-4 bg-black"> {/* Ensure bg-black for consistent card background */}
              <p className="text-white font-bold">{testimonial.name}</p>
              <p className="text-white mt-2">{testimonial.text}</p>
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
    } else if (window.innerWidth < 1024) { // Adjusted breakpoint for 2 cards if desired, or keep as 1
      setCardsInView(1); // Example: 1 card for tablets
    }
    else {
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
    setCurrentIndex((prevIndex) => Math.min(prevIndex + cardsInView, testimonials.length - cardsInView));
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
    return <p className="text-white text-center">Нет доступных отзывов.</p>;
  }

  return (
    <div role="region" aria-label="Отзывы участников" aria-roledescription="carousel" className="w-full max-w-6xl mx-auto relative">
      {/* Carousel Viewport */}
      <div className="overflow-hidden relative h-auto min-h-[250px]"> {/* Adjust min-h as needed */}
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
                className="testimonial-card-custom-border p-6 flex flex-col justify-between bg-black min-h-[200px]" // Ensure bg-black for consistent card background
              >
                <div>
                  <p className="text-white font-bold text-lg">{testimonial.name}</p>
                  <p className="text-white mt-3 text-sm leading-relaxed">{testimonial.text}</p>
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
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 md:-translate-x-full bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed z-10"
            aria-label="Предыдущий отзыв"
            role="button"
          >
            <LeftArrowIcon />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= testimonials.length - cardsInView}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 md:translate-x-full bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed z-10"
            aria-label="Следующий отзыв"
            role="button"
          >
            <RightArrowIcon />
          </button>
        </>
      )}
      
      {/* "All Reviews" Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-gray-400 hover:text-white font-medium transition-colors duration-300 text-xl px-6 py-3"
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

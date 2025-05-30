// /Users/maximpenkin/Documents/openai/site/optimAI_site/src/components/AllReviewsModal.tsx
'use client';

import React, { useEffect } from 'react';

interface Testimonial {
  name: string;
  text: string;
}

interface AllReviewsModalProps {
  testimonials: Testimonial[];
  isOpen: boolean;
  onClose: () => void;
}

const AllReviewsModal: React.FC<AllReviewsModalProps> = ({ testimonials, isOpen, onClose }) => {
  // Handle Escape key to close modal and manage body scroll
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Ensure body scroll is restored when component unmounts or isOpen changes
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="all-reviews-modal-title"
      className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black p-4 backdrop-blur-sm"
      onClick={onClose} // Close on overlay click
    >
      <div
        className="gradient-border-card max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-black p-6 shadow-xl md:p-8"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="all-reviews-modal-title" className="text-xl font-semibold text-white lg:text-2xl">
            Все отзывы
          </h2>
          <button
            onClick={onClose}
            aria-label="Закрыть модальное окно"
            className="text-3xl text-white transition-colors hover:text-gray-300"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}-modal`}
              // Each card in the modal uses the .gradient-border-card class and has a black background for consistency
              className="gradient-border-card bg-black p-4 text-white"
            >
              <p className="mb-1 text-lg font-bold">{testimonial.name}</p>
              <p className="text-sm leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReviewsModal;

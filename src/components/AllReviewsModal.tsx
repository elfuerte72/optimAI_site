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
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose} // Close on overlay click
    >
      <div
        className="bg-black p-6 md:p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto gradient-border-card"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="all-reviews-modal-title" className="text-white text-xl lg:text-2xl font-semibold">
            Все отзывы
          </h2>
          <button 
            onClick={onClose} 
            aria-label="Закрыть модальное окно" 
            className="text-white text-3xl hover:text-gray-300 transition-colors"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div 
              key={`${testimonial.name}-${index}-modal`} 
              // Each card in the modal uses the .gradient-border-card class and has a black background for consistency
              className="gradient-border-card p-4 text-white bg-black"
            >
              <p className="font-bold text-lg mb-1">{testimonial.name}</p>
              <p className="text-sm leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReviewsModal;

'use client';

import ReviewsSection from './ReviewsSection';
import FutureSection from './FutureSection';

export default function ReviewsAndNewsSection() {
  return (
    <div className="py-12">
      <ReviewsSection />
      <div className="border-t border-gray-800 max-w-4xl mx-auto my-8" />
      <FutureSection />
    </div>
  );
}
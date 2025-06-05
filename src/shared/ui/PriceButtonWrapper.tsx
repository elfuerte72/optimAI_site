'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface PriceButtonProps {
  href: string;
  download?: boolean | string;
}

// Динамический импорт PriceButton без SSR
const PriceButton = dynamic(() => import('./PriceButton'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center animate-pulse">
      <div className="flex justify-center items-center w-52 h-12 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full">
        <div className="bg-gray-800 rounded-full w-48 h-10 flex items-center justify-center">
          <div className="h-4 w-16 bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  ),
});

const PriceButtonWrapper: React.FC<PriceButtonProps> = (props) => {
  return <PriceButton {...props} />;
};

export default PriceButtonWrapper;
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface CustomStyledButtonProps {
  href: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

// Динамический импорт CustomStyledButton без SSR
const CustomStyledButton = dynamic(() => import('./CustomStyledButton'), {
  ssr: false,
  loading: () => (
    <div className="inline-block min-w-[120px] animate-pulse">
      <div className="cursor-pointer rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-center text-white/70 transition-all duration-300 hover:bg-gray-700">
        <div className="h-5 w-24 bg-gray-600 rounded mx-auto"></div>
      </div>
    </div>
  ),
});

const CustomStyledButtonWrapper: React.FC<CustomStyledButtonProps> = (props) => {
  return <CustomStyledButton {...props} />;
};

export default CustomStyledButtonWrapper;
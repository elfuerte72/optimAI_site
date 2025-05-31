'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface UiverseCardProps {
  title: string;
  description: string;
}

// Динамический импорт UiverseCard без SSR
const UiverseCard = dynamic(() => import('./UiverseCard'), {
  ssr: false,
  loading: () => (
    <div className="w-full relative bg-gray-800 border border-gray-700 rounded-xl p-4 min-h-[120px] animate-pulse">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="h-6 w-32 bg-gray-600 rounded mb-2"></div>
        <div className="space-y-2 w-full">
          <div className="h-4 bg-gray-600 rounded w-full"></div>
          <div className="h-4 bg-gray-600 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    </div>
  ),
});

const UiverseCardWrapper: React.FC<UiverseCardProps> = ({ title, description }) => {
  return <UiverseCard title={title} description={description} />;
};

export default UiverseCardWrapper;
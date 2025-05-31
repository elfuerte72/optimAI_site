'use client';

import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Динамический импорт FadeInSection без SSR
const FadeInSection = dynamic(() => import('./FadeInSection').then(mod => ({ default: mod.FadeInSection })), {
  ssr: false,
  loading: () => (
    <div className="opacity-50">
      <div />
    </div>
  ),
});

const FadeInSectionWrapper: React.FC<FadeInSectionProps> = ({ children, delay = 0, className = '' }) => {
  return (
    <FadeInSection delay={delay} className={className}>
      {children}
    </FadeInSection>
  );
};

export default FadeInSectionWrapper;
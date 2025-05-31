'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт LogoAnimation без SSR
const LogoAnimation = dynamic(() => import('./LogoAnimation'), {
  ssr: false,
  loading: () => <div style={{ height: 80 }} />,
});

const LogoAnimationWrapper: React.FC = () => {
  return <LogoAnimation />;
};

export default LogoAnimationWrapper;
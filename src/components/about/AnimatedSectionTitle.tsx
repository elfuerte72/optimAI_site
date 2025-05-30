'use client';

import React, { useRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSectionTitle = forwardRef<HTMLHeadingElement, AnimatedSectionTitleProps>(
  ({ children, className }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          'text-center text-4xl font-bold tracking-tight text-neutral-100 opacity-0 sm:text-5xl',
          className
        )}
      >
        {children}
      </h2>
    );
  }
);

AnimatedSectionTitle.displayName = 'AnimatedSectionTitle';

export default AnimatedSectionTitle;

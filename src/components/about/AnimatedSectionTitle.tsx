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
          "text-4xl sm:text-5xl font-bold tracking-tight text-center text-neutral-100 opacity-0",
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
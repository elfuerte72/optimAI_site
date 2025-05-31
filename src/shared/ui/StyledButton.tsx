'use client';

import React, { ReactNode } from 'react';
import { cn } from '@shared/lib';

interface StyledButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function StyledButton({ children, onClick, className }: StyledButtonProps) {
  return (
    <button
      className={cn(
        'styled-button relative cursor-pointer rounded-lg border-0 px-3 py-2 text-left',
        'inline-block w-auto text-white/70 hover:-translate-y-[2px] hover:scale-[1.02] hover:text-white',
        'transition-all duration-1000 ease-[cubic-bezier(0.15,0.83,0.66,1)]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

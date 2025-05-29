'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StyledButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function StyledButton({ children, onClick, className }: StyledButtonProps) {
  return (
    <button
      className={cn(
        "styled-button relative cursor-pointer py-2 px-3 border-0 rounded-lg text-left",
        "inline-block w-auto text-white/70 hover:text-white hover:scale-[1.02] hover:-translate-y-[2px]",
        "transition-all duration-1000 ease-[cubic-bezier(0.15,0.83,0.66,1)]",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

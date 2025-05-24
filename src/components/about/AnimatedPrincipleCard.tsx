'use client';

import React, { useRef, forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap'; // Import GSAP
import { useGSAP } from '@gsap/react'; // Import useGSAP

interface AnimatedPrincipleCardProps {
  title: string;
  text: string;
  icon: LucideIcon;
  className?: string; // For the title card's styling
}

const AnimatedPrincipleCard = forwardRef<HTMLDivElement, AnimatedPrincipleCardProps>(
  ({ title, text, icon: Icon, className }, ref) => { // 'ref' is the root div for this component
    const lineRef = useRef<HTMLDivElement>(null);
    const textCardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
      if (!lineRef.current || !textCardRef.current || !ref || !(ref as React.RefObject<HTMLDivElement>).current) return;

      // This animation sequence plays once the component's root 'ref' is visible (handled by parent)
      // and its internal elements (line, textCard) are mounted.
      const tl = gsap.timeline({
        // paused: true, // Start paused, will be played by parent's ScrollTrigger
        delay: 0.1, // Small delay to ensure elements are ready
      });

      // Animate line (horizontal)
      tl.fromTo(lineRef.current,
        { width: '0px', opacity: 0 },
        { width: '50px', opacity: 1, duration: 0.7, ease: 'power2.inOut' }
      );

      // Animate text card
      tl.fromTo(textCardRef.current,
        { opacity: 0, x: -20 }, // Start from left and faded out
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
        "-=0.4" // Start this animation slightly before the line animation finishes
      );
      
      // It's important that the parent component (PrinciplesSection) triggers the visibility
      // of the root div (ref.current) of this AnimatedPrincipleCard.
      // This internal timeline will then play.

    }, { scope: (ref as React.RefObject<HTMLDivElement>) }); // Scope animations to this component instance

    return (
      // Root container for one principle item (Title Card + Line + Text Card).
      // This entire div will be animated (e.g., fade in, slide up) by PrinciplesSection.
      // Removing opacity-0 to ensure it's visible even if GSAP animations fail
      <div ref={ref} className="principle-item flex flex-wrap md:flex-nowrap items-center md:space-x-4 py-4 w-full">
        
        {/* Card 1: Title and Icon */}
        <div className={cn(
          "relative p-5 sm:p-6 rounded-xl border border-white/10 bg-neutral-900/60 backdrop-blur-md shadow-lg",
          "min-w-[220px] sm:min-w-[250px] flex-shrink-0", // Ensure title card doesn't shrink too much
          className 
        )}>
          <div className="flex items-center space-x-3">
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-sky-400 flex-shrink-0" />
            <h4 className="text-lg sm:text-xl font-semibold text-white">{title}</h4>
          </div>
        </div>

        {/* Animated Line (Horizontal) - initial state set by GSAP fromTo */}
        {/* Width will be animated from 0px. Opacity also animated. */}
        <div ref={lineRef} className="h-1 bg-gradient-to-r from-sky-400 to-indigo-600 rounded-full opacity-0" style={{ width: '0px' }} />

        {/* Card 2: Text Description - initial state (opacity 0, x -20) set by GSAP fromTo */}
        <div ref={textCardRef} className="p-5 sm:p-6 rounded-xl border border-white/5 bg-neutral-800/70 backdrop-blur-md shadow-md flex-grow opacity-0">
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    );
  }
);

AnimatedPrincipleCard.displayName = 'AnimatedPrincipleCard';

export default AnimatedPrincipleCard;
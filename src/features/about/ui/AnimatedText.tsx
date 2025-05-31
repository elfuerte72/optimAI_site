'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  fontSize?: string;
  fontWeight?: string;
  textColor?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0.3,
  staggerDelay = 0.03,
  fontSize = 'text-lg sm:text-xl',
  fontWeight = 'font-normal',
  textColor = 'text-neutral-300',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const wordElements = container.querySelectorAll('.animated-word');

    // Устанавливаем начальные стили
    gsap.set(container, { opacity: 1 });
    gsap.set(wordElements, { opacity: 0, y: 20 });

    // Создаем таймлайн для анимации
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top bottom-=100px',
        toggleActions: 'play none none none',
      },
    });

    // Анимируем каждое слово с задержкой
    tl.to(wordElements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: staggerDelay,
      ease: 'power3.out',
      delay: delay,
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [delay, staggerDelay]);

  return (
    <div ref={containerRef} className={`overflow-hidden opacity-0 ${className}`}>
      <div className={`${fontSize} ${fontWeight} ${textColor} leading-relaxed`}>
        {words.map((word, index) => (
          <span key={`word-${index}`} className="animated-word mx-1 inline-block first:ml-0">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnimatedText;
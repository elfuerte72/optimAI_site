'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitFork, BookOpen, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ValueCardProps {
  title: string;
  text: string;
  icon: React.ReactNode;
  className?: string;
  delay?: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, text, icon, className, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    gsap.set(card, {
      opacity: 0,
      y: 50,
      scale: 0.9,
      filter: 'blur(3px)',
    });

    const cardAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    cardAnimation.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.8,
      delay: delay,
      ease: 'power3.out',
    });

    return () => {
      if (cardAnimation) cardAnimation.kill();
      if (cardAnimation.scrollTrigger) cardAnimation.scrollTrigger.kill();
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`bg-neutral-850/80 relative transform rounded-lg border border-neutral-700/70 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:border-current ${className || ''}`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 rounded-full bg-neutral-700/50 p-3 transition-colors group-hover:bg-neutral-600/50">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-neutral-100">{title}</h3>
        <p className="text-sm leading-relaxed text-neutral-400">{text}</p>
      </div>
    </div>
  );
};

export const ValueCards: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const values = [
    {
      id: 'flexibility',
      title: 'Гибкость',
      text: 'Подстраиваемся под задачу клиента.',
      icon: <GitFork size={28} className="value-card-icon text-emerald-400" />,
    },
    {
      id: 'openness',
      title: 'Открытость',
      text: 'Делимся знаниями и кодом.',
      icon: <BookOpen size={28} className="value-card-icon text-amber-400" />,
    },
    {
      id: 'movement',
      title: 'Движение',
      text: 'Всегда держим руку на пульсе технологий.',
      icon: <TrendingUp size={28} className="value-card-icon text-rose-400" />,
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Анимация заголовка
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger === titleRef.current ||
          trigger.vars.trigger === sectionRef.current
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full py-8">
      <h2
        ref={titleRef}
        className="mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-center text-2xl font-semibold text-transparent sm:text-3xl"
      >
        Наши ценности
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {values.map((value, index) => (
          <ValueCard
            key={value.id}
            title={value.title}
            text={value.text}
            icon={value.icon}
            className={`hover:border-${index === 0 ? 'emerald' : index === 1 ? 'amber' : 'rose'}-400/80 hover:shadow-${index === 0 ? 'emerald' : index === 1 ? 'amber' : 'rose'}-500/15`}
            delay={index * 0.15}
          />
        ))}
      </div>
    </div>
  );
};

export default ValueCards;

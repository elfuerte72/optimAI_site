'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { GitFork, BookOpen, TrendingUp, Shuffle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      // Новая улучшенная анимация появления карточки
      const cardElements = cardRef.current.querySelectorAll('*');

      // Сначала скрываем все элементы
      gsap.set(cardElements, { opacity: 0 });

      // Основная анимация карточки
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=150px',
          toggleActions: 'play none none reset',
          once: false,
        },
      });

      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.92, rotationX: -5 },
        { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.8, ease: 'power2.out' }
      )
        .fromTo(
          cardRef.current.querySelector('.icon-container'),
          { opacity: 0, scale: 0.5, rotate: -10 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.5)' },
          '-=0.4'
        )
        .fromTo(
          cardRef.current.querySelector('h3'),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power1.out' },
          '-=0.3'
        )
        .fromTo(
          cardRef.current.querySelector('p'),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power1.out' },
          '-=0.3'
        );

      // Оптимизированная анимация при наведении
      const tlHover = gsap.timeline({ paused: true });
      tlHover
        .to(cardRef.current, {
          y: -15,
          scale: 1.05,
          boxShadow: '0px 25px 50px -12px rgba(0, 180, 255, 0.4)',
          borderColor: 'rgba(0, 180, 255, 0.8)',
          duration: 0.6,
          ease: 'power2.inOut',
        })
        .to(
          cardRef.current?.querySelector('.icon-container'),
          {
            scale: 1.15,
            rotate: 5,
            backgroundColor: 'rgba(0, 120, 255, 0.3)',
            duration: 0.5,
            ease: 'sine.inOut',
          },
          0
        )
        .to(
          cardRef.current?.querySelector('h3'),
          {
            color: 'rgb(160, 220, 255)',
            duration: 0.5,
            ease: 'sine.inOut',
          },
          0
        )
        .to(
          cardRef.current?.querySelector('p'),
          {
            color: 'rgb(220, 240, 255)',
            duration: 0.5,
            ease: 'sine.inOut',
          },
          0
        );

      // Используем reverse(null, false) для плавного возврата без перезаписи параметров
      cardRef.current.addEventListener('mouseenter', () => tlHover.play());
      cardRef.current.addEventListener('mouseleave', () => tlHover.reverse(null, false));

      return () => {
        if (cardRef.current) {
          cardRef.current.removeEventListener('mouseenter', () => tlHover.play());
          cardRef.current.removeEventListener('mouseleave', () => tlHover.reverse(null, false));
        }
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className={`ease-out-cubic group rounded-xl border border-neutral-700/70 bg-neutral-800/30 p-7 backdrop-blur-md transition-all duration-300 sm:p-10 ${className || ''} flex min-h-[240px] flex-col items-center justify-center text-center opacity-0`}
    >
      <div className="mb-5 flex flex-col items-center sm:mb-6">
        <div className="icon-container ease-out-cubic mb-3 rounded-full bg-neutral-700/50 p-4 transition-transform duration-300">
          {React.cloneElement(icon as React.ReactElement, {
            size: 32,
            className: 'text-sky-400 group-hover:text-sky-300 transition-colors duration-300',
          })}
        </div>
        <h3 className="text-xl font-semibold text-neutral-100 sm:text-2xl">{title}</h3>
      </div>
      <p className="mx-auto w-full text-base leading-relaxed text-neutral-300 sm:text-xl">
        {description}
      </p>
    </div>
  );
};

const NewPrinciplesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const valuesTitleRef = useRef<HTMLHeadingElement>(null);
  const valuesGridRef = useRef<HTMLDivElement>(null);

  const content = {
    mission: {
      title: 'Наша миссия',
      text: 'Объединять людей и технологии.',
    },
    vision: {
      title: 'Наше видение',
      text: 'Занять лидирующую позицию в российском AI‑консалтинге и EdTech, оставаясь гибкими, открытыми и постоянно в движении.',
    },
    values: {
      title: 'Наши ценности',
      items: [
        {
          icon: <Shuffle />,
          title: 'Гибкость',
          description: 'Гибкость — подстраиваемся под задачу клиента.',
        },
        {
          icon: <BookOpen />,
          title: 'Открытость',
          description: 'Открытость — делимся знаниями и кодом.',
        },
        {
          icon: <TrendingUp />,
          title: 'Движение',
          description: 'Движение — всегда держим руку на пульсе технологий.',
        },
      ],
    },
  };

  useGSAP(
    () => {
      const elementsToAnimate = [
        missionRef.current?.children,
        visionRef.current?.children,
        valuesTitleRef.current,
      ].filter(Boolean);

      // Анимация заголовков и блоков миссии/видения
      gsap.fromTo(
        elementsToAnimate,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center+=100px',
            toggleActions: 'play none none none',
          },
        }
      );

      // Улучшенная анимация для сетки с карточками
      if (valuesGridRef.current) {
        // Создаем отдельный таймлайн для сетки
        const gridTl = gsap.timeline({
          scrollTrigger: {
            trigger: valuesGridRef.current,
            start: 'top bottom-=100px',
            toggleActions: 'play none none reset',
          },
        });

        // Анимируем сетку с эффектом волны
        gridTl.fromTo(
          valuesGridRef.current.children,
          { opacity: 0, y: 80, scale: 0.9, stagger: 0.15 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: {
              each: 0.2,
              ease: 'power2.inOut',
            },
            duration: 0.8,
            ease: 'power2.out',
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="space-y-12 py-16 sm:space-y-16 sm:py-24">
      {/* Миссия */}
      <div ref={missionRef} className="mission-vision-item mx-auto max-w-2xl text-center opacity-0">
        <h2 className="mb-4 bg-gradient-to-br from-sky-400 via-cyan-300 to-teal-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          {content.mission.title}
        </h2>
        <p className="text-xl leading-relaxed text-neutral-200 sm:text-2xl">
          {content.mission.text}
        </p>
      </div>

      {/* Видение */}
      <div ref={visionRef} className="mission-vision-item mx-auto max-w-3xl text-center opacity-0">
        <h2 className="mb-4 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          {content.vision.title}
        </h2>
        <p className="text-xl leading-relaxed text-neutral-200 sm:text-2xl">
          {content.vision.text}
        </p>
      </div>

      {/* Ценности */}
      <div className="space-y-8 sm:space-y-10">
        <h2
          ref={valuesTitleRef}
          className="mb-10 text-center text-3xl font-bold text-white opacity-0 sm:mb-12 sm:text-4xl"
        >
          {content.values.title}
        </h2>
        <div ref={valuesGridRef} className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {content.values.items.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewPrinciplesSection;

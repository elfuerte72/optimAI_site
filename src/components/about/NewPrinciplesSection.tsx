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

  useGSAP(() => {
    if (!cardRef.current) return;

    // Улучшенная анимация появления карточки
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 70, scale: 0.9, rotationX: -10 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=100px',
          toggleActions: 'play none none reset',
          once: false,
        },
      }
    );

    // Улучшенная анимация при наведении
    const tlHover = gsap.timeline({ paused: true });
    tlHover
      .to(cardRef.current, {
        y: -15,
        scale: 1.05,
        boxShadow: '0px 25px 50px -12px rgba(0, 180, 255, 0.4)',
        borderColor: 'rgba(0, 180, 255, 0.8)',
        duration: 0.4,
        ease: 'power3.out',
      })
      .to(cardRef.current?.querySelector('.icon-container'), {
        scale: 1.2,
        rotate: 5,
        backgroundColor: 'rgba(0, 120, 255, 0.3)',
        duration: 0.4,
        ease: 'back.out(1.5)',
      }, 0)
      .to(cardRef.current?.querySelector('h3'), {
        color: 'rgb(160, 220, 255)',
        duration: 0.3,
        ease: 'power2.out',
      }, 0);

    cardRef.current.addEventListener('mouseenter', () => tlHover.play());
    cardRef.current.addEventListener('mouseleave', () => tlHover.reverse());

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mouseenter', () => tlHover.play());
        cardRef.current.removeEventListener('mouseleave', () => tlHover.reverse());
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, { scope: cardRef });


  return (
    <div
      ref={cardRef}
      className={`bg-neutral-800/30 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-neutral-700/70 transition-all duration-300 ease-out-cubic group ${className || ''} opacity-0 flex flex-col items-center text-center`}
    >
      <div className="flex flex-col items-center mb-5 sm:mb-6">
        <div className="icon-container p-4 bg-neutral-700/50 rounded-full mb-3 transition-transform duration-300 ease-out-cubic">
          {React.cloneElement(icon as React.ReactElement, { size: 32, className: "text-sky-400 group-hover:text-sky-300 transition-colors duration-300" })}
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-neutral-100">{title}</h3>
      </div>
      <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mx-auto">{description}</p>
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
      title: "Наша миссия",
      text: "Объединять людей и технологии.",
    },
    vision: {
      title: "Наше видение",
      text: "Занять лидирующую позицию в российском AI‑консалтинге и EdTech, оставаясь гибкими, открытыми и постоянно в движении.",
    },
    values: {
      title: "Наши ценности",
      items: [
        {
          icon: <Shuffle />,
          title: "Гибкость",
          description: "Гибкость — подстраиваемся под задачу клиента.",
        },
        {
          icon: <BookOpen />,
          title: "Открытость",
          description: "Открытость — делимся знаниями и кодом.",
        },
        {
          icon: <TrendingUp />,
          title: "Движение",
          description: "Движение — всегда держим руку на пульсе технологий.",
        },
      ],
    },
  };

  useGSAP(() => {
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

    // Дополнительная анимация для сетки с карточками
    if (valuesGridRef.current) {
      gsap.from(valuesGridRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: valuesGridRef.current,
          start: 'top bottom-=50px',
          toggleActions: 'play none none none',
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 space-y-12 sm:space-y-16">
      {/* Миссия */}
      <div ref={missionRef} className="mission-vision-item text-center max-w-2xl mx-auto opacity-0">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-sky-400 via-cyan-300 to-teal-400">
          {content.mission.title}
        </h2>
        <p className="text-xl sm:text-2xl text-neutral-200 leading-relaxed">
          {content.mission.text}
        </p>
      </div>

      {/* Видение */}
      <div ref={visionRef} className="mission-vision-item text-center max-w-3xl mx-auto opacity-0">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400">
          {content.vision.title}
        </h2>
        <p className="text-xl sm:text-2xl text-neutral-200 leading-relaxed">
          {content.vision.text}
        </p>
      </div>

      {/* Ценности */}
      <div className="space-y-8 sm:space-y-10">
        <h2 ref={valuesTitleRef} className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 via-amber-300 to-orange-400 opacity-0">
          {content.values.title}
        </h2>
        <div ref={valuesGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
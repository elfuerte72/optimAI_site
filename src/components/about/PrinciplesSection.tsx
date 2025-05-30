'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedPrincipleCard from './AnimatedPrincipleCard';
import AnimatedSectionTitle from './AnimatedSectionTitle';
import { Eye, Gem, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PrincipleData {
  id: string;
  title: string;
  text: string;
  icon: React.ComponentType<any>;
  hoverColor?: string; // Оставляем для обратной совместимости
}

const principles: PrincipleData[] = [
  {
    id: 'flexibility',
    title: 'Гибкость',
    text: 'Мы подстраиваемся под любую задачу клиента: быстро перестраиваем дорожную карту, меняем угол зрения и технологический стек по ходу проекта, интегрируемся в существующие процессы без лишней бюрократии. Главное — результат, а не жёсткий план.',
    icon: Eye,
    hoverColor: 'hover:border-emerald-400',
  },
  {
    id: 'openness',
    title: 'Открытость',
    text: 'Делимся знаниями и кодом: публикуем полезные репозитории на GitHub, проводим открытые вебинары и митапы, честно рассказываем о факапах и находках. Прозрачная коммуникация и 100 % ясность по цене и срокам — основа доверия.',
    icon: Gem,
    hoverColor: 'hover:border-amber-400',
  },
  {
    id: 'movement',
    title: 'Движение',
    text: 'Всегда держим руку на пульсе технологий: тестируем ранние версии моделей, проводим внутренний R&D‑спринт каждую неделю, экспериментируем, чтобы первым приносить клиентам свежие AI‑возможности. Статика — враг прогресса.',
    icon: Target,
    hoverColor: 'hover:border-sky-400',
  },
];

const PrinciplesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const principleItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Инициализируем массив ссылок при монтировании компонента
  useEffect(() => {
    principleItemRefs.current = Array(principles.length).fill(null);
  }, []); // Выполняется только при монтировании

  useGSAP(
    () => {
      if (!sectionRef.current || !titleRef.current) return;

      // Анимация заголовка секции
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Анимируем каждый элемент принципа (корневой div компонента AnimatedPrincipleCard)
      principleItemRefs.current.forEach((itemRef, index) => {
        if (itemRef) {
          // Проверяем, что ссылка заполнена
          gsap.fromTo(
            itemRef,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power2.out',
              delay: 0.2 + index * 0.25, // Последовательное появление элементов
              scrollTrigger: {
                trigger: itemRef,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    },
    { scope: sectionRef, dependencies: [principleItemRefs.current.length] }
  );

  return (
    <div
      ref={sectionRef}
      className="principles-section mt-24 mb-20 space-y-10 sm:mt-32 sm:space-y-16"
    >
      <AnimatedSectionTitle ref={titleRef}>Наши принципы</AnimatedSectionTitle>

      {/* Стек элементов принципов вертикально. Каждый элемент - это ряд: [Карточка заголовка] --Линия-- [Карточка текста] */}
      <div className="flex w-full flex-col items-center space-y-12 px-4 sm:space-y-16 sm:px-6 lg:px-8">
        {principles.map((principle, index) => (
          <AnimatedPrincipleCard
            key={principle.id}
            // Присваиваем ref соответствующему индексу в principleItemRefs
            ref={(el) => {
              principleItemRefs.current[index] = el;
            }}
            title={principle.title}
            text={principle.text}
            icon={principle.icon}
            className={principle.hoverColor}
          />
        ))}
      </div>
    </div>
  );
};

export default PrinciplesSection;

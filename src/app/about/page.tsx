'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';
import { Eye, Gem, Target, Users, GitFork, BookOpen, TrendingUp } from 'lucide-react';
import NewPrinciplesSection from '@/components/about/NewPrinciplesSection';
import { BookCards } from '@/components/about/cards-princ';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FlipCard from '@/components/about/FlipCard';
import FlipCardStyles from '@/components/about/FlipCardStyles';

gsap.registerPlugin(ScrollTrigger);

// Компонент LogoAnimation с главной страницы
const LogoAnimation = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Определяем, является ли устройство мобильным при монтировании и при изменении размера окна
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // На мобильных устройствах активируем анимацию периодически
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isMobile) {
      interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 3000); // Анимация длится 3 секунды
      }, 8000); // Запускать каждые 8 секунд
    }
    
    return () => clearInterval(interval);
  }, [isMobile]);

  // Объединяем состояния hover для десктопа и автоматической анимации для мобильных
  const shouldAnimate = isLogoHovered || isAnimating;

  return (
    <motion.div
      className="relative mb-8 isolate"
      onHoverStart={() => !isMobile && setIsLogoHovered(true)}
      onHoverEnd={() => !isMobile && setIsLogoHovered(false)}
    >
      {/* Основной логотип */}
      <Image
        src="/images/logo-updated.png"
        alt="OptimaAI Logo"
        width={346}
        height={115}
        priority
        className="relative z-10"
      />
      
      {/* Внешнее свечение */}
      <AnimatePresence>
        {shouldAnimate && (
          <motion.div
            className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 blur-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.7, 0.5, 0.7, 0], 
              scale: [0.8, 1.1, 1.15, 1.1, 0.9], 
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 2.5, 
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
              repeat: isMobile ? 1 : 0,
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Внутреннее свечение - более интенсивное */}
      <AnimatePresence>
        {shouldAnimate && (
          <motion.div
            className="absolute inset-0 z-1 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 blur-md"
            style={{ 
              mixBlendMode: "screen", 
              transform: "translateY(2px) scale(0.98)",
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0.6, 0.8, 0], 
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2,
              ease: "easeInOut", 
              times: [0, 0.25, 0.5, 0.75, 1],
              repeat: isMobile ? 1 : 0,
              delay: 0.15,
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Тонкие линии технологического свечения */}
      <AnimatePresence>
        {shouldAnimate && (
          <>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <motion.div
                key={`line-${angle}`}
                className="absolute h-[1px] bg-gradient-to-r from-white/30 via-blue-400/50 to-transparent"
                style={{ 
                  width: "70px",
                  top: "50%",
                  left: "50%",
                  transformOrigin: "left center",
                  rotate: `${angle}deg`,
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 0.8, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ 
                  duration: 1.2,
                  delay: i * 0.05, 
                  ease: "easeOut", 
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AboutPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const principlesTitleRef = useRef<HTMLHeadingElement>(null);
  const sectionCardRefs = useRef<Array<HTMLElement | null>>([]); // Для Миссии и Команды
  const valueCardRefs = useRef<Array<HTMLDivElement | null>>([]); // Для Гибкость, Открытость, Движение
  const valuesTextRef = useRef<HTMLParagraphElement>(null);
  const animatedLineRef = useRef<HTMLDivElement>(null);

  const addToSectionCardRefs = (el: HTMLElement | null) => { if (el && !sectionCardRefs.current.includes(el)) sectionCardRefs.current.push(el); };
  const addToValueCardRefs = (el: HTMLDivElement | null) => { if (el && !valueCardRefs.current.includes(el)) valueCardRefs.current.push(el); };
  
  // Функция для плавного скролла
  const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

  // Используем useEffect для инициализации плавного скролла и других эффектов
  // Общая функция для анимации карточек (Миссия, Команда)
  const animateSectionCard = (card: HTMLElement | null, index: number) => {
    if (!card) return; // Проверка на null
    
    const cardScrubTimeline = gsap.timeline({ 
      scrollTrigger: { 
        trigger: card, 
        start: "top bottom+=100px", 
        end: "bottom top-=100px", 
        scrub: 0.3 
      } 
    });
    
    const yOffsetEnter = '25vh';
    const yOffsetExitBase = -25;
    const yOffsetExit = `${yOffsetExitBase - (index % 2) * 10}vh`;
    const rotationEnter = (index % 2 === 0 ? 5 : -5);
    const rotationExit = (index % 2 === 0 ? -5 : 5);
    
    cardScrubTimeline.fromTo(
      card, 
      { 
        opacity: 0, 
        y: yOffsetEnter, 
        scale: 0.9, 
        rotationZ: rotationEnter, 
        filter: 'blur(3px)' 
      }, 
      { 
        opacity: 1, 
        y: '0vh', 
        scale: 1, 
        rotationZ: 0, 
        filter: 'blur(0px)', 
        ease: 'power2.inOut', 
        duration: 0.6 
      }, 
      0
    ).to(
      card, 
      { 
        opacity: 0, 
        y: yOffsetExit, 
        scale: 0.9, 
        rotationZ: rotationExit, 
        filter: 'blur(3px)', 
        ease: 'power2.inOut', 
        duration: 0.4 
      }, 
      0.6
    );
  };

  // Используем useEffect для инициализации плавного скролла
  useEffect(() => {
    if (!pageRef.current) return;
    
    // Инициализация плавного скролла
    const lenis = new Lenis({ duration: 1.3, easing, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // Устанавливаем начальные стили для анимации карточек
    gsap.set(sectionCardRefs.current, { opacity: 0, y: 50, scale: 0.9 });

    // Применяем анимацию к секционным карточкам
    sectionCardRefs.current.forEach(animateSectionCard);

    return () => { 
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); 
      lenis.destroy(); 
    };
  }, []);
  
  // Отдельный хук useGSAP для анимаций - НЕ ВНУТРИ useEffect
  useGSAP(() => {
    if (!pageRef.current) return;

    // Анимация геройной секции
    if (heroContentRef.current) {
      const heroTitle = heroContentRef.current.querySelector('h1');
      const heroParagraphs = heroContentRef.current.querySelectorAll('p');
      
      if (heroTitle) {
        gsap.fromTo(
          heroTitle, 
          {opacity: 0, y: 40}, 
          {opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out'}
        );
      }
      
      if (heroParagraphs.length > 0) {
        gsap.fromTo(
          heroParagraphs, 
          {opacity: 0, y: 30}, 
          {opacity: 1, y: 0, stagger: 0.15, duration: 0.7, delay: 0.5, ease: 'power3.out'}
        );
      }
    }

    // Анимация белой линии
    if (animatedLineRef.current) {
      gsap.fromTo(
        animatedLineRef.current,
        { width: '0%', opacity: 0 },
        { width: '100%', opacity: 1, duration: 1.2, ease: 'power3.inOut', delay: 0.5 }
      );
    }

    // Анимация текста ценностей
    if (valuesTextRef.current) {
      gsap.fromTo(
        valuesTextRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesTextRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  const content = {
    hero: {
      title: "Ближе к будущему",
      p2: "OptimAI был основан в 2023 году с целью развития AI-решений и продуктов в России. С тех пор мы сфокусировались на упрощении внедрения технологий искусственного интеллекта в бизнес-процессы и повседневную жизнь людей.",
    },
    mission: { 
      title: 'Наша миссия', 
      text: 'Объединять людей и технологии.', 
      icon: <Target size={32} className="card-icon text-sky-400" /> 
    },
    // Секция "Видение" удалена, ее суть переходит в "Принципы" и карточки ценностей
    principlesTitle: "Наши Принципы", // Новый заголовок
    values: [
      { id: 'flexibility', title: 'Гибкость', text: 'Подстраиваемся под задачу клиента.', icon: <GitFork size={28} className="value-card-icon text-emerald-400" /> },
      { id: 'openness', title: 'Открытость', text: 'Делимся знаниями и кодом.', icon: <BookOpen size={28} className="value-card-icon text-amber-400" /> },
      { id: 'movement', title: 'Движение', text: 'Всегда держим руку на пульсе технологий.', icon: <TrendingUp size={28} className="value-card-icon text-rose-400" /> },
    ],
    team: { 
      title: 'Команда основателей', 
      members: [
        { name: 'Григорий Таловиков', position: 'CEO', image: '/images/2025-05-26 15.13.35.jpg' },
        { name: 'Сергей Щербина', position: 'директор промт-инжиниринга и PR', image: '/images/2025-05-26 15.13.44.jpg' },
        { name: 'Максим Пенкин', position: 'Технический директор', image: '/images/2025-05-26 15.13.54.jpg' }
      ], 
      icon: <Users size={32} className="card-icon text-sky-400" /> 
    },
  };

  // Основной компонент карточки (для Миссии, Команды)
  interface SectionCardProps {
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    title?: string;
  }

  const SectionCard = React.forwardRef<HTMLElement, SectionCardProps>(({ children, className, icon, title }, ref) => (
    <section 
      ref={ref} 
      className={`group bg-neutral-800/70 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl border border-neutral-700/60 hover:border-sky-400/80 hover:shadow-sky-500/15 transition-colors duration-300 ease-in-out hover:scale-[1.02] ${className || ''}`}
    >
      <div className="flex items-start space-x-4 mb-5">
        {icon && <div className="mt-1 group-hover:scale-110 group-hover:rotate-[7deg] transition-transform duration-300 ease-out">{icon}</div>}
        {title && <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">{title}</h2>}
      </div>
      {children}
    </section>
  ));
  SectionCard.displayName = 'SectionCard';

  // Новый компонент для карточек ценностей
  interface ValueCardProps {
    title: string;
    text: string;
    icon: React.ReactNode;
    className?: string;
  }

  const ValueCard = React.forwardRef<HTMLDivElement, ValueCardProps>(({ title, text, icon, className }, ref) => (
    <div 
      ref={ref} 
      className={`relative bg-neutral-850/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-neutral-700/70 hover:border-current transition-all duration-300 ease-in-out transform hover:scale-105 ${className || ''}`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 p-3 rounded-full bg-neutral-700/50 group-hover:bg-neutral-600/50 transition-colors">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-neutral-100">{title}</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">{text}</p>
      </div>
    </div>
  ));
  ValueCard.displayName = 'ValueCard';

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white flex flex-col items-center pt-16 sm:pt-24 pb-20 sm:pb-28 selection:bg-sky-600 selection:text-white overflow-x-hidden">
      <main className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        <div className="flex justify-center mb-1 sm:mb-2"><LogoAnimation /></div>
        <div ref={animatedLineRef} className="h-[0.5px] bg-white/50 w-full max-w-sm mx-auto mb-4 opacity-0"></div>
        <div ref={heroContentRef} className="text-center space-y-5 sm:space-y-7 relative">
          {/* Иконка Zap удалена */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400">{content.hero.title}</h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">Мы — энтузиасты в сфере искусственного интеллекта.</p>
        </div>

        <div ref={addToSectionCardRefs} className="mission-section-custom py-12 my-12 opacity-0 flex justify-center">
          <div className="relative w-full max-w-md bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-xl border border-[#FFFFFF15] p-5 shadow-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300 ease-in-out">
            <div className="h-full flex flex-col text-center">
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-medium mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {content.mission.title}
                </h3>
                <p className="text-xs text-[#FFFFFF70] mb-4 font-light italic">Наша главная цель</p>
                <p className="text-sm leading-relaxed text-[#F5F5F5] font-light">Объединять людей и технологии.</p>
              </div>
            </div>
          </div>
        </div>

        <BookCards />
        
        <div className="flex flex-col items-center mt-8">
          <div className="h-[0.5px] bg-white/50 w-full max-w-sm mx-auto mb-4 opacity-70"></div>
          <p ref={valuesTextRef} className="text-lg sm:text-xl text-center text-neutral-300 max-w-2xl mx-auto mb-10 opacity-0">Наши ценности интегрированы в повседневную работу, формируют наш подход к людям, решениям и развитию.</p>
        </div>

        <SectionCard 
          ref={addToSectionCardRefs} 
          icon={content.team.icon} 
          title={content.team.title}
          className="hover:border-indigo-400/80 hover:shadow-indigo-500/15"
        >
          <FlipCardStyles>
            <div className="grid mt-6">
              {content.team.members.map((member, index) => (
                <div key={index}>
                  <FlipCard
                    name={member.name}
                    position={member.position}
                    image={member.image}
                  />
                </div>
              ))}
            </div>
          </FlipCardStyles>
        </SectionCard>
      </main>
    </div>
  );
};

export default AboutPage;
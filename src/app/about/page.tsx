'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';
import { Eye, Gem, Target, Users, GitFork, BookOpen, TrendingUp } from 'lucide-react';
import NewPrinciplesSection from '@/components/about/NewPrinciplesSection';
import { BookCards } from '@/components/about/cards-princ';

gsap.registerPlugin(ScrollTrigger);

// Компонент AnimatedLogo остается без изменений
const AnimatedLogo: React.FC = () => {
  const logoContainerRef = useRef<SVGSVGElement>(null);
  const optimaTextRef = useRef<SVGTextElement>(null);
  const aiTextRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (!logoContainerRef.current || !optimaTextRef.current || !aiTextRef.current) return;
    const optimaChars = gsap.utils.toArray(optimaTextRef.current.children);
    const aiChars = gsap.utils.toArray(aiTextRef.current.children);
    const allChars = [...optimaChars, ...aiChars] as SVGTSpanElement[];
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(optimaChars, { opacity: 0, y: 20, scale: 0.8, rotateX: -45 }, { opacity: 1, y: 0, scale: 1, rotateX: 0, stagger: 0.07, duration: 0.6, delay: 0.3 })
      .fromTo(aiChars, { opacity: 0, y: 20, scale: 0.8, rotateX: -45 }, { opacity: 1, y: 0, scale: 1, rotateX: 0, stagger: 0.1, duration: 0.6 }, "-=0.4");
    const logoElement = logoContainerRef.current;
    const onMouseEnter = () => {
      gsap.to(allChars, { y: (i) => (i % 2 === 0 ? -3 : 3), scale: 1.05, rotateX: (i) => (i % 2 === 0 ? 5 : -5), duration: 0.3, stagger: { each: 0.03, from: 'random' }, ease: 'power2.inOut' });
      gsap.to(logoElement.querySelector('#aiGradientStop1'), { stopColor: '#FF00FF', duration: 0.4 });
      gsap.to(logoElement.querySelector('#aiGradientStop2'), { stopColor: '#00FFFF', duration: 0.4 });
    };
    const onMouseLeave = () => {
      gsap.to(allChars, { y: 0, scale: 1, rotateX: 0, duration: 0.4, stagger: { each: 0.02, from: 'random' }, ease: 'elastic.out(1, 0.5)' });
      gsap.to(logoElement.querySelector('#aiGradientStop1'), { stopColor: '#007CF0', duration: 0.4 });
      gsap.to(logoElement.querySelector('#aiGradientStop2'), { stopColor: '#9B59B6', duration: 0.4 });
    };
    logoElement.addEventListener('mouseenter', onMouseEnter);
    logoElement.addEventListener('mouseleave', onMouseLeave);
    return () => { logoElement.removeEventListener('mouseenter', onMouseEnter); logoElement.removeEventListener('mouseleave', onMouseLeave); tl.kill(); };
  }, []);

  return (
    <svg ref={logoContainerRef} width="300" height="70" viewBox="0 0 300 70" className="cursor-pointer drop-shadow-lg">
      <defs><linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop id="aiGradientStop1" offset="0%" style={{ stopColor: '#007CF0', stopOpacity: 1 }} /><stop id="aiGradientStop2" offset="100%" style={{ stopColor: '#9B59B6', stopOpacity: 1 }} /></linearGradient></defs>
      <text ref={optimaTextRef} x="0" y="45" fontFamily="'Inter', sans-serif" fontSize="48" fontWeight="bold" fill="#E0E0E0">{'Optima'.split('').map((char, i) => <tspan key={i}>{char}</tspan>)}</text>
      <text ref={aiTextRef} x="175" y="45" fontFamily="'Inter', sans-serif" fontSize="48" fontWeight="bold" fill="url(#aiGradient)">{'AI'.split('').map((char, i) => <tspan key={i}>{char}</tspan>)}</text>
    </svg>
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
        'Григорий Таловиков — CEO.',
        'Сергей Щербина — директор промт-инжиниринга и PR.',
        'Максим Пенкин — Технический директор'
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
        {title && <h2 className="text-3xl sm:text-4xl font-semibold text-sky-400">{title}</h2>}
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
        <div className="flex justify-center mb-6 sm:mb-10"><AnimatedLogo /></div>
        <div ref={animatedLineRef} className="h-px bg-white/70 w-full max-w-sm mx-auto mb-6 opacity-0"></div>
        <div ref={heroContentRef} className="text-center space-y-5 sm:space-y-7 relative">
          {/* Иконка Zap удалена */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400">{content.hero.title}</h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">{content.hero.p2}</p>
        </div>

        <div ref={addToSectionCardRefs} className="mission-section-custom flex flex-row items-center justify-center py-16 my-16 text-neutral-100 opacity-0">
          <h3 className="text-2xl sm:text-3xl font-semibold mr-4">{content.mission.title}</h3>
          <div className="w-24 sm:w-32 md:w-48 border-t border-white/75 mx-4"></div>
          <p className="text-lg sm:text-xl text-neutral-300 ml-4">Объединять людей и технологии.</p>
        </div>

        <p ref={valuesTextRef} className="text-lg sm:text-xl text-center text-neutral-300 max-w-2xl mx-auto mb-10 opacity-0">Наши ценности интегрированы в повседневную работу, формируют наш подход к людям, решениям и развитию.</p>
        
        <BookCards />
        
        <NewPrinciplesSection />

        <SectionCard ref={addToSectionCardRefs} icon={content.team.icon} title={content.team.title}>
          <ul className="list-none space-y-3 text-lg sm:text-xl text-neutral-300">
            {content.team.members.map((member, index) => (
              <li key={index} className="flex items-start"><Users size={16} className="text-sky-500/70 mr-3 mt-1.5 shrink-0" />{member}</li>
            ))}
          </ul>
        </SectionCard>
      </main>
    </div>
  );
};

export default AboutPage;
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Eye, Gem, Target, Users, GitFork, BookOpen, TrendingUp } from 'lucide-react';

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

  const addToSectionCardRefs = (el: HTMLElement | null) => { if (el && !sectionCardRefs.current.includes(el)) sectionCardRefs.current.push(el); };
  const addToValueCardRefs = (el: HTMLDivElement | null) => { if (el && !valueCardRefs.current.includes(el)) valueCardRefs.current.push(el); };

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.3, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    const initialTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
    if (heroContentRef.current) {
      const heroTitle = heroContentRef.current.querySelector('h1');
      const heroParagraphs = heroContentRef.current.querySelectorAll('p');
      // Иконка Zap удалена из Hero
      if (heroTitle) initialTl.fromTo(heroTitle, {opacity:0, y:40}, {opacity:1, y:0, delay: 0.5}, "-=0.5"); // Небольшая задержка после лого
      if (heroParagraphs.length > 0) initialTl.fromTo(heroParagraphs, {opacity:0, y:30}, {opacity:1, y:0, stagger:0.15}, "-=0.4");
    }

    // Общая функция для анимации карточек (Миссия, Команда)
    const animateSectionCard = (card: HTMLElement | null, index: number) => {
      if (!card) return; // Проверка на null
      const shouldAnimateScale = !card.classList.contains('no-scale-animation'); // Проверяем наличие класса
      
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
          scale: shouldAnimateScale ? 0.9 : 1, 
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
          scale: shouldAnimateScale ? 0.9 : 1, 
          rotationZ: rotationExit, 
          filter: 'blur(3px)', 
          ease: 'power2.inOut', 
          duration: 0.4 
        }, 
        0.6
      );
      
      const contentTl = gsap.timeline({ 
        scrollTrigger: { 
          trigger: card, 
          start: 'top center+=50px', 
          end: 'bottom center-=50px', 
          toggleActions: 'play reverse play reverse' 
        } 
      });
      
      const cardIcon = card.querySelector('.card-icon');
      const cardTitle = card.querySelector('h2');
      const cardContent = card.querySelectorAll('p, ul > li');
      
      if (cardIcon) {
        contentTl.fromTo(
          cardIcon, 
          {opacity:0, scale:0.5, rotate:-20}, 
          {opacity:1, scale:1, rotate:0, duration:0.5, ease:'back.out(1.2)'}, 
          0.1
        );
      }
      
      if (cardTitle) {
        contentTl.fromTo(
          cardTitle, 
          {opacity:0, x:-25}, 
          {opacity:1, x:0, duration:0.5, ease:'power2.out'}, 
          "-=0.35"
        );
      }
      
      if (cardContent.length > 0) {
        contentTl.fromTo(
          cardContent, 
          {opacity:0, y:15}, 
          {opacity:1, y:0, stagger:0.08, duration:0.4, ease:'power2.out'}, 
          "-=0.3"
        );
      }
    };
    
    // Применяем анимацию к секционным карточкам
    sectionCardRefs.current.forEach(animateSectionCard);

    // Анимация заголовка "Наши Принципы"
    if (principlesTitleRef.current) {
      gsap.fromTo(
        principlesTitleRef.current, 
        { opacity: 0, y: 50, scale: 0.9 }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          ease: 'expo.out', 
          scrollTrigger: { 
            trigger: principlesTitleRef.current, 
            start: 'top 85%', 
            toggleActions: 'play none none none' 
          }
        }
      );
    }

    // Анимация карточек ценностей (Гибкость, Открытость, Движение)
    valueCardRefs.current.forEach((card, index) => {
      if (card) {
        // Появление с небольшим каскадом и другим эффектом
        gsap.fromTo(
          card, 
          { opacity: 0, y: 60, x: (index - 1) * -30, scale: 0.85, rotationY: (index -1) * 15 }, // x и rotationY для расхождения
          { 
            opacity: 1, 
            y: 0, 
            x: 0, 
            scale: 1, 
            rotationY: 0,
            duration: 0.7 + index * 0.1, // Небольшая задержка для каскада
            ease: 'power3.out',
            scrollTrigger: { 
              trigger: card, // Триггер на саму карточку
              start: 'top 90%', 
              toggleActions: 'play none none none' 
            }
          }
        );
        
        // Анимация содержимого карточек ценностей
        const contentTl = gsap.timeline({ 
          scrollTrigger: { 
            trigger: card, 
            start: 'top 80%', 
            toggleActions: 'play none none none' 
          } 
        });
        
        const cardIcon = card.querySelector('.value-card-icon');
        const cardTitle = card.querySelector('h3');
        const cardContent = card.querySelector('p');
        
        if (cardIcon) {
          contentTl.fromTo(
            cardIcon, 
            {opacity:0, scale:0.5, y:-10}, 
            {opacity:1, scale:1, y:0, duration:0.5, ease:'back.out(1.4)'}, 
            0.2 + index * 0.1
          );
        }
        
        if (cardTitle) {
          contentTl.fromTo(
            cardTitle, 
            {opacity:0, y:10}, 
            {opacity:1, y:0, duration:0.5, ease:'power2.out'}, 
            "-=0.3"
          );
        }
        
        if (cardContent) {
          contentTl.fromTo(
            cardContent, 
            {opacity:0, y:10}, 
            {opacity:1, y:0, duration:0.5, ease:'power2.out'}, 
            "-=0.3"
          );
        }
      }
    });

    return () => { 
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); 
      lenis.destroy(); 
      initialTl.kill(); 
    };
  }, []);

  const content = {
    hero: { 
      title: 'Ближе к будущему', 
      p1: 'Мы — энтузиасты в сфере искусственного интеллекта.', 
      p2: 'Обучаем современным техникам промтинга, создаём AI‑решения, помогаем бизнесу и государственным структурам делать технологии доступнее людям.' 
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
        <div className="flex justify-center mb-12 sm:mb-16"><AnimatedLogo /></div>
        <div ref={heroContentRef} className="text-center space-y-5 sm:space-y-7 relative">
          {/* Иконка Zap удалена */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400">{content.hero.title}</h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">{content.hero.p1}</p>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">{content.hero.p2}</p>
        </div>

        <div ref={addToSectionCardRefs} className="mission-section-custom flex flex-row items-center justify-center py-10 my-10 text-neutral-100 opacity-0">
          <h3 className="text-2xl sm:text-3xl font-semibold mr-4">{content.mission.title}</h3>
          <div className="w-24 sm:w-32 md:w-48 border-t border-white/75 mx-4"></div>
          <p className="text-lg sm:text-xl text-neutral-300 ml-4">Объединять людей и технологии.</p>
        </div>

        {/* Новая секция "Наши Принципы" и карточки ценностей */}
        <div className="space-y-10">
          <h2 ref={principlesTitleRef} className="text-4xl sm:text-5xl font-bold tracking-tight text-center text-neutral-100">
            {content.principlesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {content.values.map((value, index) => (
              <ValueCard 
                key={value.id} 
                ref={addToValueCardRefs} 
                title={value.title} 
                text={value.text} 
                icon={value.icon} 
                className={value.id === 'flexibility' ? 'hover:border-emerald-400' : value.id === 'openness' ? 'hover:border-amber-400' : 'hover:border-rose-400'}
              />
            ))}
          </div>
        </div>

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
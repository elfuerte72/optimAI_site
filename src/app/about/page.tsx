'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Eye, Gem, Target, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

    tl.fromTo(
      optimaChars,
      { opacity: 0, y: 20, scale: 0.8, rotateX: -45 },
      { opacity: 1, y: 0, scale: 1, rotateX: 0, stagger: 0.07, duration: 0.6, delay: 0.3 }
    ).fromTo(
      aiChars,
      { opacity: 0, y: 20, scale: 0.8, rotateX: -45 },
      { opacity: 1, y: 0, scale: 1, rotateX: 0, stagger: 0.1, duration: 0.6 },
      "-=0.4"
    );

    const logoElement = logoContainerRef.current;
    const onMouseEnter = () => {
      gsap.to(allChars, {
        y: (i) => (i % 2 === 0 ? -3 : 3), scale: 1.05, rotateX: (i) => (i % 2 === 0 ? 5 : -5),
        duration: 0.3, stagger: { each: 0.03, from: 'random' }, ease: 'power2.inOut',
      });
      gsap.to(logoElement.querySelector('#aiGradientStop1'), { stopColor: '#FF00FF', duration: 0.4 });
      gsap.to(logoElement.querySelector('#aiGradientStop2'), { stopColor: '#00FFFF', duration: 0.4 });
    };
    const onMouseLeave = () => {
      gsap.to(allChars, {
        y: 0, scale: 1, rotateX: 0,
        duration: 0.4, stagger: { each: 0.02, from: 'random' }, ease: 'elastic.out(1, 0.5)',
      });
      gsap.to(logoElement.querySelector('#aiGradientStop1'), { stopColor: '#007CF0', duration: 0.4 });
      gsap.to(logoElement.querySelector('#aiGradientStop2'), { stopColor: '#9B59B6', duration: 0.4 });
    };
    logoElement.addEventListener('mouseenter', onMouseEnter);
    logoElement.addEventListener('mouseleave', onMouseLeave);
    return () => {
      logoElement.removeEventListener('mouseenter', onMouseEnter);
      logoElement.removeEventListener('mouseleave', onMouseLeave);
      tl.kill();
    };
  }, []);

  return (
    <svg ref={logoContainerRef} width="260" height="60" viewBox="0 0 260 60" className="cursor-pointer drop-shadow-lg">
      <defs>
        <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop id="aiGradientStop1" offset="0%" style={{ stopColor: '#007CF0', stopOpacity: 1 }} />
          <stop id="aiGradientStop2" offset="100%" style={{ stopColor: '#9B59B6', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <text ref={optimaTextRef} x="0" y="45" fontFamily="'Inter', sans-serif" fontSize="48" fontWeight="bold" fill="#E0E0E0">
        {'Optima'.split('').map((char, i) => <tspan key={i}>{char}</tspan>)}
      </text>
      <text ref={aiTextRef} x="175" y="45" fontFamily="'Inter', sans-serif" fontSize="48" fontWeight="bold" fill="url(#aiGradient)">
        {'AI'.split('').map((char, i) => <tspan key={i}>{char}</tspan>)}
      </text>
    </svg>
  );
};

const AboutPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const sectionCardRefs = useRef<Array<HTMLElement | null>>([]);

  const addToCardRefs = (el: HTMLElement | null) => {
    if (el && !sectionCardRefs.current.includes(el)) {
      sectionCardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.3, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    const initialTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
    if (heroContentRef.current) {
      const heroTitle = heroContentRef.current.querySelector('h1');
      const heroParagraphs = heroContentRef.current.querySelectorAll('p');
      const heroIcon = heroContentRef.current.querySelector('.hero-icon');
      if (heroIcon) initialTl.fromTo(heroIcon, {opacity:0, scale:0.5, rotate:-45}, {opacity:1, scale:1, rotate:0, duration:0.7}, "+=0.5");
      if (heroTitle) initialTl.fromTo(heroTitle, {opacity:0, y:40}, {opacity:1, y:0}, "-=0.5");
      if (heroParagraphs.length > 0) initialTl.fromTo(heroParagraphs, {opacity:0, y:30}, {opacity:1, y:0, stagger:0.15}, "-=0.4");
    }

    // Анимация карточек в стиле StackBlitz
    sectionCardRefs.current.forEach((card, index) => {
      if (card) {
        const cardScrubTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top bottom+=100px", // Начать чуть позже, когда карта входит во вьюпорт
            end: "bottom top-=100px",   // Закончить чуть раньше, когда карта покидает вьюпорт
            scrub: 0.3, // Плавное связывание с прокруткой
          }
        });

        // Определяем параметры анимации для параллакса и эффектов
        const yOffsetEnter = '25vh';
        const yOffsetExitBase = -25;
        // Небольшая вариация для параллакса между карточками
        const yOffsetExit = `${yOffsetExitBase - (index % 3) * 5}vh`; 
        const rotationEnter = (index % 2 === 0 ? 5 : -5);
        const rotationExit = (index % 2 === 0 ? -5 : 5);

        cardScrubTimeline
          .fromTo(card, 
            { // Начальное состояние (вход во вьюпорт)
              opacity: 0,
              y: yOffsetEnter,
              scale: 0.9,
              rotationZ: rotationEnter,
              filter: 'blur(3px)'
            },
            { // Состояние в середине (полностью видима)
              opacity: 1,
              y: '0vh',
              scale: 1,
              rotationZ: 0,
              filter: 'blur(0px)',
              ease: 'power2.inOut',
              duration: 0.6 // Относительная длительность этой части
            }, 0) // Начать в момент 0 таймлайна
          .to(card, 
            { // Конечное состояние (выход из вьюпорта)
              opacity: 0,
              y: yOffsetExit,
              scale: 0.9,
              rotationZ: rotationExit,
              filter: 'blur(3px)',
              ease: 'power2.inOut',
              duration: 0.4 // Относительная длительность этой части
            }, 0.6); // Начать в момент 0.6 таймлайна (после первой части)

        // Анимация содержимого карточки (запускается, когда карточка близка к центру)
        const contentTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top center+=50px',
            end: 'bottom center-=50px',
            toggleActions: 'play reverse play reverse',
          }
        });
        const cardIcon = card.querySelector('.card-icon');
        const cardTitle = card.querySelector('h2');
        const cardContent = card.querySelectorAll('p, ul > li');
        if (cardIcon) contentTl.fromTo(cardIcon, {opacity:0, scale:0.5, rotate:-20}, {opacity:1, scale:1, rotate:0, duration:0.5, ease:'back.out(1.2)'}, 0.1);
        if (cardTitle) contentTl.fromTo(cardTitle, {opacity:0, x:-25}, {opacity:1, x:0, duration:0.5, ease:'power2.out'}, "-=0.35");
        if (cardContent.length > 0) contentTl.fromTo(cardContent, {opacity:0, y:15}, {opacity:1, y:0, stagger:0.08, duration:0.4, ease:'power2.out'}, "-=0.3");
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
      initialTl.kill();
    };
  }, []);

 const content = { /* ... (контент остается тем же) ... */ 
    hero: {
      title: 'Optima AI - Ближе к будущему',
      p1: 'Мы — энтузиасты в сфере искусственного интеллекта.',
      p2: 'Обучаем современным техникам промтинга, создаём AI‑решения, помогаем бизнесу и государственным структурам делать технологии доступнее людям.',
    },
    mission: {
      title: 'Наша миссия',
      text: 'Объединять людей и технологии.',
      icon: <Target size={32} className="card-icon text-sky-400" />,
    },
    vision: {
      title: 'Наше видение',
      text: 'Занять лидирующую позицию в российском AI‑консалтинге и EdTech, оставаясь гибкими, открытыми и постоянно в движении.',
      icon: <Eye size={32} className="card-icon text-sky-400" />,
    },
    values: {
      title: 'Наши ценности',
      items: [
        'Гибкость — подстраиваемся под задачу клиента.',
        'Открытость — делимся знаниями и кодом.',
        'Движение — всегда держим руку на пульсе технологий.',
      ],
      icon: <Gem size={32} className="card-icon text-sky-400" />,
    },
    team: {
      title: 'Команда основателей',
      members: [
        'Григорий Таловиков — CEO.',
        'Сергей Щербина — директор промт-инжиниринга и PR.',
        'Максим Пенкин — Технический директор',
      ],
      icon: <Users size={32} className="card-icon text-sky-400" />,
    },
  };

  const Card: React.FC<{ children: React.ReactNode; className?: string, icon?: React.ReactNode, title?: string, ref?: React.Ref<HTMLElement> }> = React.forwardRef(({ children, className, icon, title }, ref) => (
    <section 
      ref={ref} 
      // Стили hover теперь будут менее важны, так как GSAP управляет opacity/transform при скролле
      // Но оставим их для случаев, когда скролл неактивен или для дополнительной интерактивности
      className={`group bg-neutral-800/70 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl border border-neutral-700/60 hover:border-sky-400/80 hover:shadow-sky-500/15 transition-all duration-300 ease-in-out hover:scale-[1.02]`}>
      <div className="flex items-start space-x-4 mb-5">
        {icon && <div className="mt-1 group-hover:scale-110 group-hover:rotate-[7deg] transition-transform duration-300 ease-out">{icon}</div>}
        {title && <h2 className="text-3xl sm:text-4xl font-semibold text-sky-400">{title}</h2>}
      </div>
      {children}
    </section>
  ));
  Card.displayName = 'Card';

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white flex flex-col items-center pt-16 sm:pt-24 pb-20 sm:pb-28 selection:bg-sky-600 selection:text-white overflow-x-hidden">
      <main className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        <div className="flex justify-center mb-12 sm:mb-16">
          <AnimatedLogo />
        </div>

        <div ref={heroContentRef} className="text-center space-y-5 sm:space-y-7 relative">
           <Zap size={48} className="hero-icon text-sky-500/70 absolute -top-10 left-1/2 -translate-x-1/2 opacity-0" style={{filter: 'blur(3px)'}}/>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400">
            {content.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
            {content.hero.p1}
          </p>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
            {content.hero.p2}
          </p>
        </div>

        {/* Карточки теперь будут анимироваться с помощью cardScrubTimeline */}
        <Card ref={addToCardRefs} icon={content.mission.icon} title={content.mission.title}>
          <p className="text-lg sm:text-xl text-neutral-300">
            {content.mission.text}
          </p>
        </Card>

        <Card ref={addToCardRefs} icon={content.vision.icon} title={content.vision.title}>
          <p className="text-lg sm:text-xl text-neutral-300">
            {content.vision.text}
          </p>
        </Card>

        <Card ref={addToCardRefs} icon={content.values.icon} title={content.values.title}>
          <ul className="list-none space-y-3 text-lg sm:text-xl text-neutral-300">
            {content.values.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <Gem size={16} className="text-sky-500/70 mr-3 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card ref={addToCardRefs} icon={content.team.icon} title={content.team.title}>
          <ul className="list-none space-y-3 text-lg sm:text-xl text-neutral-300">
            {content.team.members.map((member, index) => (
              <li key={index} className="flex items-start">
                <Users size={16} className="text-sky-500/70 mr-3 mt-1.5 shrink-0" />
                {member}
              </li>
            ))}
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default AboutPage;

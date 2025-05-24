'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Eye, Gem, Target, Users, Zap } from 'lucide-react'; // Added Zap for Hero

gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const sectionCardRefs = useRef<Array<HTMLElement | null>>([]);

  const addToCardRefs = (el: HTMLElement | null) => {
    if (el && !sectionCardRefs.current.includes(el)) {
      sectionCardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, delay: 0.1 }
      );
    }
    if (heroContentRef.current) {
      const heroTitle = heroContentRef.current.querySelector('h1');
      const heroParagraphs = heroContentRef.current.querySelectorAll('p');
      const heroIcon = heroContentRef.current.querySelector('.hero-icon');

      if (heroIcon) {
        tl.fromTo(heroIcon, {opacity: 0, scale: 0.5, rotate: -45}, {opacity:1, scale:1, rotate:0, duration: 0.7}, "-=0.7");
      }
      if (heroTitle) {
        tl.fromTo(heroTitle, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, '-=0.5');
      }
      if (heroParagraphs.length > 0) {
        tl.fromTo(heroParagraphs, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.15 }, '-=0.4');
      }
    }

    sectionCardRefs.current.forEach((card) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 70, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );

        const cardIcon = card.querySelector('.card-icon');
        const cardTitle = card.querySelector('h2');
        const cardContent = card.querySelectorAll('p, ul > li');

        if (cardIcon) {
          gsap.fromTo(cardIcon, 
            { opacity: 0, scale: 0.6, rotate: -30 }, 
            { 
              opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(1.7)',
              scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' }
            }
          );
        }
        if (cardTitle) {
          gsap.fromTo(cardTitle, 
            { opacity: 0, x: -40 }, 
            { 
              opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 78%', toggleActions: 'play none none none' }
            }
          );
        }
        if (cardContent.length > 0) {
          gsap.fromTo(cardContent, 
            { opacity: 0, y: 25 }, 
            { 
              opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 75%', toggleActions: 'play none none none' }
            }
          );
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
      tl.kill();
    };
  }, []);

  const content = {
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
      className={`group bg-neutral-850/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-xl border border-neutral-700/80 hover:border-sky-500/70 hover:shadow-sky-400/10 transition-all duration-300 ease-in-out transform hover:scale-[1.03] ${className || ''}`}>
      <div className="flex items-start space-x-4 mb-5">
        {icon && <div className="mt-1 group-hover:scale-110 group-hover:rotate-[5deg] transition-transform duration-300 ease-out">{icon}</div>}
        {title && <h2 className="text-3xl sm:text-4xl font-semibold text-sky-400">{title}</h2>}
      </div>
      {children}
    </section>
  ));
  Card.displayName = 'Card';

  return (
    <div ref={pageRef} className="min-h-screen bg-neutral-950 text-white flex flex-col items-center pt-20 sm:pt-28 pb-20 sm:pb-28 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <main className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        <div ref={logoRef} className="flex justify-center mb-10 sm:mb-14">
          <Image
            src="/images/logo-updated.png"
            alt="OptimAI Logo"
            width={230} 
            height={58} 
            priority
            className="drop-shadow-lg"
          />
        </div>

        <div ref={heroContentRef} className="text-center space-y-5 sm:space-y-7 relative">
           <Zap size={48} className="hero-icon text-sky-500/80 absolute -top-10 left-1/2 -translate-x-1/2 opacity-0" style={{filter: 'blur(2px)'}}/>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-400">
            {content.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
            {content.hero.p1}
          </p>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
            {content.hero.p2}
          </p>
        </div>

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

'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

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
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial page load animations
    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2 }
      );
    }
    if (heroContentRef.current) {
      const heroTitle = heroContentRef.current.querySelector('h1');
      const heroParagraphs = heroContentRef.current.querySelectorAll('p');
      if (heroTitle) {
        tl.fromTo(
          heroTitle,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        );
      }
      if (heroParagraphs.length > 0) {
        tl.fromTo(
          heroParagraphs,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.2 },
          '-=0.5'
        );
      }
    }

    // Scroll-triggered animations for section cards
    sectionCardRefs.current.forEach((card) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        const cardTitle = card.querySelector('h2');
        const cardContent = card.querySelectorAll('p, ul > li');

        if (cardTitle) {
          gsap.fromTo(
            cardTitle,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
        if (cardContent.length > 0) {
          gsap.fromTo(
            cardContent,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
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
    },
    vision: {
      title: 'Наше видение',
      text: 'Занять лидирующую позицию в российском AI‑консалтинге и EdTech, оставаясь гибкими, открытыми и постоянно в движении.',
    },
    values: {
      title: 'Наши ценности',
      items: [
        'Гибкость — подстраиваемся под задачу клиента.',
        'Открытость — делимся знаниями и кодом.',
        'Движение — всегда держим руку на пульсе технологий.',
      ],
    },
    team: {
      title: 'Команда основателей',
      members: [
        'Григорий Таловиков — CEO.',
        'Сергей Щербина — директор промт-инжиниринга и PR.',
        'Максим Пенкин — Технический директор',
      ],
    },
  };

  const Card: React.FC<{ children: React.ReactNode; className?: string, ref?: React.Ref<HTMLElement> }> = React.forwardRef(({ children, className }, ref) => (
    <section 
      ref={ref} 
      className={`bg-neutral-900 p-6 sm:p-8 rounded-xl shadow-lg border border-neutral-700/70 hover:border-sky-500/70 hover:shadow-sky-500/10 transition-all duration-300 ease-in-out transform hover:scale-[1.02] ${className || ''}`}>
      {children}
    </section>
  ));
  Card.displayName = 'Card';

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white flex flex-col items-center pt-20 sm:pt-28 pb-20 sm:pb-28 selection:bg-sky-600 selection:text-white">
      <main className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        <div ref={logoRef} className="flex justify-center mb-10 sm:mb-14">
          <Image
            src="/images/logo-updated.png" // Updated logo path
            alt="OptimAI Logo"
            width={220} // Adjusted size
            height={55} // Adjusted size
            priority
          />
        </div>

        <div ref={heroContentRef} className="text-center space-y-6 sm:space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            {content.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
            {content.hero.p1}
          </p>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
            {content.hero.p2}
          </p>
        </div>

        <Card ref={addToCardRefs}>
          <h2 className="text-3xl sm:text-4xl font-semibold text-sky-400 mb-4 sm:mb-6">
            {content.mission.title}
          </h2>
          <p className="text-lg sm:text-xl text-neutral-300">
            {content.mission.text}
          </p>
        </Card>

        <Card ref={addToCardRefs}>
          <h2 className="text-3xl sm:text-4xl font-semibold text-sky-400 mb-4 sm:mb-6">
            {content.vision.title}
          </h2>
          <p className="text-lg sm:text-xl text-neutral-300">
            {content.vision.text}
          </p>
        </Card>

        <Card ref={addToCardRefs}>
          <h2 className="text-3xl sm:text-4xl font-semibold text-sky-400 mb-4 sm:mb-6">
            {content.values.title}
          </h2>
          <ul className="list-none space-y-3 text-lg sm:text-xl text-neutral-300">
            {content.values.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-sky-400 mr-3 mt-1">◆</span> {/* Diamond bullet point */}
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card ref={addToCardRefs}>
          <h2 className="text-3xl sm:text-4xl font-semibold text-sky-400 mb-4 sm:mb-6">
            {content.team.title}
          </h2>
          <ul className="list-none space-y-3 text-lg sm:text-xl text-neutral-300">
            {content.team.members.map((member, index) => (
              <li key={index} className="flex items-start">
                <span className="text-sky-400 mr-3 mt-1">●</span> {/* Circle bullet point */}
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

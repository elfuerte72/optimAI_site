'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';
import { Target, Users, GitFork, BookOpen, TrendingUp } from 'lucide-react';
import { BookCards, FlipCard, FlipCardStyles, AnimatedText } from '@features/about';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@shared/ui';
import { pacificoFont, robotoCondensedFont } from '@shared/lib';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Кастомный LogoAnimation с обрезанным изображением для страницы "О нас"
const CompactLogoAnimation = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isMobile) {
      interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 3000);
      }, 8000);
    }

    return () => clearInterval(interval);
  }, [isMobile]);

  const shouldAnimate = isLogoHovered || isAnimating;

  return (
    <motion.div
      className="relative isolate mb-0"
      onHoverStart={() => !isMobile && setIsLogoHovered(true)}
      onHoverEnd={() => !isMobile && setIsLogoHovered(false)}
    >
      {/* Основной логотип с обрезкой снизу */}
      <div className="relative overflow-hidden" style={{ height: '70px' }}>
        <Image
          src="/images/logo-updated.png"
          alt="OptimaAI Logo"
          width={288}
          height={96}
          priority
          className="relative z-10"
          style={{ marginTop: '-13px' }}
        />
      </div>

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
              ease: 'easeInOut',
              times: [0, 0.25, 0.5, 0.75, 1],
              repeat: isMobile ? 1 : 0,
            }}
          />
        )}
      </AnimatePresence>

      {/* Внутреннее свечение */}
      <AnimatePresence>
        {shouldAnimate && (
          <motion.div
            className="absolute inset-0 z-1 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 blur-md"
            style={{
              mixBlendMode: 'screen',
              transform: 'translateY(2px) scale(0.98)',
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0.6, 0.8, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
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
                  width: '70px',
                  top: '50%',
                  left: '50%',
                  transformOrigin: 'left center',
                  rotate: `${angle}deg`,
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 0.8, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.05,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};



const ClientAboutPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const _principlesTitleRef = useRef<HTMLHeadingElement>(null);
  const sectionCardRefs = useRef<Array<HTMLElement | null>>([]);
  const valueCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const valuesTextRef = useRef<HTMLParagraphElement>(null);
  const animatedLineRef = useRef<HTMLDivElement>(null);
  const valuesTitleRef = useRef<HTMLDivElement>(null);

  const addToSectionCardRefs = (el: HTMLElement | null) => {
    if (el && !sectionCardRefs.current.includes(el)) sectionCardRefs.current.push(el);
  };
  const _addToValueCardRefs = (el: HTMLDivElement | null) => {
    if (el && !valueCardRefs.current.includes(el)) valueCardRefs.current.push(el);
  };

  // Функция для плавного скролла
  const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

  // Общая функция для анимации карточек (Миссия, Команда)
  const animateSectionCard = (card: HTMLElement | null, index: number) => {
    if (!card) return;

    const cardScrubTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top bottom+=100px',
        end: 'bottom top-=100px',
        scrub: 0.3,
      },
    });

    const yOffsetEnter = '25vh';
    const yOffsetExitBase = -25;
    const yOffsetExit = `${yOffsetExitBase - (index % 2) * 10}vh`;
    const rotationEnter = index % 2 === 0 ? 5 : -5;
    const rotationExit = index % 2 === 0 ? -5 : 5;

    cardScrubTimeline
      .fromTo(
        card,
        {
          opacity: 0,
          y: yOffsetEnter,
          scale: 0.9,
          rotationZ: rotationEnter,
          filter: 'blur(3px)',
        },
        {
          opacity: 1,
          y: '0vh',
          scale: 1,
          rotationZ: 0,
          filter: 'blur(0px)',
          ease: 'power2.inOut',
          duration: 0.6,
        },
        0
      )
      .to(
        card,
        {
          opacity: 0,
          y: yOffsetExit,
          scale: 0.9,
          rotationZ: rotationExit,
          filter: 'blur(3px)',
          ease: 'power2.inOut',
          duration: 0.4,
        },
        0.6
      );
  };

  // Специальная функция для анимации секции "Наша миссия"
  const animateMissionSection = () => {
    const missionSection = document.querySelector('.mission-section-custom');
    if (!missionSection) {
      console.error('Не найдена секция миссии');
      return;
    }

    const missionCard = missionSection.querySelector('.mission-card');

    if (!missionCard) {
      console.error('Не найдена карточка миссии');
      return;
    }

    gsap.set(missionSection, { opacity: 1 });
    gsap.set(missionCard, { opacity: 0, y: 40, scale: 0.95 });

    const missionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: missionSection,
        start: 'top bottom-=100px',
        end: 'bottom top+=100px',
        toggleActions: 'play none none reverse',
        markers: false,
      },
    });

    missionTimeline.to(
      missionCard,
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
      1.2
    );
  };

  useEffect(() => {
    if (!pageRef.current) return;

    const lenis = new Lenis({ duration: 1.3, easing, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.set(sectionCardRefs.current, { opacity: 0, y: 50, scale: 0.9 });

    const missionSection = document.querySelector('.mission-section-custom');
    if (missionSection) {
      sectionCardRefs.current = sectionCardRefs.current.filter(
        (card) => card !== missionSection && !card?.classList.contains('mission-text-container')
      );
    }

    sectionCardRefs.current.forEach(animateSectionCard);

    setTimeout(() => {
      animateMissionSection();
    }, 100);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    if (!pageRef.current) return;

    if (heroContentRef.current) {
      const heroTitle = heroContentRef.current.querySelector('h1');
      const heroParagraphs = heroContentRef.current.querySelectorAll('p');

      if (heroTitle) {
        gsap.fromTo(
          heroTitle,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
        );
      }

      if (heroParagraphs.length > 0) {
        gsap.fromTo(
          heroParagraphs,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, delay: 0.5, ease: 'power3.out' }
        );
      }
    }

    if (animatedLineRef.current) {
      gsap.fromTo(
        animatedLineRef.current,
        { width: '0%', opacity: 0 },
        { width: '100%', opacity: 1, duration: 1.2, ease: 'power3.inOut', delay: 0.5 }
      );
    }

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
            toggleActions: 'play none none none',
          },
        }
      );
    }
  });

  const content = {
    hero: {
      title: 'Ближе к будущему',
      p2: 'OptimAI был основан в 2023 году с целью развития AI-решений и продуктов в России. С тех пор мы сфокусировались на упрощении внедрения технологий искусственного интеллекта в бизнес-процессы и повседневную жизнь людей.',
    },
    mission: {
      title: 'Наша миссия',
      text: 'Объединять людей и технологии.',
      icon: <Target size={32} className="card-icon text-sky-400" />,
    },
    principlesTitle: 'Наши Принципы',
    values: [
      {
        id: 'flexibility',
        title: 'Гибкость',
        text: '',
        icon: <GitFork size={28} className="value-card-icon text-emerald-400" />,
      },
      {
        id: 'openness',
        title: 'Открытость',
        text: '',
        icon: <BookOpen size={28} className="value-card-icon text-amber-400" />,
      },
      {
        id: 'movement',
        title: 'Движение',
        text: '',
        icon: <TrendingUp size={28} className="value-card-icon text-rose-400" />,
      },
    ],
    team: {
      title: 'Команда основателей',
      members: [
        { name: 'Григорий Таловиков', position: 'CEO', image: '/images/2025-05-26 15.13.35.jpg' },
        {
          name: 'Сергей Щербина',
          position: 'директор промт-инжиниринга и PR',
          image: '/images/2025-05-26 15.13.44.jpg',
        },
        {
          name: 'Максим Пенкин',
          position: 'Технический директор',
          image: '/images/2025-05-26 15.13.54.jpg',
        },
      ],
      icon: <Users size={32} className="card-icon text-sky-400" />,
    },
  };

  interface SectionCardProps {
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    title?: string;
  }

  const SectionCard = React.forwardRef<HTMLElement, SectionCardProps>(
    ({ children, className, icon, title }, ref) => (
      <section
        ref={ref}
        className={`group rounded-xl border border-neutral-700/60 bg-neutral-800 p-6 shadow-xl transition-colors duration-300 ease-in-out hover:scale-[1.02] hover:border-sky-400/80 hover:shadow-sky-500/15 sm:p-8 ${className || ''}`}
      >
        <div className="mb-5 flex items-start space-x-4">
          {icon && (
            <div className="mt-1 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[7deg]">
              {icon}
            </div>
          )}
          {title && (
            <h2 className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
              {title}
            </h2>
          )}
        </div>
        {children}
      </section>
    )
  );
  SectionCard.displayName = 'SectionCard';

  return (
    <div
      ref={pageRef}
      className="flex min-h-screen flex-col overflow-x-hidden bg-black text-white selection:bg-sky-600 selection:text-white"
    >
      <Navbar />
      <main className="mx-auto w-full max-w-3xl space-y-16 px-4 pt-16 pb-20 sm:space-y-24 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
        <div ref={heroContentRef} className="relative space-y-0 text-center">
          <div className="flex flex-col items-center justify-center">
            <CompactLogoAnimation />
            <motion.h2
              className={`bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-xl leading-relaxed font-thin tracking-tight text-transparent sm:text-2xl lg:text-3xl ${pacificoFont.className} mt-0 py-0 text-center w-full -ml-4`}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
            >
              {content.hero.title.split('').map((char, i) => (
                <motion.span
                  key={`title-${i}`}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>
          </div>
        </div>

        <div
          ref={addToSectionCardRefs}
          className="mission-section-custom my-12 flex flex-col items-center py-12 opacity-0"
        >
          <div className="mission-text-container mb-6 overflow-hidden">
            <AnimatedText
              text="Мы — энтузиасты в сфере искусственного интеллекта"
              className="mx-auto max-w-2xl text-center"
              fontSize="text-lg"
              fontWeight="font-light"
              textColor="text-[#F5F5F5]"
              delay={0.2}
              staggerDelay={0.04}
            />
          </div>

          <div className="mission-card relative w-full max-w-md transform rounded-xl border border-[#FFFFFF15] bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-5 shadow-2xl transition-all duration-300 ease-in-out hover:scale-105">
            <div className="flex h-full flex-col text-center">
              <div className="flex flex-1 flex-col justify-center">
                <h3 className="mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-xl font-medium text-transparent">
                  {content.mission.title}
                </h3>
                <p className="text-lg leading-relaxed font-light text-[#F5F5F5]">
                  Объединять людей и технологии.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div ref={valuesTitleRef} className="values-title-container mb-0">
          <motion.h2
            className={`bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-2xl leading-none font-bold tracking-tight text-transparent sm:text-3xl ${pacificoFont.className} mb-0 text-center`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6, margin: '-100px 0px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
            }}
          >
            {'Наши Ценности'.split('').map((char, i) => (
              <motion.span
                key={`values-title-${i}`}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <BookCards />

        <div className="mt-2 flex flex-col items-center">
          <div className="mx-auto mb-4 h-[0.5px] w-full max-w-sm bg-white/50 opacity-70"></div>
          <p
            ref={valuesTextRef}
            className="mx-auto mb-10 max-w-2xl text-center text-lg text-neutral-300 opacity-0 sm:text-xl"
          >
            Наши ценности интегрированы в повседневную работу, формируют наш подход к людям,
            решениям и развитию.
          </p>
        </div>

        <SectionCard
          ref={addToSectionCardRefs}
          icon={content.team.icon}
          title={content.team.title}
          className="hover:border-indigo-400/80 hover:shadow-indigo-500/15"
        >
          <FlipCardStyles>
            <div className="mt-6 grid">
              {content.team.members.map((member, index) => (
                <div key={index}>
                  <FlipCard name={member.name} position={member.position} image={member.image} />
                </div>
              ))}
            </div>
          </FlipCardStyles>
        </SectionCard>
      </main>
    </div>
  );
};

export default ClientAboutPage;
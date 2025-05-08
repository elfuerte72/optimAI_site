'use client';

import { useEffect, memo, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';

// Types
interface FormatDetail {
  title: string;
  audience: string;
  duration?: string;
  description: string;
}

// Card component with hover animation and gradient border
const FormatCard = memo(({ format, index }: { format: FormatDetail; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  
  return (
    <m.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: 'spring',
            damping: 25,
            stiffness: 120,
            delay: index * 0.15
          }
        }
      }}
      className="relative p-[1px] rounded-xl overflow-hidden group"
    >
      {/* Gradient border animation */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(45deg, rgba(0,255,255,0.15), rgba(138,43,226,0.15))`,
          filter: 'blur(1px)',
          willChange: 'opacity'
        }}
      />
      
      <div className="relative bg-black/80 backdrop-blur-sm dark:bg-gray-900/20 rounded-xl p-6 sm:p-8 h-full z-10">
        <div className="flex flex-col h-full">
          <h3 className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            {format.title}
          </h3>
          
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Аудитория:</span>
              <span className="text-white">{format.audience}</span>
            </div>
            
            {format.duration && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Продолжительность:</span>
                <span className="text-white">{format.duration}</span>
              </div>
            )}
            
            <div className="mt-3">
              <p className="text-gray-300 text-sm leading-relaxed">
                {format.description}
              </p>
            </div>
          </div>
          
          <m.div 
            className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button 
              className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 transition-colors rounded-md text-gray-100 border border-white/10"
            >
              Узнать больше
            </button>
          </m.div>
        </div>
      </div>
    </m.div>
  );
});

FormatCard.displayName = 'FormatCard';

// Decorative component for visual effect
const Dots = () => (
  <div className="absolute inset-0 pointer-events-none opacity-30" style={{ zIndex: 0 }}>
    <div className="absolute h-full w-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
  </div>
);

// Animated heading component with line reveal effect
const AnimatedHeading = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <h1 
      ref={ref}
      className="relative text-3xl md:text-5xl font-bold text-center mb-4 overflow-hidden py-8"
    >
      <div
        className="relative z-10"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.9s ease-out, transform 0.9s ease-out'
        }}
      >
        {children}
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-cyan-400/60 to-purple-500/60"
        style={{
          width: isInView ? '100%' : 0,
          transition: 'width 1s cubic-bezier(0.17, 0.67, 0.83, 0.67) 0.2s'
        }}
      />
    </h1>
  );
};

export default function AcademyAlternative() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  useEffect(() => {
    document.title = "Академия — OptimaAI";
    
    // Add meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Обучение работе с искусственным интеллектом от OptimaAI — эффективный промптинг и метапромптинг для решения бизнес-задач');
    }
  }, []);

  // Course formats data
  const formats: FormatDetail[] = [
    {
      title: 'Промптинг (базовый)',
      audience: 'Для новичков',
      duration: '4–6 часов',
      description: 'Работа с языковыми моделями, экономия времени на задачах, повышение эффективности'
    },
    {
      title: 'Метапромптинг (продвинутый)',
      audience: 'Для уверенных пользователей',
      description: 'Работа с цепочками запросов, логикой, мультимодальностью. Реальные кейсы участников'
    }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <div ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden">
        <Navbar />
        <Dots />
        
        {/* Background gradient */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-50 z-0">
          <div className="absolute top-[-50%] left-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-900/20 blur-[120px]" />
          <div className="absolute bottom-[-30%] right-[-5%] w-[60%] h-[60%] rounded-full bg-cyan-900/20 blur-[100px]" />
        </div>
        
        <main className="relative z-10 pt-28 px-4 max-w-5xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-20"
            style={{ y: parallaxY }}
          >
            <motion.div 
              className="inline-block mb-6 px-5 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-cyan-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Академия OptimaAI
            </motion.div>
            
            <AnimatedHeading>
              Обучение, которое делает взаимодействие с ИИ осознанным и результативным
            </AnimatedHeading>
            
            <motion.p
              className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Получите навыки эффективного использования нейросетей для решения задач и экономии времени
            </motion.p>
          </motion.div>

          {/* Course Formats Section */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formats.map((format, index) => (
                <FormatCard key={index} format={format} index={index} />
              ))}
            </div>
          </section>

          {/* Pricing Section with 3D card effect */}
          <motion.section 
            className="relative max-w-2xl mx-auto mb-20 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              type: 'spring',
              damping: 20,
              stiffness: 100,
              delay: 0.2
            }}
          >
            <div 
              className="relative p-[1px] rounded-xl overflow-hidden"
            >
              {/* Gradient border */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, rgba(0,255,255,0.2), rgba(138,43,226,0.2))`,
                  borderRadius: 'inherit',
                }}
              />
              
              <div className="relative p-8 sm:p-10 md:px-16 bg-black/80 backdrop-blur-md rounded-xl text-center">
                <h2 className="text-2xl font-semibold mb-6">Стоимость</h2>
                
                <div className="mb-8">
                  <p className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    от 20 000 ₽/чел.
                  </p>
                  
                  <p className="mt-4 text-gray-400 max-w-md mx-auto">
                    Индивидуальные условия — при работе с группами от 5 человек.
                  </p>
                </div>
                
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 rounded-md text-white font-medium transition-all duration-300">
                  Связаться с нами
                </button>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </LazyMotion>
  );
}
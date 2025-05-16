'use client';

import { useEffect, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { LazyMotion, domAnimation } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '@/components/layout/Navbar';

// Типы для форматов обучения
interface FormatDetail {
  title: string;
  audience: string;
  duration?: string;
  description: string;
}

// Оптимизированный компонент для форматов обучения
const FormatCard = memo(({ format, index }: { format: FormatDetail; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' });
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.li 
      ref={ref}
      className="border border-gray-800 rounded-lg p-6 transition-all hover:border-gray-700 will-change-transform"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-white">{format.title}</h2>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Аудитория</h3>
            <p className="text-white text-sm">{format.audience}</p>
          </div>
          
          {format.duration && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">Продолжительность</h3>
              <p className="text-white text-sm">{format.duration}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Содержание</h3>
            <p className="text-white text-sm">{format.description}</p>
          </div>
        </div>
      </div>
    </motion.li>
  );
});

FormatCard.displayName = 'FormatCard';

export default function Academy() {
  // Данные о форматах обучения
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
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <main className="flex flex-col pt-24 px-6 max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-center mb-16 mt-8 tracking-[-0.02em] will-change-[opacity,transform]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: 'spring',
              damping: 20,
              stiffness: 100
            }}
          >
            Обучение, которое делает взаимодействие с ИИ осознанным и результативным
          </motion.h1>

          {/* Formats Section */}
          <section className="mb-16">
            <ul className="space-y-8">
              {formats.map((format, index) => (
                <FormatCard 
                  key={index} 
                  format={format} 
                  index={index} 
                />
              ))}
            </ul>
          </section>

          {/* Pricing Section */}
          <motion.section 
            className="border-t border-gray-800 pt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ 
              type: 'spring',
              damping: 20,
              stiffness: 100
            }}
          >
            <motion.h2 
              className="text-xl font-medium mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: 'spring',
                damping: 20,
                stiffness: 100,
                delay: 0.1
              }}
            >
              Стоимость
            </motion.h2>
            <motion.p 
              className="text-2xl font-semibold mb-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: 'spring',
                damping: 20,
                stiffness: 100,
                delay: 0.2 
              }}
            >
              от 20 000 ₽/чел.
            </motion.p>
            <motion.p 
              className="text-gray-400 text-sm max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: 'spring',
                damping: 20,
                stiffness: 100,
                delay: 0.3 
              }}
            >
              Индивидуальные условия — при работе с группами от 5 человек.
            </motion.p>
          </motion.section>
        </main>
      </div>
    </LazyMotion>
  );
}
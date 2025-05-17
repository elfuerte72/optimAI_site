'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FeatureCardProps = {
  title: string;
  description: string;
  index: number;
};

export default function FeatureCard({ title, description, index }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Определяем, является ли устройство мобильным
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // На мобильных устройствах периодически активируем свечение
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setShouldAnimate(true);
        setTimeout(() => setShouldAnimate(false), 2000);
      }, 10000 + index * 2000); // Разные интервалы для разных карточек
      
      return () => clearInterval(interval);
    }
  }, [isMobile, index]);

  const glowActive = isHovered || shouldAnimate;

  return (
    <motion.div
      className="relative bg-neutral-900 p-6 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
    >
      {/* Эффекты свечения */}
      <AnimatePresence>
        {glowActive && (
          <>
            {/* Внешнее свечение */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-indigo-500/10 blur-lg pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.4, 0.2, 0.4, 0], 
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            />
            
            {/* Тонкий контурный подсвет */}
            <motion.div
              className="absolute inset-0 -z-5 rounded-lg border border-white/10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Свечение для заголовка */}
            <motion.div
              className="absolute top-6 left-6 w-24 h-8 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-md pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0.3, 0.5, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 2.2, 
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Контент карточки */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

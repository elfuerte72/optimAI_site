'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ServiceCardProps = {
  title: string;
  icon: React.ReactNode;
  details: string[];
  id: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  index: number;
};

export default function ServiceCard({
  title,
  icon,
  details,
  id,
  isExpanded,
  onToggle,
  index,
}: ServiceCardProps) {
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

  // На мобильных устройствах можем периодически активировать свечение
  useEffect(() => {
    if (isMobile && !isHovered) {
      const interval = setInterval(() => {
        setShouldAnimate(true);
        setTimeout(() => setShouldAnimate(false), 2000);
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [isMobile, isHovered]);

  const glowActive = isHovered || shouldAnimate;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg bg-zinc-900 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
    >
      {/* Эффект свечения */}
      <AnimatePresence>
        {glowActive && (
          <>
            {/* Внешнее свечение */}
            <motion.div
              className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 blur-xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.5, 0.3, 0.5, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            />

            {/* Тонкий контурный подсвет */}
            <motion.div
              className="pointer-events-none absolute inset-0 -z-5 rounded-lg border border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Свечение иконки */}
            <motion.div
              className="pointer-events-none absolute top-8 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.7, 0.5, 0.7, 0],
                scale: [0.8, 1.2, 1.1, 1.2, 0.8],
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 2.2,
                ease: 'easeInOut',
                times: [0, 0.25, 0.5, 0.75, 1],
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Контент карточки */}
      <div className="relative z-10 flex h-full flex-col p-8">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 transition-all duration-300 group-hover:bg-zinc-700">
            {icon}
          </div>
        </div>

        <h3 className="mb-6 text-center text-2xl font-medium text-white">{title}</h3>

        <button
          onClick={() => onToggle(id)}
          className="mt-auto self-center rounded border border-white/70 px-6 py-3 text-sm text-white transition-all duration-300 hover:bg-white/10 focus:ring-2 focus:ring-white/30 focus:outline-none"
          aria-expanded={isExpanded}
          aria-controls={`details-${id}`}
        >
          {isExpanded ? 'Скрыть' : 'Подробнее'}
        </button>

        <motion.div
          id={`details-${id}`}
          className="mt-4 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <ul className="py-4">
            {details.map((detail, i) => (
              <li key={i} className="relative py-2 pl-6 text-base text-gray-300">
                <span className="absolute top-2.5 left-0 text-white">•</span>
                {detail}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

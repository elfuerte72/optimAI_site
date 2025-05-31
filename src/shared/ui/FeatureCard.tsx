'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  category: string;
  detailsText?: string;
  index: number;
};

export default function FeatureCard({
  title,
  description,
  icon,
  category,
  detailsText = 'Подробнее',
  index,
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(
        () => {
          setShouldAnimate(true);
          setTimeout(() => setShouldAnimate(false), 2000);
        },
        10000 + index * 2000
      );
      return () => clearInterval(interval);
    }
  }, [isMobile, index]);

  const glowActive = isHovered || shouldAnimate;

  return (
    <motion.div
      className="relative transform rounded-lg border border-zinc-700 bg-zinc-800/70 p-6 shadow-lg backdrop-blur-md backdrop-filter transition-all duration-300 hover:scale-105 hover:border-zinc-600"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
    >
      {/* Эффекты свечения (оставлены без изменений по цвету, можно будет настроить позже) */}
      <AnimatePresence>
        {glowActive && (
          <>
            <motion.div
              className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-indigo-500/10 blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.2, 0.4, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.75, 1] }}
            />
            <motion.div
              className="pointer-events-none absolute inset-0 -z-5 rounded-lg border border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="pointer-events-none absolute top-6 left-6 h-8 w-24 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.3, 0.5, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.75, 1] }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Контейнер для иконки */}
      <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-zinc-700">
        {icon}
      </div>

      {/* Контент карточки */}
      <div className="relative z-10">
        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="mb-4 text-sm text-zinc-300">{description}</p>
        <div className="mt-auto flex items-center justify-between border-t border-zinc-700/50 pt-4">
          <span className="text-sm text-zinc-400">{category}</span>
          <span className="cursor-pointer text-sm font-medium text-sky-400 hover:text-sky-300">
            {detailsText}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
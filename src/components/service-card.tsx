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
      className="relative group overflow-hidden rounded-lg bg-zinc-900 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-[1.02] hover:-translate-y-1"
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
              className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 blur-xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0.3, 0.5, 0], 
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
              className="absolute inset-0 -z-5 rounded-lg border border-white/20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Свечение иконки */}
            <motion.div
              className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-md pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.7, 0.5, 0.7, 0],
                scale: [0.8, 1.2, 1.1, 1.2, 0.8],
              }}
              exit={{ opacity: 0, scale: 0.8 }}
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
      <div className="flex h-full flex-col p-8 relative z-10">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 transition-all duration-300 group-hover:bg-zinc-700">
            {icon}
          </div>
        </div>

        <h3 className="mb-6 text-center text-2xl font-medium text-white">{title}</h3>

        <button
          onClick={() => onToggle(id)}
          className="mt-auto self-center rounded border border-white/70 px-6 py-3 text-sm text-white transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-expanded={isExpanded}
          aria-controls={`details-${id}`}
        >
          {isExpanded ? "Скрыть" : "Подробнее"}
        </button>

        <motion.div
          id={`details-${id}`}
          className="mt-4 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <ul className="py-4">
            {details.map((detail, i) => (
              <li key={i} className="relative pl-6 py-2 text-gray-300 text-sm">
                <span className="absolute left-0 top-2.5 text-white">•</span>
                {detail}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

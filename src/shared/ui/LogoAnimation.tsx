'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const LogoAnimation = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Определяем, является ли устройство мобильным при монтировании и при изменении размера окна
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // На мобильных устройствах активируем анимацию периодически
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isMobile) {
      interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 3000); // Анимация длится 3 секунды
      }, 8000); // Запускать каждые 8 секунд
    }

    return () => clearInterval(interval);
  }, [isMobile]);

  // Объединяем состояния hover для десктопа и автоматической анимации для мобильных
  const shouldAnimate = isLogoHovered || isAnimating;

  return (
    <motion.div
      className="relative isolate mb-8"
      onHoverStart={() => !isMobile && setIsLogoHovered(true)}
      onHoverEnd={() => !isMobile && setIsLogoHovered(false)}
    >
      {/* Основной логотип */}
      <Image
        src="/images/logo-updated.png"
        alt="OptimaAI Logo"
        width={288}
        height={96}
        priority
        className="relative z-10"
      />

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

      {/* Внутреннее свечение - более интенсивное */}
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

export default LogoAnimation;
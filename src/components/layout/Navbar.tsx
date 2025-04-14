'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Компонент навигационной панели в стиле Apple
const Navbar = () => {
  const [activeLink, setActiveLink] = useState('/');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Обновляем активную ссылку при изменении пути
    setActiveLink(window.location.pathname);

    // Отслеживаем скролл для изменения стиля навигации
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md' 
          : 'bg-black'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Специальная кнопка с особым hover-эффектом */}
        <div className="relative">
          <Link href="/educate" className="group block">
            <span 
              className="text-sm font-bold tracking-tight transition-colors duration-300 text-white group-hover:luminous-aurora-text relative inline-block"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              OptimaAI Educate
              
              {/* Уникальный hover-эффект */}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 luminous-aurora-gradient group-hover:w-full transition-all duration-500 ease-in-out delay-100" />
              <span className="absolute -top-1 right-0 w-0 h-0.5 luminous-aurora-gradient group-hover:w-full transition-all duration-500 ease-in-out delay-100" />
              
              {/* Пульсирующий эффект */}
              <span className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-20 luminous-aurora-gradient blur-sm group-hover:animate-pulse transition-opacity duration-500" />
            </span>
          </Link>
        </div>

        {/* Центрированные навигационные ссылки */}
        <nav className="flex gap-6 absolute left-1/2 transform -translate-x-1/2">
          {[
            { path: '/', name: 'Главная' },
            { path: '/services', name: 'Услуги' },
            { path: '/about', name: 'О нас' },
            { path: '/partners', name: 'Наши партнеры' }
          ].map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className="relative group"
            >
              <span 
                className={`text-sm font-medium tracking-tight transition-colors duration-300 ${
                  activeLink === link.path 
                    ? 'luminous-aurora-text font-semibold' 
                    : 'text-white hover:luminous-aurora-text'
                }`}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {link.name}
              </span>
              
              {/* Подсветка текущей страницы */}
              {activeLink === link.path && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 luminous-aurora-gradient rounded-full" 
                />
              )}
              
              {/* Эффект при наведении */}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 luminous-aurora-gradient rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
            </Link>
          ))}
        </nav>
        
        {/* Пустой блок для сохранения выравнивания */}
        <div className="w-[140px]"></div>
      </div>
    </header>
  );
};

export default Navbar;

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
        {/* Пустой блок вместо логотипа */}
        <div></div>

        {/* Навигационные ссылки */}
        <nav className="flex gap-8">
          {[
            { path: '/', name: 'Главная' },
            { path: '/services', name: 'Услуги' }
          ].map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className="relative group"
            >
              <span 
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeLink === link.path ? 'luminous-aurora-text' : 'text-white hover:luminous-aurora-text'
                }`}
              >
                {link.name}
              </span>
              
              {/* Подсветка текущей страницы */}
              {activeLink === link.path && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 luminous-aurora-gradient" 
                />
              )}
              
              {/* Эффект при наведении */}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 luminous-aurora-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

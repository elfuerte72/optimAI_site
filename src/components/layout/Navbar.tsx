'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Компонент навигационной панели в стиле Apple
const Navbar = () => {
  const [activeLink, setActiveLink] = useState('/');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Обновляем активную ссылку при изменении пути
    setActiveLink(window.location.pathname);

    // Отслеживаем скролл для изменения стиля навигации
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Закрыть меню при нажатии клавиши Escape
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleEscKey);
    
    // Заблокировать прокрутку тела при открытом меню
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/', name: 'Главная' },
    { path: '/services', name: 'Услуги' },
    { path: '/about', name: 'О нас' },
    { path: '/partners', name: 'Наши партнеры' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-md' 
            : 'bg-black'
        }`}
      >
        <div className="flex items-center px-6 py-4">
          {/* Кнопка переключения меню */}
          <button 
            className="relative z-50 w-10 h-10 flex items-center justify-center focus:outline-none" 
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <div className="flex flex-col justify-center items-center w-6 h-6 relative">
              {/* Верхняя полоса */}
              <span 
                className={`hamburger-line block absolute h-0.5 w-full bg-white ${
                  isMenuOpen ? 'rotate-45 top-2.5' : 'top-1'
                }`}
              />
              
              {/* Средняя полоса */}
              <span 
                className={`hamburger-line block absolute h-0.5 w-full bg-white ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              
              {/* Нижняя полоса */}
              <span 
                className={`hamburger-line block absolute h-0.5 w-full bg-white ${
                  isMenuOpen ? '-rotate-45 top-2.5' : 'top-4'
                }`}
              />
            </div>
          </button>
        </div>
      </header>
      
      {/* Боковое навигационное меню (в стиле OpenAI) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Затемнение фона */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Выдвигающееся меню */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed left-0 top-0 bottom-0 w-64 md:w-80 bg-black z-40 flex flex-col pt-24 px-6"
            >
              <nav className="flex flex-col gap-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <Link 
                      href={link.path}
                      className="relative group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span 
                        className={`text-xl font-medium tracking-tight text-white nav-link-hover ${
                          activeLink === link.path ? 'font-semibold' : ''
                        }`}
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {link.name}
                      </span>
                      
                      {/* Подсветка текущей страницы */}
                      {activeLink === link.path && (
                        <motion.span 
                          layoutId="sidebar-indicator"
                          className="absolute -left-3 top-1/2 -translate-y-1/2 h-4 w-0.5 bg-white rounded-full" 
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

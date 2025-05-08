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
        <div className="flex justify-start px-6 py-4">
          {/* Кнопка переключения меню */}
          <motion.button 
            className="relative z-50 w-8 h-8 flex items-center justify-center rounded-full menu-button focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            whileTap={{ scale: 0.92 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center items-center w-5 h-5 relative">
              <motion.span 
                className="menu-line absolute"
                animate={{
                  width: '100%',
                  top: isMenuOpen ? '50%' : '30%',
                  rotate: isMenuOpen ? 45 : 0,
                  translateY: isMenuOpen ? '-50%' : 0
                }}
                transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
              />
              
              <motion.span 
                className="menu-line absolute"
                animate={{
                  width: isMenuOpen ? '100%' : '70%',
                  bottom: isMenuOpen ? '50%' : '30%',
                  rotate: isMenuOpen ? -45 : 0,
                  translateY: isMenuOpen ? '50%' : 0,
                  alignSelf: !isMenuOpen ? 'flex-end' : 'center'
                }}
                transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
                style={{ alignSelf: !isMenuOpen ? 'flex-end' : 'center' }}
              />
            </div>
          </motion.button>
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
              className="fixed left-0 top-0 bottom-0 w-56 md:w-64 bg-black z-40 flex flex-col pt-24 px-6"
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
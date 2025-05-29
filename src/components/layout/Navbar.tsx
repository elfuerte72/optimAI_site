'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { rafThrottle } from '@/utils/performance';
import '@/styles/navbar.css';
import { motion } from 'framer-motion';

// Компонент навигационной панели в стиле Apple
const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    
    const handleScroll = rafThrottle(() => {
      setScrolled(window.scrollY > 10);
    });

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleEscKey);
    
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isMounted]);

  const toggleMenu = () => {
    if (isMounted) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const navLinks = [
    { path: '/', name: 'Главная' },
    { path: '/services', name: 'Услуги' },
    { path: '/about', name: 'О нас' }

  ];

  if (!isMounted) {
    return (
      <>
        <div className="fixed top-6 left-6 z-50 w-8 h-8 flex items-center justify-center rounded-full menu-button">
          <div className="w-5 h-5 flex flex-col justify-center items-center" style={{ gap: '3px' }}>
            <span className="block w-5 h-0.5 bg-white rounded-sm" />
            <span className="block w-5 h-0.5 bg-white rounded-sm" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <button 
        className="menu-button p-2 rounded-md focus:outline-none w-8 h-8 fixed top-6 left-6 z-50"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
      >
        <span className="sr-only">{isMenuOpen ? "Закрыть меню" : "Открыть меню"}</span>
        <motion.div
          className="flex flex-col items-center justify-center w-full h-full"
          animate={isMenuOpen ? "open" : "closed"}
          initial={false}
        >
          <motion.span
            className="block w-5 h-0.5 bg-white rounded-sm"
            variants={{
              closed: { rotate: 0, y: -2.5 },
              open: { rotate: 45, y: 0 },
            }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.span
            className="block w-5 h-0.5 bg-white rounded-sm"
            variants={{
              closed: { rotate: 0, y: 2.5 },
              open: { rotate: -45, y: 0 },
            }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      </button>
      
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 will-change-opacity ${isMenuOpen ? 'visible' : 'invisible'}`}
        style={{ 
          opacity: isMenuOpen ? 1 : 0,
          transition: 'opacity 0.3s ease, visibility 0.3s ease'
        }}
        onClick={() => setIsMenuOpen(false)}
      />
      
      <div 
        className="fixed left-0 top-0 bottom-0 w-56 md:w-64 backdrop-blur-lg z-40 flex flex-col pt-24 px-6 will-change-transform gpu-accelerated nav-mobile-menu-bg"
        style={{
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          visibility: isMenuOpen ? 'visible' : 'hidden',
        }}
      >
        <nav className="flex flex-col gap-8 flex-grow">
          {navLinks.map((link) => (
            <div key={link.path}>
              <Link 
                href={link.path}
                className="relative group"
                onClick={() => setIsMenuOpen(false)}
              >
                <span 
                  className={`text-xl font-medium tracking-tight text-white ${
                    pathname === link.path ? 'font-semibold' : ''
                  }`}
                >
                  {link.name}
                </span>
                
                {pathname === link.path && (
                  <span 
                    className="absolute -left-3 top-1/2 -translate-y-1/2 h-4 w-0.5 bg-white rounded-full" 
                  />
                )}
              </Link>
            </div>
          ))}
        </nav>
        
        <a
          href="https://t.me/optimaai_tg"
          target="_blank"
          rel="noopener noreferrer"
          className="relative mb-8 group"
          onClick={() => setIsMenuOpen(false)}
          onMouseEnter={() => setIsContactHovered(true)}
          onMouseLeave={() => setIsContactHovered(false)}
        >
          <span 
            className="text-xl font-tight text-white flex items-center"
          >
            <svg 
              className={`w-5 h-5 mr-2 transform transition-transform duration-300 ${isContactHovered ? 'translate-x-1' : ''}`} 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"></path>
            </svg>
            Связаться с менеджером
          </span>
        </a>
      </div>
    </>
  );
};

export default Navbar;
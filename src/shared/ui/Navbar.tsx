'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { rafThrottle } from '@shared/lib';
import { SOCIAL_LINKS } from '@shared/config';
import '@/styles/navbar.css';
import { motion } from 'framer-motion';

// Компонент навигационной панели в стиле Apple
const Navbar = () => {
  const pathname = usePathname();
  const [_scrolled, setScrolled] = useState(false);
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
    { path: '/about', name: 'О нас' },
  ];

  if (!isMounted) {
    return (
      <>
        <div className="menu-button fixed top-6 left-6 z-50 flex h-8 w-8 items-center justify-center rounded-full">
          <div className="flex h-5 w-5 flex-col items-center justify-center" style={{ gap: '3px' }}>
            <span className="block h-0.5 w-5 rounded-sm bg-white" />
            <span className="block h-0.5 w-5 rounded-sm bg-white" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <button
        className="menu-button fixed top-6 left-6 z-50 h-8 w-8 rounded-md p-2 focus:outline-none"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
      >
        <span className="sr-only">{isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}</span>
        <motion.div
          className="flex h-full w-full flex-col items-center justify-center"
          animate={isMenuOpen ? 'open' : 'closed'}
          initial={false}
        >
          <motion.span
            className="block h-0.5 w-5 rounded-sm bg-white"
            variants={{
              closed: { rotate: 0, y: -2.5 },
              open: { rotate: 45, y: 0 },
            }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.span
            className="block h-0.5 w-5 rounded-sm bg-white"
            variants={{
              closed: { rotate: 0, y: 2.5 },
              open: { rotate: -45, y: 0 },
            }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      </button>

      <div
        className={`will-change-opacity fixed inset-0 z-40 bg-black/50 backdrop-blur-sm ${isMenuOpen ? 'visible' : 'invisible'}`}
        style={{
          opacity: isMenuOpen ? 1 : 0,
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
        }}
        onClick={() => setIsMenuOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsMenuOpen(false);
          }
        }}
        role="button"
        tabIndex={isMenuOpen ? 0 : -1}
        aria-label="Закрыть меню"
      />

      <nav
        className="gpu-accelerated nav-mobile-menu-bg fixed top-0 bottom-0 left-0 z-40 flex w-56 flex-col px-6 pt-24 backdrop-blur-lg will-change-transform md:w-64"
        style={{
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          visibility: isMenuOpen ? 'visible' : 'hidden',
        }}
        id="mobile-menu"
        role="navigation"
        aria-label="Главное меню"
      >
        <div className="flex flex-grow flex-col gap-8" role="list">
          {navLinks.map((link) => (
            <div key={link.path} role="listitem">
              <Link
                href={link.path}
                className="group relative focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded"
                onClick={() => setIsMenuOpen(false)}
                aria-current={pathname === link.path ? 'page' : undefined}
              >
                <span
                  className={`text-xl font-medium tracking-tight text-white ${pathname === link.path ? 'font-semibold' : ''
                    }`}
                >
                  {link.name}
                </span>

                {pathname === link.path && (
                  <span
                    className="absolute top-1/2 -left-3 h-4 w-0.5 -translate-y-1/2 rounded-full bg-white"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </div>
          ))}
        </div>

        <a
          href={SOCIAL_LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mb-8 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded"
          onClick={() => setIsMenuOpen(false)}
          onMouseEnter={() => setIsContactHovered(true)}
          onMouseLeave={() => setIsContactHovered(false)}
          aria-label="Связаться с менеджером через Telegram"
        >
          <span className="font-tight flex items-center text-xl text-white">
            <svg
              className={`mr-2 h-5 w-5 transform transition-transform duration-300 ${isContactHovered ? 'translate-x-1' : ''}`}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"></path>
            </svg>
            Связаться с менеджером
          </span>
        </a>
      </nav>
    </>
  );
};

export default Navbar;

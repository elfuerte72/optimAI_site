'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { rafThrottle } from '@/utils/performance';
import '@/styles/navbar.css';

// Компонент навигационной панели в стиле Apple
const Navbar = () => {
  // Move these to useEffect to avoid hydration mismatches
  const [activeLink, setActiveLink] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to true after component mounts on client
    setIsMounted(true);
    
    // Обновляем активную ссылку при изменении пути
    setActiveLink(window.location.pathname);

    // Оптимизированный обработчик скролла
    const handleScroll = rafThrottle(() => {
      setScrolled(window.scrollY > 10);
    });

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
    if (isMounted) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const navLinks = [
    { path: '/', name: 'Главная' },
    { path: '/services', name: 'Услуги' },
    { path: '/academy', name: 'Академия OptimaAI' },
    { path: '/news', name: 'Отзывы и новости' }
  ];

  // Return a completely static component for SSR
  // This ensures server and initial client render match exactly
  if (!isMounted) {
    return (
      <>
        <div className="fixed top-6 left-6 z-50 w-8 h-8 flex items-center justify-center rounded-full menu-button">
          <div className="flex justify-center items-center w-5 h-5 relative">
            <span className="menu-line absolute" style={{width: '100%', top: '30%'}} />
            <span className="menu-line absolute" style={{width: '70%', bottom: '30%', alignSelf: 'flex-end'}} />
          </div>
        </div>
      </>
    );
  }

  // Only render interactive elements after client-side hydration is complete
  return (
    <>
      {/* Плавающая кнопка бургер-меню без горизонтальной панели */}
      <button 
        className="fixed top-6 left-6 z-50 w-8 h-8 flex items-center justify-center rounded-full menu-button focus:outline-none"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
      >
        <div className="flex justify-center items-center w-5 h-5 relative">
          <span 
            className="menu-line absolute will-change-transform gpu-accelerated" 
            style={{ 
              width: '100%',
              top: isMenuOpen ? '50%' : '30%',
              transform: isMenuOpen ? 'translateY(-50%) rotate(45deg)' : 'none',
              transition: 'transform 0.25s ease, top 0.25s ease, width 0.25s ease' 
            }}
          />
          
          <span 
            className="menu-line absolute will-change-transform gpu-accelerated" 
            style={{ 
              width: isMenuOpen ? '100%' : '70%',
              bottom: isMenuOpen ? '50%' : '30%',
              transform: isMenuOpen ? 'translateY(50%) rotate(-45deg)' : 'none',
              alignSelf: !isMenuOpen ? 'flex-end' : 'center',
              transition: 'transform 0.25s ease, bottom 0.25s ease, width 0.25s ease'
            }}
          />
        </div>
      </button>
      
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 will-change-opacity ${isMenuOpen ? 'visible' : 'invisible'}`}
        style={{ 
          opacity: isMenuOpen ? 1 : 0,
          transition: 'opacity 0.3s ease, visibility 0.3s ease'
        }}
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Sidebar menu */}
      <div 
        className="fixed left-0 top-0 bottom-0 w-56 md:w-64 bg-black/20 backdrop-blur-lg z-40 flex flex-col pt-24 px-6 will-change-transform gpu-accelerated"
        style={{
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          visibility: isMenuOpen ? 'visible' : 'hidden',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1))'
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
                    activeLink === link.path ? 'font-semibold' : ''
                  }`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {link.name}
                </span>
                
                {/* Подсветка текущей страницы */}
                {activeLink === link.path && (
                  <span 
                    className="absolute -left-3 top-1/2 -translate-y-1/2 h-4 w-0.5 bg-white rounded-full" 
                  />
                )}
              </Link>
            </div>
          ))}
        </nav>
        
        {/* Кнопка связи с менеджером */}
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
            className="text-xl font-medium tracking-tight text-white flex items-center"
            style={{ fontFamily: 'var(--font-sans)' }}
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
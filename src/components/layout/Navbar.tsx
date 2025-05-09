'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { rafThrottle } from '@/utils/performance';
import '@/styles/navbar.css';

// Компонент навигационной панели в стиле Apple
const Navbar = () => {
  const [activeLink, setActiveLink] = useState('/');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
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
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/', name: 'Главная' },
    { path: '/services', name: 'Услуги' },
    { path: '/academy', name: 'Академия OptimaAI' },
    { path: '/news', name: 'Отзывы и новости' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled 
            ? 'bg-black/40 backdrop-blur-md' 
            : 'bg-transparent'
        }`}
        style={{ 
          willChange: 'background-color, backdrop-filter',
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
        }}
      >
        <div className="flex justify-start px-6 py-4">
          {/* Кнопка переключения меню */}
          <button 
            className="relative z-50 w-8 h-8 flex items-center justify-center rounded-full menu-button focus:outline-none"
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
        </div>
      </header>
      
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
        <nav className="flex flex-col gap-8">
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
      </div>
    </>
  );
};

export default Navbar;
// src/components/Accordion.tsx
'use client';

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline'; // Иконка для кнопки

interface AccordionProps {
  buttonText: string;
  children: ReactNode;
  buttonClassName?: string;
  contentClassName?: string;
  initiallyOpen?: boolean;
}

export default function Accordion({
  buttonText,
  children,
  buttonClassName = 'text-lg font-semibold text-sky-400 hover:text-sky-300 transition-colors duration-300 py-3 px-6 rounded-lg border border-sky-500/50 hover:border-sky-400/80 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center group',
  contentClassName = 'mt-4 p-6 bg-zinc-800/50 border border-zinc-700 rounded-lg shadow-md',
  initiallyOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-full">
      <button onClick={toggleOpen} className={`${buttonClassName} w-full`} aria-expanded={isOpen}>
        <span>{buttonText}</span>
        <ChevronDownIcon
          className={`ml-2 h-5 w-5 text-sky-400 transition-transform duration-300 group-hover:text-sky-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', marginTop: '16px' }, // marginTop соответствует mt-4
              collapsed: { opacity: 0, height: 0, marginTop: '0px' },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className={contentClassName} // Убрали overflow-hidden, так как height: 'auto' лучше работает
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

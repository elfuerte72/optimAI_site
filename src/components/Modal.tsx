// src/components/Modal.tsx
'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid'; // Иконка для кнопки закрытия

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose} // Закрытие по клику на оверлей
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-lg rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl p-6 text-white"
            onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие по клику на сам контент модалки
          >
            <div className="flex items-center justify-between mb-4">
              {title && (
                <h3 className="text-xl font-semibold text-white">{title}</h3>
              )}
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white transition-colors rounded-full p-1 -mr-1 ml-auto"
                aria-label="Закрыть модальное окно"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

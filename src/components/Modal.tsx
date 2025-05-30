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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={onClose} // Закрытие по клику на оверлей
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-lg rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие по клику на сам контент модалки
          >
            <div className="mb-4 flex items-center justify-between">
              {title && <h3 className="text-xl font-semibold text-white">{title}</h3>}
              <button
                onClick={onClose}
                className="-mr-1 ml-auto rounded-full p-1 text-zinc-400 transition-colors hover:text-white"
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

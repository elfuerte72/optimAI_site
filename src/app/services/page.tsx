'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import Image, { StaticImageData } from 'next/image';
import Navbar from '@/components/layout/Navbar';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import BookIcon from '@/images/book.svg';
import AutoIcon from '@/images/auto.svg';
import AgentIcon from '@/images/agent.svg';
import { XMarkIcon } from '@heroicons/react/24/outline';

const TELEGRAM_SIGNUP_URL = 'https://t.me/your_telegram_bot_or_contact';
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; 
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID'; 

interface ServiceCardProps {
  id: string;
  icon: StaticImageData | string; 
  title: string;
  description: string; 
  details: Array<{ title: string; items: string[] }>;
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, icon, title, description, details, isExpanded, onToggle }) => {
  const cardRef = useRef(null);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const isInView = useInView(cardRef, { amount: 0.3 });

  useEffect(() => {
    if (isInView && !hasBeenInView) {
      setHasBeenInView(true);
    }
  }, [isInView, hasBeenInView]);

  const detailVariants = {
    open: {
      opacity: 1,
      maxHeight: '500px',
      marginTop: '16px',
      marginBottom: '16px',
      display: 'block',
    },
    collapsed: {
      opacity: 0,
      maxHeight: '0px',
      marginTop: '0px',
      marginBottom: '0px',
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-white/10 flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-white/10 p-3 rounded-lg flex-shrink-0">
          <Image 
            src={icon} 
            alt={title}
            width={32} 
            height={32} 
            className="w-8 h-8"
          />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-white flex-grow">{title}</h3>
      </div>
      <p className="text-gray-300 mb-4 text-sm md:text-base flex-grow">{description}</p>
      
      <motion.div
        key={`service-details-${id}`}
        initial={false}
        animate={isExpanded ? "open" : "collapsed"}
        variants={detailVariants}
        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
        className="overflow-hidden"
      >
        <div className="space-y-3 border-t border-white/10 pt-4">
          {details.map((detail, index) => (
            <div key={index}>
              <h4 className="text-sm font-medium text-gray-200 mb-1">{detail.title}</h4>
              <ul className="list-disc list-inside space-y-1 pl-1">
                {detail.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-300 text-xs md:text-sm">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
      
      <button
        onClick={onToggle}
        className="mt-auto w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm md:text-base"
        aria-expanded={isExpanded}
      >
        {isExpanded ? "Скрыть" : "Подробнее"} 
      </button>
    </motion.div>
  );
};

const servicesData: Omit<ServiceCardProps, 'isExpanded' | 'onToggle'>[] = [
  {
    id: 'education',
    icon: BookIcon,
    title: 'Обучение',
    description: 'Навык эффективной работы с ИИ, экономия времени, повышение продуктивности.',
    details: [
      { 
        title: 'Экспертиза',
        items: ['Промптинг / Метапромптинг']
      },
      {
        title: 'Форматы занятий',
        items: ['Онлайн/офлайн', 'Индивидуальные и групповые занятия']
      },
      {
        title: 'Стоимость',
        items: ['От 20 000 ₽ за человека']
      }
    ]
  },
  {
    id: 'automation',
    icon: AutoIcon,
    title: 'Автоматизация',
    description: 'Внедрение ИИ в CRM, Notion, таблицы, мессенджеры и другие ваши текущие системы.',
    details: [
      {
        title: 'Интеграция',
        items: ['CRM, Notion, таблицы, мессенджеры и др.']
      },
      {
        title: 'Адаптация',
        items: ['Адаптация под текущую систему клиента']
      },
      {
        title: 'Поддержка',
        items: ['Постподдержка и обучение']
      },
    ]
  },
  {
    id: 'agents',
    icon: AgentIcon,
    title: 'Создание агентов',
    description: 'Разработка ИИ-ассистентов и кастомных LLM с полным циклом внедрения и поддержки.',
    details: [
      {
        title: 'Разработка',
        items: ['ИИ-ассистенты и кастомные LLM']
      },
      {
        title: 'Развертывание',
        items: ['Локально (на ресурсах клиента)', 'Облачные решения (Яндекс/Сбер/другое)']
      },
      {
        title: 'Процесс',
        items: ['Полный цикл: разработка, интеграция, обучение, поддержка']
      }
    ]
  }
];

interface SignUpModalProps {
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [task, setTask] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const message = `Новая заявка:\\nИмя: ${name}\\nТелефон: ${phone}\\nЗадача/Вопрос: ${task}`;

    if (TELEGRAM_BOT_TOKEN === 'YOUR_TELEGRAM_BOT_TOKEN' || TELEGRAM_CHAT_ID === 'YOUR_TELEGRAM_CHAT_ID') {
      console.warn('Telegram Bot Token or Chat ID not configured. Simulating submission.');
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Данные формы:', { name, phone, task });
      setSubmitStatus('success');
      setName('');
      setPhone('');
      setTask('');
      setTimeout(() => { closeModalAndStatus(); }, 2000);
    } else {
      try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown' 
          }),
        });
        if (response.ok) {
          setSubmitStatus('success');
          setName('');
          setPhone('');
          setTask('');
          setTimeout(() => { closeModalAndStatus(); }, 2000);
        } else {
          setSubmitStatus('error');
        }
      } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
        setSubmitStatus('error');
      }
    }
    setIsSubmitting(false);
  };
  
  const closeModalAndStatus = () => {
    onClose();
    setSubmitStatus(null);
  }

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModalAndStatus();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const customEase = [0.04, 0.62, 0.23, 0.98];

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: customEase }}
      onClick={closeModalAndStatus} 
    >
      <motion.div
        className="bg-black border border-white/20 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 md:p-8 relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: customEase }}
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={closeModalAndStatus}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Закрыть модальное окно"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">Оставить заявку</h2>
        
        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <motion.svg 
              className="w-16 h-16 text-green-500 mx-auto mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1}}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1}}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </motion.svg>
            <p className="text-xl text-white">Спасибо!</p>
            <p className="text-gray-300">Ваша заявка отправлена. Мы скоро свяжемся с вами.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Имя</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-shadow duration-200"
                placeholder="Ваше имя"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">Телефон</label>
              <input 
                type="tel" 
                name="phone" 
                id="phone" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-shadow duration-200"
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </div>
            <div>
              <label htmlFor="task" className="block text-sm font-medium text-gray-300 mb-1.5">Задача/Вопрос</label>
              <textarea 
                name="task" 
                id="task" 
                rows={4} 
                required
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-shadow duration-200 resize-none"
                placeholder="Кратко опишите вашу задачу или вопрос..."
              />
            </div>
            <motion.button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Отправить заявку'}
            </motion.button>
            {submitStatus === 'error' && (
              <p className="text-sm text-red-400 text-center">Что-то пошло не так. Пожалуйста, попробуйте еще раз.</p>
            )}
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};


export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const heroCtaRef = useRef<HTMLButtonElement>(null); 
  
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const handleToggleCard = (cardId: string) => {
    setExpandedCardId(prevId => (prevId === cardId ? null : cardId));
  };

  useEffect(() => {
    document.title = "Услуги — OptimaAI";

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileCta(!entry.isIntersecting);
      },
      { threshold: 0.1 } 
    );

    const currentHeroCta = heroCtaRef.current;
    if (currentHeroCta) {
      observer.observe(currentHeroCta);
    }

    return () => {
      if (currentHeroCta) {
        observer.unobserve(currentHeroCta);
      }
    };
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;

    if (isModalOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = originalBodyOverflow || 'auto';
      document.body.style.paddingRight = originalBodyPaddingRight || '0px';
    }
    return () => {
      document.body.style.overflow = originalBodyOverflow || 'auto';
      document.body.style.paddingRight = originalBodyPaddingRight || '0px';
    };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-x-hidden">
      <Navbar />

      {/* Service Cards Section - теперь первый основной блок */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -z-1" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pt-0 md:pt-0">
          {servicesData.map((service) => (
            <ServiceCard 
              key={service.id} 
              {...service} 
              isExpanded={expandedCardId === service.id}
              onToggle={() => handleToggleCard(service.id)}
            />
          ))}
        </div>
        
        <div className="mt-12 md:mt-16 flex justify-center">
          <motion.button
            ref={heroCtaRef} 
            onClick={openModal} 
            className="bg-white text-black font-bold text-lg md:text-xl py-3 px-8 md:py-4 md:px-10 rounded-full shadow-xl hover:shadow-white/20 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          >
            Записаться
          </motion.button>
        </div>
         <div className="absolute inset-x-0 bottom-0  h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -z-1" />
      </section>
      
      <AnimatePresence>
        {isModalOpen && ( 
          <SignUpModal key="signupModal" onClose={closeModal} /> 
        )}
      </AnimatePresence>
      
      {/* Fixed Mobile CTA */}
      <AnimatePresence>
        {showMobileCta && (
          <motion.div 
            key="mobileCta"
            className="fixed bottom-0 left-0 right-0 p-4 bg-black/70 backdrop-blur-md md:hidden z-50 border-t border-white/10"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button 
              onClick={openModal} 
              className="w-full bg-white text-black font-bold text-lg py-3.5 px-6 rounded-full shadow-lg text-center block hover:scale-[1.02] transition-transform"
            >
              Записаться
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle grain/noise layer */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none -z-20"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          opacity: '0.02', 
        }}
      />
    </div>
  );
}

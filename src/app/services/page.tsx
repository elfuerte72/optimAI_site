'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import Image, { StaticImageData } from 'next/image';
import Navbar from '@/components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import BookIcon from '@/images/book.svg';
import AutoIcon from '@/images/auto.svg';
import AgentIcon from '@/images/agent.svg';
import { XMarkIcon } from '@heroicons/react/24/outline';

/* ──────── Telegram (замени на реальные данные) ─────── */
// REMOVED: Secrets should not be in frontend code. Handle via backend API.
// const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
// const TELEGRAM_CHAT_ID  = 'YOUR_TELEGRAM_CHAT_ID';

/* ──────── Типы ─────── */
interface ServiceDetail { title: string; items: string[]; }

interface Service {
  id: string;
  icon: StaticImageData;
  title: string;
  description: string;
  details: ServiceDetail[];
}

interface ServiceCardProps extends Service {
  isExpanded: boolean;
  onToggle: () => void;
}

/* ──────── Карточка услуги ─────── */
const ServiceCard: React.FC<ServiceCardProps & { index: number }> = ({
  icon, id, title, description, details, isExpanded, onToggle, index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variants = {
    open:  { opacity: 1, maxHeight: 500, mt: 16, mb: 16, display: 'block' },
    close: { opacity: 0, maxHeight:   0, mt:  0, mb:  0, transitionEnd: { display: 'none' } },
  } as const;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl flex flex-col
                 transition-transform hover:scale-[1.02] hover:shadow-white/10"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-white/10 p-3 rounded-lg flex-shrink-0">
          <Image src={icon} alt={title} width={32} height={32} />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-white flex-grow">{title}</h3>
      </div>

      <p className="text-gray-300 text-sm md:text-base mb-4 flex-grow">{description}</p>

      <motion.div
        key={`details-${id}`}
        initial={false}
        animate={isExpanded ? 'open' : 'close'}
        variants={variants}
        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
        className="overflow-hidden"
      >
        <div className="space-y-3 border-t border-white/10 pt-4">
          {details.map((d, idx) => (
            <div key={idx}>
              <h4 className="text-sm font-medium text-gray-200 mb-1">{d.title}</h4>
              <ul className="list-disc list-inside space-y-1 pl-1">
                {d.items.map((item, i) => (
                  <li key={i} className="text-gray-300 text-xs md:text-sm">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="mt-auto w-full bg-white/10 hover:bg-white/20 text-white font-medium
                   text-sm md:text-base py-2.5 rounded-lg transition-colors"
      >
        {isExpanded ? 'Скрыть' : 'Подробнее'}
      </button>
    </motion.div>
  );
};

/* ──────── Данные ─────── */
const servicesData: Service[] = [
  {
    id: 'education',
    icon: BookIcon,
    title: 'Обучение',
    description: 'Навык эффективной работы с ИИ, экономия времени, повышение продуктивности.',
    details: [
      { title: 'Экспертиза',      items: ['Промптинг / Метапромптинг'] },
      { title: 'Форматы занятий', items: ['Онлайн/офлайн', 'Индивидуальные', 'Групповые'] },
      { title: 'Стоимость',       items: ['От 20 000 ₽ за человека'] },
    ],
  },
  {
    id: 'automation',
    icon: AutoIcon,
    title: 'Автоматизация',
    description: 'Внедрение ИИ в CRM, Notion, таблицы, мессенджеры и другие системы.',
    details: [
      { title: 'Интеграция', items: ['CRM, Notion, мессенджеры, таблицы'] },
      { title: 'Адаптация',  items: ['Под текущие бизнес-процессы клиента'] },
      { title: 'Поддержка',  items: ['Пост-сопровождение и обучение'] },
    ],
  },
  {
    id: 'agents',
    icon: AgentIcon,
    title: 'Создание агентов',
    description: 'Разработка ИИ-ассистентов и кастомных LLM с полным циклом внедрения.',
    details: [
      { title: 'Разработка',     items: ['ИИ-ассистенты, кастомные LLM'] },
      { title: 'Развертывание',  items: ['Локально или в облаке (Яндекс, Сбер…)'] },
      { title: 'Процесс',        items: ['Дизайн → Интеграция → Обучение → Поддержка'] },
    ],
  },
];

/* ──────── Модалка (коротко) ─────── */
interface SignUpModalProps { onClose: () => void; serviceTitle?: string; }

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose, serviceTitle }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState(''); // Email or Telegram
  const [selectedService, setSelectedService] = useState(serviceTitle || '');
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Focus trapping and Escape key handling
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);

    // Basic focus trapping: focus first interactive element
    const firstFocusableElement = modalRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement | null;
    firstFocusableElement?.focus();
    
    // More robust focus trapping would involve listening to Tab key presses
    // and preventing focus from leaving the modal.

    return () => { 
      window.removeEventListener('keydown', handleEscape); 
    };
  }, [onClose]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/signup-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, service: selectedService, comment }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(result.message || 'Ваша заявка успешно отправлена!');
        setName('');
        setContact('');
        setSelectedService(serviceTitle || '');
        setComment('');
        // Optionally close modal after a delay: setTimeout(onClose, 3000);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Произошла ошибка при отправке.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Не удалось связаться с сервером. Попробуйте позже.');
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const modalTitleId = "signup-modal-title";

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      onClick={onClose} // Close on overlay click
    >
      <motion.div 
        ref={modalRef}
        className="bg-gray-950 border border-white/20 rounded-xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative"
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }} 
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
        role="dialog" 
        aria-modal="true" 
        aria-labelledby={modalTitleId}
      >
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 rounded-full transition-colors"
          aria-label="Закрыть модальное окно"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>
        
        <h2 id={modalTitleId} className="text-2xl font-semibold text-white mb-6 text-center">
          {submitStatus === 'success' ? 'Заявка отправлена!' : 'Записаться на услугу'}
        </h2>

        {submitStatus === 'success' ? (
          <div className="text-center">
            <p className="text-green-400 mb-4">{submitMessage}</p>
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Отлично!
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Имя</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Как к вам обращаться?"
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-300 mb-1">Контакт (Email / Telegram)</label>
              <input 
                type="text" 
                id="contact" 
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required 
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="example@mail.com или @username"
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">Интересующая услуга</label>
              <select 
                id="service" 
                name="service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="" disabled={!!serviceTitle}>Выберите услугу (если не выбрана)</option>
                {servicesData.map(s => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value="Другое">Другое/Консультация</option>
              </select>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">Комментарий (необязательно)</label>
              <textarea 
                id="comment" 
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Дополнительная информация по вашему запросу..."
              />
            </div>
            
            {submitStatus === 'error' && (
              <p className="text-sm text-red-400 text-center">{submitMessage}</p>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Отправить заявку'}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ──────── Страница ─────── */
export default function ServicesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [selectedServiceTitleForModal, setSelectedServiceTitleForModal] = useState<string | undefined>(undefined);

  const toggleCard = (id: string) => setExpandedId(prev => (prev === id ? null : id));
  
  const openModalWithService = (serviceTitle?: string) => {
    setSelectedServiceTitleForModal(serviceTitle);
    setModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((s, idx) => (
            <ServiceCard
              key={s.id}
              {...s}
              isExpanded={expandedId === s.id}
              onToggle={() => {
                toggleCard(s.id);
                // Potentially open modal if a specific service detail button is clicked in future
                // For now, a general button exists below
              }}
              index={idx}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Готовы начать?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Свяжитесь с нами, чтобы обсудить ваши задачи и узнать, как Optima AI может помочь вашему бизнесу расти.
            </p>
            <motion.button
                onClick={() => openModalWithService()} // Open general modal
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-10 rounded-lg shadow-lg text-lg transition-all duration-300 ease-in-out transform"
            >
                Оставить заявку или задать вопрос
            </motion.button>
        </div>
      </section>

      <AnimatePresence>
        {modalOpen && <SignUpModal onClose={() => setModalOpen(false)} serviceTitle={selectedServiceTitleForModal} />}
      </AnimatePresence>
    </div>
  );
}

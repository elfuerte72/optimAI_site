// /Users/maximpenkin/Documents/openai/site/optimAI_site/src/app/academy/page.tsx
'use client';

import { useState, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import FeatureCard from '@/components/feature-card';
import Modal from '@/components/Modal';
import Accordion from '@/components/Accordion';
import {
  CommandLineIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/solid';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const academySections = [
  {
    id: 'prompting',
    title: 'Промтинг',
    icon: <CommandLineIcon className="w-16 h-16 text-sky-400" />,
    shortDescription:
      'Освойте искусство создания точных запросов к AI, чтобы получать максимально релевантные и эффективные ответы.',
    featureCardDescription: '',
  },
  {
    id: 'meta-prompting',
    title: 'Мета-промтинг',
    icon: <PuzzlePieceIcon className="w-16 h-16 text-sky-400" />,
    shortDescription:
      'Научитесь конструировать сложные промт-системы, которые автоматизируют генерацию контента и решение многошаговых задач.',
    featureCardDescription: '',
  },
  {
    id: 'art-prompting',
    title: 'Арт-промтинг',
    icon: <SparklesIcon className="w-16 h-16 text-sky-400" />,
    shortDescription:
      'Превращайте идеи в захватывающие визуальные образы с помощью AI-инструментов нового поколения, таких как Sora и Midjourney.',
    featureCardDescription: '',
  },
];

const priceData = [
  { course: 'Экспресс-интенсив', duration: '1 занятие (3 ч)', price: '7 900' },
  { course: 'Базовый', duration: '4 занятия (2 нед)', price: '19 900' },
  { course: 'Старт-день', duration: '1 день (3 ч)', price: '9 900' },
  { course: 'Art Pro', duration: '6 занятий (2 нед)', price: '32 900' },
  { course: 'Artdirection', duration: '18 занятий (6 нед)', price: '159 900' },
];

const packagesData = [
  { name: 'AI-Full Stack (3 продвинутых курса)', details: '12 занятий (6 нед): 99 000 ₽' },
  { name: 'Corporate All-Inclusive', details: 'до 25 чел., кастом: от 490 000 ₽ (обсуждаются)' },
  { name: 'Групповое обучение', details: 'от 6 человек: индивидуально' },
];

export default function AcademyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-5xl mx-auto space-y-16 sm:space-y-24"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {/* Секция направлений обучения */}
          <motion.section variants={sectionVariants} className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 mb-12">
              Направления обучения
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {academySections.map((section, index) => (
                <motion.div
                  key={section.id}
                  variants={sectionVariants}
                  className="flex flex-col items-center"
                >
                  <FeatureCard
                    title={section.title}
                    description={section.featureCardDescription}
                    icon={section.icon}
                    category=""
                    detailsText=""
                    index={index}
                  />
                  <p className="mt-4 text-zinc-300 text-sm max-w-xs mx-auto">
                    {section.shortDescription}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Секция "Подробнее" с аккордеоном */}
          <motion.section variants={sectionVariants} className="max-w-3xl mx-auto">
            <Accordion buttonText="Узнать больше о преимуществах">
              <div className="space-y-6 text-zinc-300">
                <div>
                  <h3 className="text-xl font-semibold text-sky-400 mb-3 flex items-center">
                    <AcademicCapIcon className="h-6 w-6 mr-2 text-sky-500" />
                    Что вы получаете в знаниях и практике
                  </h3>
                  <ul className="list-disc list-inside space-y-2 pl-2">
                    <li>
                      <strong>Формулы правильного запроса</strong> — вы получаете
                      понимание и схемы, которые заставляют нейросети выдавать
                      максимально точные ответы.
                    </li>
                    <li>
                      <strong>Понимание, как составлять промт, который пишет промт</strong> —
                      умение строить цепочки Chain-of-Thought, многошаговые схемы,
                      превращающие один промт в законченный проект.
                    </li>
                    <li>
                      <strong>Научитесь превращать идеи в визуальный продакшен</strong> —
                      генерация иллюстраций, рекламы, бренд-гайдов за минуты, а не
                      недели.
                    </li>
                    <li>
                      <strong>Интеграция</strong> — базовые навыки API, создание
                      собственных ботов.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-sky-400 mb-3 flex items-center">
                     <SparklesIcon className="h-6 w-6 mr-2 text-sky-500" />
                    К чему приводит прокачанный навык
                  </h3>
                  <ul className="list-disc list-inside space-y-2 pl-2">
                    <li>Быстрее закрываешь сделки / проекты</li>
                    <li>+10–30 % прирост дохода (монетизация навыка, консалтинг)</li>
                    <li>Больше качественного контента</li>
                    <li>Анализируешь ценообразование / вложения капитала</li>
                    <li>–5–15 % расходов через оптимизацию</li>
                    <li>
                      <strong>Итог:</strong> прокачка промптинга = конкурентное
                      преимущество. Умеешь задавать правильные вопросы → получаешь
                      точные ответы → принимаешь лучшие решения быстрее других.
                    </li>
                  </ul>
                </div>
              </div>
            </Accordion>
          </motion.section>

          {/* Секция "Прайс и Форматы" */}
          <motion.section variants={sectionVariants}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 mb-12">
              Прайс и Форматы
            </h2>
            
            <div className="overflow-x-auto bg-zinc-800/50 border border-zinc-700 rounded-lg shadow-lg p-2 sm:p-0">
              <table className="min-w-full divide-y divide-zinc-700">
                <thead className="bg-zinc-900/70">
                  <tr>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-sky-400">Курс</th>
                    <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-sky-400">Длительность</th>
                    <th scope="col" className="px-4 py-3.5 text-right text-sm font-semibold text-sky-400">Цена за 1 чел. (₽)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-700/50 bg-zinc-800/30">
                  {priceData.map((item) => (
                    <tr key={item.course}>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-white">{item.course}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-300">{item.duration}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-300 text-right">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-sky-400 mb-6 text-center">Пакеты</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packagesData.map((pkg) => (
                  <div key={pkg.name} className="bg-zinc-800/60 p-6 rounded-lg border border-zinc-700 shadow-md hover:shadow-sky-500/10 transition-shadow duration-300">
                    <h4 className="text-lg font-semibold text-white mb-2">{pkg.name}</h4>
                    <p className="text-sm text-zinc-300">{pkg.details}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center bg-zinc-800/50 p-6 rounded-lg border border-zinc-700 shadow-md">
              <h3 className="text-2xl font-semibold text-sky-400 mb-4">Формат обучения</h3>
              <p className="text-zinc-300">
                Онлайн/офлайн в г. Тюмень. Офлайн групповое обучение обсуждается
                индивидуально.
              </p>
            </div>
          </motion.section>

          {/* Кнопка "Оставить заявку" */}
          <motion.section variants={sectionVariants} className="text-center pt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-4 text-lg font-semibold text-black bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 rounded-lg shadow-lg hover:shadow-sky-500/30 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              Оставить заявку
            </button>
          </motion.section>
        </motion.div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Оставить заявку на обучение"
        >
          <p className="text-zinc-300">
            Свяжитесь с нами, чтобы обсудить детали вашего обучения или корпоративного предложения.
          </p>
          <div className="mt-6">
            <a
               href="https://t.me/optimaai_tg"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-block w-full text-center px-6 py-3 text-base font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-md shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Написать в Telegram
            </a>
          </div>
        </Modal>
      </div>
    </>
  );
}

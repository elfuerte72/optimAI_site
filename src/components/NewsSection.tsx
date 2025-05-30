'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { pacificoFont } from '@/lib/fonts';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Типы для новостей
interface NewsItem {
  id: string;
  title: string;
  image: string;
  content: string;
}

// Варианты анимации
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Компонент новости
const NewsCard = ({
  news,
  isExpanded,
  onToggle,
}: {
  news: NewsItem;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <Card
      className="cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-black shadow-lg transition-all duration-300 hover:border-neutral-600"
      onClick={onToggle}
    >
      <div className="relative h-64 w-full">
        <Image
          src={news.image}
          alt={news.title}
          fill
          style={{ objectFit: 'contain' }}
          className="transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-white">{news.title}</h3>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-gray-300"
          >
            <p className="whitespace-pre-line">{news.content}</p>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

export default function NewsSection() {
  // Новости
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title:
        'OpenAI покупает стартап Джонатана Айва io за $6,5 млрд — новый этап в эволюции «умных» устройств',
      image: '/news/portrait.jpg',
      content: `OpenAI объявила о приобретении стартапа io, основанного дизайнером Джонатаном Айвом, за $6,5 млрд. Сделка завершена 21 мая 2025 года и стала крупнейшей в истории компании.

io, созданный в 2024 году как часть дизайн-студии LoveFrom, разрабатывал устройства с глубокой интеграцией ИИ в минималистичном корпусе. Внедрив камеру, микрофон и предиктивные алгоритмы, команда Айва предлагала концепты «умных» гаджетов для дома и носимых аксессуаров.

Около 55 сотрудников io присоединятся к OpenAI и продолжат работу над существующими прототипами. Сам Айв возьмёт на себя руководящую роль в развитии дизайна аппаратных продуктов, сотрудничая с гендиректором Сэмом Олтманом.

Владельцы и аналитики считают, что союз OpenAI и Айва задаст новый стандарт для «умных» устройств. Ожидается, что первые продукты объединённой команды появятся уже в течение ближайшего года и предложат свежий взгляд на пользовательский интерфейс и опыт взаимодействия с ИИ.`,
    },
    {
      id: '2',
      title: 'Google представляет Veo 3 на конференции I/O 2025 — новый рубеж AI-видео',
      image: '/news/googleveo32305.webp',
      content: `На ежегодной конференции Google I/O 2025 компания анонсировала Veo 3 — третье поколение своей модели для генерации видео с нативным звуком и диалогом. Veo 3 способна превращать текстовые и графические подсказки в высокореалистичные ролики, дополняя их синхронизированной музыкой, эффектами и голосовой речью. Инструмент уже доступен подписчикам Google AI Ultra в США по подписке за $249 в месяц, а в ближайшие месяцы выйдет и на другие рынки. 

Вместе с Veo 3 Google представила Flow — платформу для удобного создания и управления AI-ассетами, объединяющую технологии Veo, Imagen и Gemini. Новый продукт открывает широкие возможности для контент-мейкеров, но одновременно порождает вопросы о безопасности и этике синтетического медиа.`,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedNewsId, setExpandedNewsId] = useState<string | null>(null);

  // Переключение слайдов
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1));
    setExpandedNewsId(null);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1));
    setExpandedNewsId(null);
  };

  // Обработка клика по новости
  const toggleNewsExpand = (id: string) => {
    setExpandedNewsId(expandedNewsId === id ? null : id);
  };

  return (
    <motion.section
      className="bg-black px-4 py-12 text-center sm:px-6 md:py-16 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          ref={(el) => {
            if (!el) return;

            // Создаем анимацию с триггером при скроллинге
            setTimeout(() => {
              gsap.fromTo(
                el,
                { opacity: 0, y: 30 }, // начальное состояние
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    markers: false,
                  },
                }
              );
            }, 100);
          }}
          className={`bg-gradient-to-r from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-2xl leading-relaxed font-bold tracking-tight text-transparent sm:text-3xl ${pacificoFont.className} mb-4 py-2 md:mb-6`}
        >
          Новости
        </h2>

        <div className="relative mx-auto max-w-3xl">
          <NewsCard
            news={newsItems[currentIndex]}
            isExpanded={expandedNewsId === newsItems[currentIndex].id}
            onToggle={() => toggleNewsExpand(newsItems[currentIndex].id)}
          />

          {/* Навигационные кнопки */}
          <div className="mt-6 flex justify-between">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="border-neutral-700 text-white hover:bg-neutral-800 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Индикаторы */}
            <div className="flex items-center space-x-2">
              {newsItems.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex ? 'bg-blue-500' : 'bg-neutral-700'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="border-neutral-700 text-white hover:bg-neutral-800 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

import { Metadata } from 'next';
import { fontSans, notoSansJP } from '@shared/lib';


import { FadeInSection, UiverseCard, CustomStyledButton, PriceButton, Navbar } from '@shared/ui';

export const metadata: Metadata = {
  title: 'Услуги обучения | Академия Optima AI',
  description:
    'Программы обучения промтингу, мета-промтингу и арт-промтингу от Академии Optima AI. Повысьте свою эффективность и получите конкурентное преимущество.',
  openGraph: {
    title: 'Услуги обучения | Академия Optima AI',
    description:
      'Программы обучения промтингу, мета-промтингу и арт-промтингу от Академии Optima AI. Повысьте свою эффективность и получите конкурентное преимущество.',
    images: [
      {
        url: '/images/og-services.png',
        width: 1200,
        height: 630,
        alt: 'Академия Optima AI - Услуги обучения',
      },
    ],
  },
};

// Мы используем типы для структуры данных курсов
interface Course {
  title: string;
  duration: string;
  price: string;
  description: string;
  imagePath: string;
}

interface CoursePackage {
  title: string;
  description: string;
  price: string;
  imagePath: string;
}

interface PackageDataItem {
  name: string;
  description: string;
}

// Данные о курсах из academy.md
const courses: Course[] = [
  {
    title: 'Экспресс-интенсив',
    duration: '1 занятие (3 ч)',
    price: '7 900 ₽',
    description:
      'Быстрое погружение в основы промтинга. Идеально для тех, кто хочет быстро освоить базовые навыки работы с нейросетями.',
    imagePath: '/images/courses/express.webp',
  },
  {
    title: 'Базовый курс',
    duration: '4 занятия (2 нед)',
    price: '19 900 ₽',
    description:
      'Полное погружение в основы промтинга. Вы научитесь составлять эффективные запросы и получать максимально точные ответы от нейросетей.',
    imagePath: '/images/courses/basic.webp',
  },
  {
    title: 'Старт-день',
    duration: '1 день (3 ч)',
    price: '9 900 ₽',
    description:
      'Интенсивный однодневный курс для быстрого старта. Идеально для тех, кто хочет понять принципы работы с AI.',
    imagePath: '/images/courses/start-day.webp',
  },
  {
    title: 'Art Pro',
    duration: '6 занятий (2 нед)',
    price: '32 900 ₽',
    description:
      'Профессиональный курс по арт-промтингу. Вы научитесь создавать визуальный контент с помощью AI.',
    imagePath: '/images/courses/art-pro.webp',
  },
  {
    title: 'Artdirection',
    duration: '18 занятий (6 нед)',
    price: '159 900 ₽',
    description:
      'Комплексный курс по арт-дирекшн с использованием AI. Для тех, кто хочет стать профессионалом в области визуального контента.',
    imagePath: '/images/courses/artdirection.webp',
  },
];

// Пакеты курсов
const packages: CoursePackage[] = [
  {
    title: 'AI-Full Stack',
    description: '3 продвинутых курса, 12 занятий (6 нед)',
    price: '99 000 ₽',
    imagePath: '/images/courses/full-stack.webp',
  },
  {
    title: 'Corporate All-Inclusive',
    description: 'до 25 человек, индивидуальные условия',
    price: 'от 490 000 ₽',
    imagePath: '/images/courses/corporate.webp',
  },
  {
    title: 'Групповое обучение',
    description: 'от 6 человек, индивидуальные условия',
    price: 'По запросу',
    imagePath: '/images/courses/group.webp',
  },
];

export default function Services() {
  const packageDataForCard: PackageDataItem[] = [];

  return (
    <main className={`${fontSans.className} min-h-screen bg-black text-white`}>
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center md:py-24">
        <FadeInSection delay={0.1}>
          <section className="mb-20">
            <h2
              className={`font-press-start-hero mb-8 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-xl font-bold tracking-tight text-transparent md:text-2xl`}
            >
              Курсы цифровой грамотности
            </h2>
            <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-3">
              <UiverseCard title="Промтинг" description="Искусство задавать вопросы." />
              <UiverseCard title="Мета-промтинг" description="Промптинг для создания промптов." />
              <UiverseCard title="Арт-промтинг" description="Создание визуального контента." />
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
              Что вы получаете?
            </h2>
            <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
              <defs>
                <linearGradient id="iconGradientServices" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#22d3ee' }} />
                  <stop offset="100%" style={{ stopColor: '#9333ea' }} />
                </linearGradient>
              </defs>
            </svg>
            <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex gap-4">
                <div className="h-12 w-12 flex-shrink-0">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#iconGradientServices)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V9L14 3Z"></path>
                    <path d="M14 3V9H20"></path>
                    <path d="M8 13H12"></path>
                    <path d="M8 17H10"></path>
                    <path d="M13 17L14.5 18.5L17 16"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Формулы правильного запроса</h3>
                  <p className="text-gray-400">
                    Понимание и схемы, которые заставляют нейросети выдавать максимально точные
                    ответы.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 flex-shrink-0">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#iconGradientServices)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Понимание мета-промтинга</h3>
                  <p className="text-gray-400">
                    Умение строить цепочки Chain-of-Thought, многошаговые схемы, превращающие один
                    промт в законченный проект.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 flex-shrink-0">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#iconGradientServices)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Визуальный продакшен</h3>
                  <p className="text-gray-400">
                    Генерация изображений, видео, рекламы и бренд-гайдов за минуты, а не недели.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 flex-shrink-0">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#iconGradientServices)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 8L3 12L7 16"></path>
                    <path d="M17 8L21 12L17 16"></path>
                    <path d="M14 4L10 20"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Интеграция</h3>
                  <p className="text-gray-400">Базовые навыки API, создание собственных ботов.</p>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <section className="mb-20">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
              К чему приводит прокачанный навык?
            </h2>
            <div
              className={`mx-auto max-w-7xl rounded-xl border border-gray-800 p-8 ${notoSansJP.className}`}
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-black">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-300 uppercase"
                      >
                        Область
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-300 uppercase"
                      >
                        Ключевые показатели
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-300 uppercase"
                      >
                        Что конкретно меняется
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700 bg-black">
                    <tr>
                      <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap text-white">
                        <strong>Жизнь</strong>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300">
                        <div className="mb-2">
                          –&nbsp;
                          <strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            30–60%
                          </strong>
                          &nbsp;времени на поиск/обработку информации
                        </div>
                        <div className="mb-2">
                          +&nbsp;
                          <strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            40–70%
                          </strong>
                          &nbsp;скорость решения бытовых задач
                        </div>
                        <div>
                          +&nbsp;
                          <strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            2–3
                          </strong>
                          &nbsp;ч свободного времени в сутки
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300">
                        Быстрее находишь ответы, планируешь, рассчитываешь бюджеты, упрощаешь и
                        автоматизируешь рутину (письма, смс, списки и т.д.)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap text-white">
                        <strong>Карьера/бизнес</strong>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300">
                        <div className="mb-2">
                          +&nbsp;
                          <strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            20–50%
                          </strong>
                          &nbsp;продуктивность (контент, отчёты, презентации)
                        </div>
                        <div className="mb-2">
                          +&nbsp;
                          <strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            15–30%
                          </strong>
                          &nbsp;качество решений за счёт анализа AI
                        </div>
                        <div>
                          –&nbsp;
                          <strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            50–80%
                          </strong>
                          &nbsp;затрат на рутину (переводы, сверки, ресёрч)
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300">
                        Создаешь и анализируешь материалы за минуты, выжимаешь инсайты из данных,
                        прокачиваешь личный бренд. Повышаешь скорость обучения. Ценность на рынке
                        растёт.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap text-white">
                        <strong>Спорт/здоровье</strong>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300">
                        <div className="mb-2">
                          –&nbsp;
                          <strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            20–40%
                          </strong>
                          &nbsp;время составления программы тренировок/диеты
                        </div>
                        <div>
                          +&nbsp;
                          <strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            10–25%
                          </strong>
                          &nbsp;эффективность тренировок (данные → корректировки)
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300">
                        Правильное составление персонального плана тренировок, питания, витаминов.
                        Консультирование по вопросам здоровья.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap text-white">
                        <strong>Развитие мышления</strong>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300">
                        <div className="mb-2">
                          +&nbsp;
                          <strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            30–50%
                          </strong>
                          &nbsp;скорость генерации идей
                        </div>
                        <div className="mb-2">
                          +&nbsp;
                          <strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            25–40%
                          </strong>
                          &nbsp;гибкость мышления
                        </div>
                        <div>Снижение «когнитивного шума»</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300">
                        Постоянная тренировка формулировок заставляет мыслить структурно: чётко
                        ставишь цель → разбиваешь на параметры → получаешь релевантный результат.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-center text-sm font-medium whitespace-nowrap text-white">
                        <strong>Финансы</strong>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300">
                        <div className="mb-2">
                          +&nbsp;
                          <strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            10–30%
                          </strong>
                          &nbsp;прирост дохода (монетизация навыка, консалтинг)
                        </div>
                        <div>
                          –&nbsp;
                          <strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                            5–15%
                          </strong>
                          &nbsp;расходов через оптимизацию
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-300">
                        Быстрее закрываешь сделки / проекты. Больше качественного контента.
                        Анализируешь ценообразование / вложения капитала.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 border-t border-gray-800 pt-6">
                <p className="text-xl font-bold">
                  Итог: прокачка промптинга = конкурентное преимущество.
                </p>
                <p className="mt-2 text-gray-400">
                  Умеете задавать правильные вопросы → получаете точные ответы → принимаете лучшие
                  решения быстрее других.
                </p>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.4}>
          {' '}
          {/* Секция для кнопки Прайс */}
          <div className="mb-10 text-center">
            {' '}
            {/* Отступ снизу можно настроить */}
            <PriceButton href="/Для стр, академия.pdf" download />
          </div>
        </FadeInSection>

        <FadeInSection delay={0.5}>
          <div className="mb-20 text-center">
            <CustomStyledButton
              href="https://t.me/optimaai_tg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Оставить заявку на обучение"
            >
              Оставить заявку
            </CustomStyledButton>
          </div>
        </FadeInSection>
      </div>
    </main>
  );
}

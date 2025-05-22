import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fontSans } from '@/lib/fonts';
import Accordion from '@/components/Accordion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { FadeInSection } from '@/components/ui/fade-in-section';

export const metadata: Metadata = {
  title: 'Услуги обучения | Академия Optima AI',
  description: 'Программы обучения промтингу, мета-промтингу и арт-промтингу от Академии Optima AI. Повысьте свою эффективность и получите конкурентное преимущество.',
  openGraph: {
    title: 'Услуги обучения | Академия Optima AI',
    description: 'Программы обучения промтингу, мета-промтингу и арт-промтингу от Академии Optima AI. Повысьте свою эффективность и получите конкурентное преимущество.',
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

// Данные о курсах из academy.md
const courses: Course[] = [
  {
    title: 'Экспресс-интенсив',
    duration: '1 занятие (3 ч)',
    price: '7 900 ₽',
    description: 'Быстрое погружение в основы промтинга. Идеально для тех, кто хочет быстро освоить базовые навыки работы с нейросетями.',
    imagePath: '/images/courses/express.webp',
  },
  {
    title: 'Базовый курс',
    duration: '4 занятия (2 нед)',
    price: '19 900 ₽',
    description: 'Полное погружение в основы промтинга. Вы научитесь составлять эффективные запросы и получать максимально точные ответы от нейросетей.',
    imagePath: '/images/courses/basic.webp',
  },
  {
    title: 'Старт-день',
    duration: '1 день (3 ч)',
    price: '9 900 ₽',
    description: 'Интенсивный однодневный курс для быстрого старта. Идеально для тех, кто хочет понять принципы работы с AI.',
    imagePath: '/images/courses/start-day.webp',
  },
  {
    title: 'Art Pro',
    duration: '6 занятий (2 нед)',
    price: '32 900 ₽',
    description: 'Профессиональный курс по арт-промтингу. Вы научитесь создавать визуальный контент с помощью AI.',
    imagePath: '/images/courses/art-pro.webp',
  },
  {
    title: 'Artdirection',
    duration: '18 занятий (6 нед)',
    price: '159 900 ₽',
    description: 'Комплексный курс по арт-дирекшн с использованием AI. Для тех, кто хочет стать профессионалом в области визуального контента.',
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
  return (
    <main className={`${fontSans.className} bg-black text-white min-h-screen`}>
      <div className="container mx-auto px-4 py-16 md:py-24 text-center">
        <FadeInSection delay={0.1}>
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Направления обучения</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
              <div className="p-6 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                <h3 className="text-2xl font-bold mb-3">Промтинг</h3>
                <p className="text-gray-400">Основы создания эффективных запросов к нейросетям для получения точных и полезных ответов.</p>
              </div>
              <div className="p-6 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                <h3 className="text-2xl font-bold mb-3">Мета-промтинг</h3>
                <p className="text-gray-400">Продвинутые техники создания промтов, которые генерируют промты (Chain-of-Thought).</p>
              </div>
              <div className="p-6 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                <h3 className="text-2xl font-bold mb-3">Арт-промтинг</h3>
                <p className="text-gray-400">Создание визуального контента с помощью нейросетей для различных задач дизайна и иллюстрации.</p>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Что вы получаете</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
              <div className="flex gap-4">
                <div className="text-4xl font-bold text-sky-400">01</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Формулы правильного запроса</h3>
                  <p className="text-gray-400">Понимание и схемы, которые заставляют нейросети выдавать максимально точные ответы.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-4xl font-bold text-sky-400">02</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Понимание мета-промтинга</h3>
                  <p className="text-gray-400">Умение строить цепочки Chain-of-Thought, многошаговые схемы, превращающие один промт в законченный проект.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-4xl font-bold text-sky-400">03</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Визуальный продакшен</h3>
                  <p className="text-gray-400">Генерация иллюстраций, рекламы, бренд-гайдов за минуты, а не недели.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-4xl font-bold text-sky-400">04</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Интеграция</h3>
                  <p className="text-gray-400">Базовые навыки API, создание собственных ботов.</p>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">К чему приводит прокачанный навык</h2>
            <div className="p-8 border border-gray-800 rounded-xl mx-auto max-w-4xl">
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-2">
                  <span className="text-sky-400">✓</span>
                  <span>Быстрее закрываете сделки и проекты</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400">✓</span>
                  <span>+10–30% прирост дохода (монетизация навыка, консалтинг)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400">✓</span>
                  <span>Больше качественного контента</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400">✓</span>
                  <span>Анализируете ценообразование и вложения капитала</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400">✓</span>
                  <span>–5–15% расходов через оптимизацию</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-800">
                <p className="font-bold text-xl">Итог: прокачка промптинга = конкурентное преимущество.</p>
                <p className="text-gray-400 mt-2">Умеете задавать правильные вопросы → получаете точные ответы → принимаете лучшие решения быстрее других.</p>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.4}>
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Актуальный прайс</h2>
            
            <Accordion 
              buttonText="Курсы" 
              buttonClassName="text-lg font-semibold text-white hover:text-sky-300 transition-colors duration-300 py-4 px-6 rounded-lg border border-gray-800 hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center group"
              contentClassName="mt-4 p-0 space-y-6"
              initiallyOpen={true} // Открыт по умолчанию
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                {courses.map((course, index) => (
                  <Card key={index} className="bg-zinc-900 border-gray-800 text-white">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {course.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 aspect-video relative bg-zinc-800 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                          Изображение курса
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">{course.description}</p>
                      <p className="text-2xl font-bold text-sky-400">{course.price}</p>
                    </CardContent>
                    <CardFooter>
                      <Link 
                        href="https://t.me/optimaai_tg" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-2 px-4 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg text-center transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                        aria-label={`Записаться на курс ${course.title}`}
                      >
                        Записаться
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </Accordion>
            
            <div className="mt-12">
              <Accordion 
                buttonText="Пакеты обучения" 
                buttonClassName="text-lg font-semibold text-white hover:text-sky-300 transition-colors duration-300 py-4 px-6 rounded-lg border border-gray-800 hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:ring-offset-2 focus:ring-offset-black flex items-center justify-center group mx-auto"
                contentClassName="mt-4 p-0 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
                  {packages.map((pkg, index) => (
                    <Card key={index} className="bg-zinc-900 border-gray-800 text-white">
                      <CardHeader>
                        <CardTitle className="text-xl font-bold">{pkg.title}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {pkg.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 aspect-video relative bg-zinc-800 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                            Изображение пакета
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-sky-400">{pkg.price}</p>
                      </CardContent>
                      <CardFooter>
                        <Link 
                          href="https://t.me/optimaai_tg" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 px-4 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg text-center transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                          aria-label={`Узнать подробнее о пакете ${pkg.title}`}
                        >
                          Узнать подробнее
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </Accordion>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.5}>
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Формат обучения</h2>
            <div className="p-8 border border-gray-800 rounded-xl mx-auto max-w-4xl">
              <p className="text-xl text-gray-300 mb-6">
                Онлайн/офлайн в г. Тюмень. Офлайн групповое обучение обсуждается индивидуально.
              </p>
              <div className="bg-zinc-900 p-6 rounded-lg text-center">
                <p className="text-xl font-bold mb-4">Сделай вклад в свое будущее:</p>
                <Link 
                  href="https://t.me/optimaai_tg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block py-3 px-8 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-lg text-center transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Оставить заявку на обучение"
                >
                  Оставить заявку
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>
      </div>
    </main>
  );
}

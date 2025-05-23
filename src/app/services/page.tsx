import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { fontSans } from '@/lib/fonts';
import Accordion from '@/components/Accordion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { FadeInSection } from '@/components/ui/fade-in-section';
import UiverseCard from '@/components/ui/UiverseCard';
import CustomStyledButton from '@/components/ui/CustomStyledButton';
import Navbar from '@/components/layout/Navbar';
import PackagesCard from '@/components/ui/PackagesCard';

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
  const packageDataForCard = [
    { name: 'AI-Full Stack', description: '(3 продвинутых курса), 12 занятий (6 нед): 99 000 ₽' },
    { name: 'Corporate All-Inclusive', description: 'до 25 чел., кастом: от 490 000 ₽ (обсуждаются)' },
    { name: 'Групповое обучение', description: 'от 6 человек: индивидуально' },
  ];

  // const packageItemsData = [ // This is now incorporated into packageDataForCard and the card itself
  //   { name: 'AI-Full Stack', description: '(3 продвинутых курса), 12 занятий (6 нед): 99 000 ₽' },
  //   { name: 'Corporate All-Inclusive', description: 'до 25 чел., кастом: от 490 000 ₽ (обсуждаются)' },
  //   { name: 'Групповое обучение', description: 'от 6 человек: индивидуально' },
  // ];

  return (
    <main className={`${fontSans.className} bg-black text-white min-h-screen`}>
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24 text-center">
        <FadeInSection delay={0.1}>
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Направления обучения</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
              <UiverseCard
                title="Промтинг"
                description="Искусство задавать вопросы."
              />
              <UiverseCard
                title="Мета-промтинг"
                description="Промптинг для создания промптов."
              />
              <UiverseCard
                title="Арт-промтинг"
                description="Создание визуального контента."
              />
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Что вы получаете</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
              <div className="flex gap-4">
                <div className="w-12 h-12 flex-shrink-0"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M14 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V9L14 3Z"></path><path d="M14 3V9H20"></path><path d="M8 13H12"></path><path d="M8 17H10"></path><path d="M13 17L14.5 18.5L17 16"></path></svg></div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Формулы правильного запроса</h3>
                  <p className="text-gray-400">Понимание и схемы, которые заставляют нейросети выдавать максимально точные ответы.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 flex-shrink-0"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg></div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Понимание мета-промтинга</h3>
                  <p className="text-gray-400">Умение строить цепочки Chain-of-Thought, многошаговые схемы, превращающие один промт в законченный проект.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 flex-shrink-0"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Визуальный продакшен</h3>
                  <p className="text-gray-400">Генерация изображений, видео, рекламы и бренд-гайдов за минуты, а не недели.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 flex-shrink-0"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M7 8L3 12L7 16"></path><path d="M17 8L21 12L17 16"></path><path d="M14 4L10 20"></path></svg></div>
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
            <div className="p-8 border border-gray-800 rounded-xl mx-auto max-w-7xl">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-black">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Область</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Ключевые показатели</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Что конкретно меняется</th>
                    </tr>
                  </thead>
                  <tbody className="bg-black divide-y divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white text-center"><strong>Жизнь</strong></td>
                      <td className="px-6 py-4 text-sm text-gray-300 text-center"><div class="mb-2">–&nbsp;<strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">30–60%</strong>&nbsp;времени на поиск/обработку информации</div><div class="mb-2">+&nbsp;<strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">40–70%</strong>&nbsp;скорость решения бытовых задач</div><div>+&nbsp;<strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">2–3</strong>&nbsp;ч свободного времени в сутки</div></td>
                      <td className="px-6 py-4 text-sm text-gray-300 text-center">Быстрее находишь ответы, планируешь, рассчитываешь бюджеты, упрощаешь и автоматизируешь рутину (письма, смс, списки и т.д.)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white text-center"><strong>Карьера/бизнес</strong></td>
                      <td className="px-6 py-4 text-sm text-gray-300 text-center"><div class="mb-2">+&nbsp;<strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">20–50%</strong>&nbsp;продуктивность (контент, отчёты, презентации)</div><div class="mb-2">+&nbsp;<strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">15–30%</strong>&nbsp;качество решений за счёт анализа AI</div><div>–&nbsp;<strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">50–80%</strong>&nbsp;затрат на рутину (переводы, сверки, ресёрч)</div></td>
                      <td className="px-6 py-4 text-sm text-gray-300 text-center">Создаешь и анализируешь материалы за минуты, выжимаешь инсайты из данных, прокачиваешь личный бренд. Повышаешь скорость обучения. Ценность на рынке растёт.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white text-center"><strong>Спорт/здоровье</strong></td>
                      <td className="px-6 py-4 text-sm text-gray-300 text-center"><div class="mb-2">–&nbsp;<strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">20–40%</strong>&nbsp;время составления программы тренировок/диеты</div><div>+&nbsp;<strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">10–25%</strong>&nbsp;эффективность тренировок (данные → корректировки)</div></td>
                      <td className="px-6 py-4 text-sm text-gray-300 text-center">Правильное составление персонального плана тренировок, питания, витаминов. Консультирование по вопросам здоровья.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white text-center"><strong>Развитие мышления</strong></td>
                      <td className="px-6 py-4 text-sm text-gray-300 text-center"><div class="mb-2">+&nbsp;<strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">30–50%</strong>&nbsp;скорость генерации идей</div><div class="mb-2">+&nbsp;<strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">25–40%</strong>&nbsp;гибкость мышления</div><div>Снижение «когнитивного шума»</div></td>
                      <td className="px-6 py-4 text-sm text-gray-300 text-center">Постоянная тренировка формулировок заставляет мыслить структурно: чётко ставишь цель → разбиваешь на параметры → получаешь релевантный результат.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white text-center"><strong>Финансы</strong></td>
                      <td className="px-6 py-4 text-sm text-gray-300 text-center"><div class="mb-2">+&nbsp;<strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">10–30%</strong>&nbsp;прирост дохода (монетизация навыка, консалтинг)</div><div>–&nbsp;<strong className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">5–15%</strong>&nbsp;расходов через оптимизацию</div></td>
                      <td className="px-6 py-4 text-sm text-gray-300 text-center">Быстрее закрываешь сделки / проекты. Больше качественного контента. Анализируешь ценообразование / вложения капитала.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-800">
                <p className="font-bold text-xl">Итог: прокачка промптинга = конкурентное преимущество.</p>
                <p className="text-gray-400 mt-2">Умеете задавать правильные вопросы → получаете точные ответы → принимаете лучшие решения быстрее других.</p>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.4}>
          <section id="packages" className="py-12 md:py-20 bg-black text-white">
            <div className="container mx-auto px-4">

              <div className="flex flex-col items-center">
                <PackagesCard packages={packageDataForCard} />
                {/* The div below is no longer needed as descriptions are inside the card on hover */}
                {/* <div className="mt-10 text-left max-w-2xl w-full">
                  {packageItemsData.map((pkg, index) => (
                    <div key={index} className="mb-6 p-6 bg-gray-800 rounded-lg shadow-xl hover:shadow-cyan-500/30 transition-shadow duration-300">
                      <h3 className="text-xl font-semibold text-white">{pkg.name}</h3>
                      <p className="text-white mt-2 leading-relaxed">{pkg.description}</p>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </section>
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

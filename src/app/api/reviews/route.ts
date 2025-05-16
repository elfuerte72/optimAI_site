import { NextResponse } from 'next/server';

// Types (can be moved to a shared types file if used elsewhere)
type ReviewCategory = 'Обучение' | 'Автоматизация' | 'Агенты';

interface Review {
  id: string;
  category: ReviewCategory;
  text: string;
  clientName: string;
}

const allReviews: Review[] = [
  {
    id: '1',
    category: 'Обучение',
    text: 'Благодаря обучению в OptimaAI, наша команда теперь эффективно использует нейросети в повседневной работе, что значительно ускорило процессы разработки.',
    clientName: 'Алексей М.',
  },
  {
    id: '2',
    category: 'Обучение',
    text: 'Курсы по ИИ помогли мне переосмыслить подход к аналитике данных. Теперь я делаю за день то, что раньше занимало неделю.',
    clientName: 'Екатерина С.',
  },
  {
    id: '3',
    category: 'Автоматизация',
    text: 'Автоматизировали процесс обработки клиентских заявок с помощью ИИ. Скорость обработки выросла в 5 раз, а количество ошибок снизилось на 80%.',
    clientName: 'Дмитрий К.',
  },
  {
    id: '4',
    category: 'Автоматизация',
    text: 'OptimaAI помогла нам создать систему автоматической категоризации товаров, что значительно упростило работу с каталогом.',
    clientName: 'Ольга П.',
  },
  {
    id: '5',
    category: 'Агенты',
    text: 'ИИ-агенты от OptimaAI теперь круглосуточно отвечают на вопросы наших клиентов. Уровень удовлетворенности клиентов вырос на 40%.',
    clientName: 'Сергей В.',
  },
  {
    id: '6',
    category: 'Агенты',
    text: 'Внедрили агента для первичного скрининга резюме. Процесс найма стал эффективнее, а HR-специалисты могут сосредоточиться на более важных задачах.',
    clientName: 'Марина Д.',
  },
  // Можно добавить больше отзывов для тестирования
  {
    id: '7',
    category: 'Обучение',
    text: 'Отличный курс по внедрению AI в бизнес-процессы. Рекомендую!',
    clientName: 'Иван Ф.',
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as ReviewCategory | null;

    let filteredReviews = allReviews;

    if (category) {
      if (!['Обучение', 'Автоматизация', 'Агенты'].includes(category)) {
        return NextResponse.json({ error: 'Недопустимая категория.' }, { status: 400 });
      }
      filteredReviews = allReviews.filter(review => review.category === category);
    }

    // Имитация небольшой задержки API
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(filteredReviews);

  } catch (error) {
    console.error('Ошибка в /api/reviews:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера при получении отзывов.' }, { status: 500 });
  }
} 
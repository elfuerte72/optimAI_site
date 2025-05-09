'use client';

import { useState, useEffect } from 'react';

type ReviewCategory = 'Обучение' | 'Автоматизация' | 'Агенты';

interface Review {
  id: string;
  category: ReviewCategory;
  text: string;
  clientName: string;
}

const mockReviews: Review[] = [
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
];

export default function ReviewsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ReviewCategory>('Обучение');
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchReviews = async () => {
      setIsLoading(true);
      // In a real application, replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const filtered = mockReviews.filter(review => review.category === selectedCategory);
      setFilteredReviews(filtered);
      setIsLoading(false);
    };

    fetchReviews();
  }, [selectedCategory]);

  const categories: ReviewCategory[] = ['Обучение', 'Автоматизация', 'Агенты'];

  return (
    <section className="max-w-5xl mx-auto w-full py-16">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Отзывы клиентов
      </h2>
      
      {/* Category Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-md shadow-sm bg-gray-900 p-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-6 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-800" />
                <div className="ml-4 w-1/3 h-4 bg-gray-800 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded w-full" />
                <div className="h-4 bg-gray-800 rounded w-5/6" />
                <div className="h-4 bg-gray-800 rounded w-4/6" />
              </div>
            </div>
          ))
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-gray-900 rounded-lg p-6 transition-all duration-300 hover:bg-gray-800">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center text-white font-medium">
                  {review.clientName.split(' ').map(name => name[0]).join('')}
                </div>
                <span className="ml-4 text-white font-medium">{review.clientName}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">{review.text}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
'use client';

import { useState, useEffect } from 'react';

type ReviewCategory = 'Обучение' | 'Автоматизация' | 'Агенты';

interface Review {
  id: string;
  category: ReviewCategory;
  text: string;
  clientName: string;
}

export default function ReviewsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ReviewCategory>('Обучение');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      setApiError(null);
      try {
        const response = await fetch(
          `/api/reviews?category=${encodeURIComponent(selectedCategory)}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Ошибка API: ${response.status}`);
        }
        const data: Review[] = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
        const errorMessage =
          error instanceof Error ? error.message : 'Не удалось загрузить отзывы.';
        setApiError(errorMessage);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [selectedCategory]);

  const categories: ReviewCategory[] = ['Обучение', 'Автоматизация', 'Агенты'];
  const uniquePanelId = `reviews-panel-${selectedCategory.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section className="mx-auto w-full max-w-5xl py-16">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">Отзывы клиентов</h2>

      {/* Category Tabs */}
      <div className="mb-10 flex justify-center">
        <div
          role="tablist"
          aria-label="Категории отзывов"
          className="inline-flex rounded-md bg-gray-900 p-1 shadow-sm"
        >
          {categories.map((category) => (
            <button
              key={category}
              id={`tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-controls={uniquePanelId}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-md px-4 py-2 text-sm transition-all duration-200 ${
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

      {/* Reviews Grid - Tab Panel */}
      <div
        id={uniquePanelId}
        role="tabpanel"
        aria-labelledby={`tab-${selectedCategory.toLowerCase().replace(/\s+/g, '-')}`}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="animate-pulse rounded-lg bg-gray-900 p-6">
              <div className="mb-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-800" />
                <div className="ml-4 h-4 w-1/3 rounded bg-gray-800" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-800" />
                <div className="h-4 w-5/6 rounded bg-gray-800" />
                <div className="h-4 w-4/6 rounded bg-gray-800" />
              </div>
            </div>
          ))
        ) : apiError ? (
          <div className="col-span-1 rounded-lg bg-gray-900 p-6 text-center text-red-400 md:col-span-2">
            <p>
              <strong>Ошибка:</strong> {apiError}
            </p>
            <p>Пожалуйста, попробуйте обновить страницу или выбрать другую категорию.</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="col-span-1 rounded-lg bg-gray-900 p-6 text-center text-gray-400 md:col-span-2">
            <p>Отзывов в этой категории пока нет.</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-lg bg-gray-900 p-6 transition-all duration-300 hover:bg-gray-800"
            >
              <div className="mb-4 flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 font-medium text-white">
                  {review.clientName
                    .split(' ')
                    .map((name) => name[0])
                    .join('')}
                </div>
                <span className="ml-4 font-medium text-white">{review.clientName}</span>
              </div>
              <p className="leading-relaxed text-gray-300">{review.text}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

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
        const response = await fetch(`/api/reviews?category=${encodeURIComponent(selectedCategory)}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Ошибка API: ${response.status}`);
        }
        const data: Review[] = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Ошибка при загрузке отзывов:", error);
        const errorMessage = error instanceof Error ? error.message : "Не удалось загрузить отзывы.";
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
    <section className="max-w-5xl mx-auto w-full py-16">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Отзывы клиентов
      </h2>
      
      {/* Category Tabs */}
      <div className="flex justify-center mb-10">
        <div role="tablist" aria-label="Категории отзывов" className="inline-flex rounded-md shadow-sm bg-gray-900 p-1">
          {categories.map((category) => (
            <button
              key={category}
              id={`tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
              role="tab"
              aria-selected={selectedCategory === category}
              aria-controls={uniquePanelId}
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

      {/* Reviews Grid - Tab Panel */}
      <div 
        id={uniquePanelId}
        role="tabpanel"
        aria-labelledby={`tab-${selectedCategory.toLowerCase().replace(/\s+/g, '-')}`}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
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
        ) : apiError ? (
          <div className="col-span-1 md:col-span-2 text-center text-red-400 bg-gray-900 p-6 rounded-lg">
            <p><strong>Ошибка:</strong> {apiError}</p>
            <p>Пожалуйста, попробуйте обновить страницу или выбрать другую категорию.</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="col-span-1 md:col-span-2 text-center text-gray-400 bg-gray-900 p-6 rounded-lg">
            <p>Отзывов в этой категории пока нет.</p>
          </div>
        ) : (
          reviews.map((review) => (
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
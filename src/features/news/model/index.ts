import {
  useAppQuery,
  useAppMutation,
  useInvalidateQueries,
  createQueryKey,
  cacheUtils,
  QueryParams,
} from '@shared/lib';
import { newsApi, CreateNewsData, UpdateNewsData } from '../api';

// Ключи для кеша новостей
export const newsKeys = {
  all: () => createQueryKey.entity('news'),
  lists: () => createQueryKey.list('news'),
  list: (params?: QueryParams) => createQueryKey.list('news', params),
  details: () => [...newsKeys.all(), 'detail'] as const,
  detail: (id: string) => createQueryKey.detail('news', id),
  bySlug: (slug: string) => [...newsKeys.all(), 'slug', slug] as const,
  search: (query: string, params?: QueryParams) => 
    [...newsKeys.all(), 'search', query, params] as const,
};

// Хук для получения списка новостей
export function useNews(params?: QueryParams) {
  return useAppQuery(
    newsKeys.list(params),
    () => newsApi.getNews(params),
    {
      staleTime: cacheUtils.staleTime.medium,
      placeholderData: (previousData) => previousData,
    }
  );
}

// Хук для получения новости по ID
export function useNewsById(id: string) {
  return useAppQuery(
    newsKeys.detail(id),
    () => newsApi.getNewsById(id),
    {
      enabled: !!id,
      staleTime: cacheUtils.staleTime.long,
    }
  );
}

// Хук для получения новости по slug
export function useNewsBySlug(slug: string) {
  return useAppQuery(
    newsKeys.bySlug(slug),
    () => newsApi.getNewsBySlug(slug),
    {
      enabled: !!slug,
      staleTime: cacheUtils.staleTime.long,
    }
  );
}

// Хук для поиска новостей
export function useSearchNews(query: string, params?: QueryParams) {
  return useAppQuery(
    newsKeys.search(query, params),
    () => newsApi.searchNews(query, params),
    {
      enabled: !!query && query.length > 2,
      staleTime: cacheUtils.staleTime.short,
      placeholderData: (previousData) => previousData,
    }
  );
}

// Хук для создания новости
export function useCreateNews() {
  const { invalidate } = useInvalidateQueries();

  return useAppMutation(
    (data: CreateNewsData) => newsApi.createNews(data),
    {
      onSuccess: () => {
        // Инвалидируем списки новостей
        invalidate(newsKeys.lists());
      },
    }
  );
}

// Хук для обновления новости
export function useUpdateNews() {
  const { invalidate } = useInvalidateQueries();

  return useAppMutation(
    (data: UpdateNewsData) => newsApi.updateNews(data),
    {
      onSuccess: (updatedNews) => {
        // Инвалидируем списки и конкретную новость
        invalidate(newsKeys.lists());
        invalidate(newsKeys.detail(updatedNews.id));
        if (updatedNews.slug) {
          invalidate(newsKeys.bySlug(updatedNews.slug));
        }
      },
    }
  );
}

// Хук для удаления новости
export function useDeleteNews() {
  const { invalidate } = useInvalidateQueries();

  return useAppMutation(
    (id: string) => newsApi.deleteNews(id),
    {
      onSuccess: () => {
        // Инвалидируем все связанные запросы
        invalidate(newsKeys.all());
      },
    }
  );
}

// Экспорт типов из API слоя
export type { NewsItem, CreateNewsData, UpdateNewsData } from '../api';

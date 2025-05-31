// UI компоненты
export { default as NewsSection } from './ui/NewsSection';
export { NewsCard } from './ui/NewsCard';

// Хуки и типы
export {
  useNews,
  useNewsById,
  useNewsBySlug,
  useSearchNews,
  useCreateNews,
  useUpdateNews,
  useDeleteNews,
  newsKeys,
  type NewsItem,
  type CreateNewsData,
  type UpdateNewsData,
} from './model';

// API
export { newsApi } from './api';

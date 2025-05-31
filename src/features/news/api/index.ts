import { apiClient } from '@shared/api';
import { PaginatedResponse, QueryParams } from '@shared/lib';

// Типы для новостей
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string; // Совместимость с существующим типом
  excerpt?: string;
  publishedAt?: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags?: string[];
  slug?: string;
}

export interface CreateNewsData {
  title: string;
  content: string;
  image: string;
  excerpt?: string;
  tags?: string[];
}

export interface UpdateNewsData extends Partial<CreateNewsData> {
  id: string;
}

// API функции для новостей
export const newsApi = {
  // Получение списка новостей с пагинацией
  getNews: async (params?: QueryParams): Promise<PaginatedResponse<NewsItem>> => {
    const response = await apiClient.get<PaginatedResponse<NewsItem>>('/news', params);
    return response.data;
  },

  // Получение новости по ID
  getNewsById: async (id: string): Promise<NewsItem> => {
    const response = await apiClient.get<NewsItem>(`/news/${id}`);
    return response.data;
  },

  // Получение новости по slug
  getNewsBySlug: async (slug: string): Promise<NewsItem> => {
    const response = await apiClient.get<NewsItem>(`/news/slug/${slug}`);
    return response.data;
  },

  // Создание новости
  createNews: async (data: CreateNewsData): Promise<NewsItem> => {
    const response = await apiClient.post<NewsItem>('/news', data);
    return response.data;
  },

  // Обновление новости
  updateNews: async (data: UpdateNewsData): Promise<NewsItem> => {
    const { id, ...updateData } = data;
    const response = await apiClient.put<NewsItem>(`/news/${id}`, updateData);
    return response.data;
  },

  // Удаление новости
  deleteNews: async (id: string): Promise<void> => {
    await apiClient.delete(`/news/${id}`);
  },

  // Поиск новостей
  searchNews: async (query: string, params?: QueryParams): Promise<PaginatedResponse<NewsItem>> => {
    const response = await apiClient.get<PaginatedResponse<NewsItem>>('/news/search', {
      q: query,
      ...params,
    });
    return response.data;
  },
};

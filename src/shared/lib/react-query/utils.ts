import { QueryKey } from '@tanstack/react-query';

// Фабрика для создания query keys
export const createQueryKey = {
  // Базовые ключи для разных сущностей
  users: () => ['users'] as const,
  user: (id: string | number) => ['users', id] as const,
  userProfile: (id: string | number) => ['users', id, 'profile'] as const,
  
  posts: () => ['posts'] as const,
  post: (id: string | number) => ['posts', id] as const,
  postComments: (id: string | number) => ['posts', id, 'comments'] as const,
  
  // Универсальная функция для создания ключей
  entity: (entity: string, ...params: (string | number | object)[]) => 
    [entity, ...params] as const,
    
  // Ключи с параметрами
  list: (entity: string, params?: object) => 
    params ? [entity, 'list', params] as const : [entity, 'list'] as const,
    
  detail: (entity: string, id: string | number) => 
    [entity, 'detail', id] as const,
    
  infinite: (entity: string, params?: object) => 
    params ? [entity, 'infinite', params] as const : [entity, 'infinite'] as const,
};

// Утилиты для работы с query keys
export const queryKeyUtils = {
  // Проверка, содержит ли ключ определенную сущность
  includes: (queryKey: QueryKey, entity: string): boolean => {
    return Array.isArray(queryKey) && queryKey.includes(entity);
  },
  
  // Получение базовой сущности из ключа
  getEntity: (queryKey: QueryKey): string | undefined => {
    return Array.isArray(queryKey) && queryKey.length > 0 
      ? String(queryKey[0]) 
      : undefined;
  },
  
  // Создание фильтра для invalidation
  createFilter: (entity: string) => ({
    predicate: (query: { queryKey: QueryKey }) => 
      queryKeyUtils.includes(query.queryKey, entity),
  }),
};

// Утилиты для обработки ошибок
export const errorUtils = {
  // Извлечение сообщения об ошибке
  getMessage: (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return String(error.message);
    }
    
    return 'Произошла неизвестная ошибка';
  },
  
  // Проверка типа ошибки
  isNetworkError: (error: unknown): boolean => {
    return error instanceof Error && 
           (error.message.includes('Network') || 
            error.message.includes('fetch'));
  },
  
  // Создание стандартизированной ошибки
  createError: (message: string, code?: string | number): Error => {
    const error = new Error(message);
    if (code) {
      (error as any).code = code;
    }
    return error;
  },
};

// Утилиты для работы с кешем
export const cacheUtils = {
  // Стандартные времена кеширования
  staleTime: {
    short: 1 * 60 * 1000,      // 1 минута
    medium: 5 * 60 * 1000,     // 5 минут
    long: 30 * 60 * 1000,      // 30 минут
    veryLong: 60 * 60 * 1000,  // 1 час
  },
  
  // Стандартные времена жизни кеша
  cacheTime: {
    short: 5 * 60 * 1000,      // 5 минут
    medium: 10 * 60 * 1000,    // 10 минут
    long: 30 * 60 * 1000,      // 30 минут
    veryLong: 60 * 60 * 1000,  // 1 час
  },
};
import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
  QueryKey,
} from '@tanstack/react-query';
import { QueryOptions, MutationOptions, ApiError } from './types';
import { cacheUtils, errorUtils } from './utils';

// Кастомный хук для запросов с предустановленными настройками
export function useAppQuery<
  TQueryFnData = unknown,
  TError = ApiError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TQueryFnData>,
  options?: QueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> {
  return useQuery({
    queryKey,
    queryFn,
    staleTime: cacheUtils.staleTime.medium,
    retry: (failureCount, error) => {
      // Не повторяем запрос для 4xx ошибок
      if (error instanceof Error && error.message.includes('4')) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
}

// Кастомный хук для мутаций с предустановленными настройками
export function useAppMutation<
  TData = unknown,
  TError = ApiError,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: MutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation({
    mutationFn,
    retry: (failureCount, error) => {
      // Повторяем только сетевые ошибки
      if (errorUtils.isNetworkError(error)) {
        return failureCount < 1;
      }
      return false;
    },
    ...options,
  });
}

// Хук для инвалидации кеша
export function useInvalidateQueries() {
  const queryClient = useQueryClient();
  
  return {
    // Инвалидация по ключу
    invalidate: (queryKey: QueryKey) => {
      return queryClient.invalidateQueries({ queryKey });
    },
    
    // Инвалидация по предикату
    invalidateMatching: (predicate: (query: { queryKey: QueryKey }) => boolean) => {
      return queryClient.invalidateQueries({ predicate });
    },
    
    // Инвалидация всех запросов
    invalidateAll: () => {
      return queryClient.invalidateQueries();
    },
    
    // Удаление из кеша
    remove: (queryKey: QueryKey) => {
      return queryClient.removeQueries({ queryKey });
    },
    
    // Сброс всего кеша
    clear: () => {
      return queryClient.clear();
    },
  };
}

// Хук для работы с кешем
export function useQueryCache() {
  const queryClient = useQueryClient();
  
  return {
    // Получение данных из кеша
    getData: <T = unknown>(queryKey: QueryKey): T | undefined => {
      return queryClient.getQueryData<T>(queryKey);
    },
    
    // Установка данных в кеш
    setData: <T = unknown>(queryKey: QueryKey, data: T | ((old: T | undefined) => T)) => {
      return queryClient.setQueryData<T>(queryKey, data);
    },
    
    // Предварительная загрузка данных
    prefetch: <T = unknown>(
      queryKey: QueryKey, 
      queryFn: () => Promise<T>,
      options?: { staleTime?: number }
    ) => {
      return queryClient.prefetchQuery({
        queryKey,
        queryFn,
        staleTime: options?.staleTime ?? cacheUtils.staleTime.medium,
      });
    },
    
    // Проверка наличия данных в кеше
    hasData: (queryKey: QueryKey): boolean => {
      return queryClient.getQueryData(queryKey) !== undefined;
    },
    
    // Получение состояния запроса
    getQueryState: (queryKey: QueryKey) => {
      return queryClient.getQueryState(queryKey);
    },
  };
}

// Хук для оптимистичных обновлений
export function useOptimisticUpdate() {
  const queryClient = useQueryClient();
  
  return {
    // Оптимистичное обновление с откатом при ошибке
    update: async <T = unknown>(
      queryKey: QueryKey,
      updateFn: (old: T | undefined) => T,
      mutationPromise: Promise<T>
    ): Promise<T> => {
      // Отменяем исходящие запросы
      await queryClient.cancelQueries({ queryKey });
      
      // Сохраняем предыдущие данные
      const previousData = queryClient.getQueryData<T>(queryKey);
      
      // Оптимистично обновляем данные
      queryClient.setQueryData<T>(queryKey, updateFn);
      
      try {
        // Выполняем мутацию
        const result = await mutationPromise;
        
        // Обновляем данные результатом мутации
        queryClient.setQueryData<T>(queryKey, result);
        
        return result;
      } catch (error) {
        // Откатываем изменения при ошибке
        queryClient.setQueryData<T>(queryKey, previousData);
        throw error;
      }
    },
  };
}
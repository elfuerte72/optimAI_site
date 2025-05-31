// Типы
export type {
  ApiResponse,
  ApiError,
  QueryOptions,
  MutationOptions,
  PaginationParams,
  PaginatedResponse,
  FilterParams,
  QueryParams,
} from './types';

// Утилиты
export {
  createQueryKey,
  queryKeyUtils,
  errorUtils,
  cacheUtils,
} from './utils';

// Хуки
export {
  useAppQuery,
  useAppMutation,
  useInvalidateQueries,
  useQueryCache,
  useOptimisticUpdate,
} from './hooks';

// Реэкспорт основных типов и хуков из @tanstack/react-query
export {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  type UseQueryResult,
  type UseMutationResult,
  type UseInfiniteQueryResult,
  type QueryKey,
  type QueryClient,
} from '@tanstack/react-query';
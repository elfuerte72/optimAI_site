# Интеграция React Query (TanStack Query) в Next.js 15 проект

## Обзор

В проект успешно интегрирована библиотека React Query (TanStack Query) для эффективного управления состоянием сервера и кеширования данных.

## Установленные пакеты

```bash
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools --save-dev
```

## Структура интеграции

### 1. Глобальный провайдер

**Файл:** `src/app/providers/queryClient.tsx`

Создан глобальный провайдер с предустановленными настройками:
- Время жизни кеша: 5 минут
- Количество повторных попыток: 1
- Отключено обновление при фокусе окна

### 2. DevTools (только для разработки)

**Файл:** `src/app/providers/devtools.tsx`

Интегрированы DevTools для удобства разработки, которые автоматически отключаются в production.

### 3. Типы и утилиты

**Директория:** `src/shared/lib/react-query/`

#### Типы (`types.ts`)
- `ApiResponse<T>` - стандартный формат ответа API
- `ApiError` - типизированные ошибки
- `QueryOptions` и `MutationOptions` - типизированные опции
- `PaginatedResponse<T>` - ответы с пагинацией
- `QueryParams` - параметры запросов

#### Утилиты (`utils.ts`)
- `createQueryKey` - фабрика для создания ключей кеша
- `queryKeyUtils` - утилиты для работы с ключами
- `errorUtils` - обработка ошибок
- `cacheUtils` - настройки кеширования

#### Кастомные хуки (`hooks.ts`)
- `useAppQuery` - обертка над useQuery с предустановками
- `useAppMutation` - обертка над useMutation
- `useInvalidateQueries` - инвалидация кеша
- `useQueryCache` - работа с кешем
- `useOptimisticUpdate` - оптимистичные обновления

### 4. API клиент

**Файл:** `src/shared/api/base.ts`

Базовый API клиент с методами:
- `get()`, `post()`, `put()`, `patch()`, `delete()`
- Автоматическая обработка ошибок
- Типизированные ответы

### 5. Пример использования (Feature News)

**Файлы:**
- `src/features/news/api/index.ts` - API функции
- `src/features/news/model/index.ts` - хуки React Query
- `src/features/news/ui/NewsSectionWithQuery.tsx` - компонент с React Query

#### Доступные хуки для новостей:
```typescript
// Получение списка новостей
const { data, isLoading, error } = useNews({ limit: 10, page: 1 });

// Получение новости по ID
const { data: news } = useNewsById('123');

// Получение новости по slug
const { data: news } = useNewsBySlug('ai-breakthrough');

// Поиск новостей
const { data: searchResults } = useSearchNews('искусственный интеллект');

// Создание новости
const createMutation = useCreateNews();

// Обновление новости
const updateMutation = useUpdateNews();

// Удаление новости
const deleteMutation = useDeleteNews();
```

## Ключевые особенности

### 1. Автоматическое кеширование
- Данные кешируются автоматически
- Настраиваемое время жизни кеша
- Автоматическая инвалидация при мутациях

### 2. Обработка состояний
- Loading состояния
- Error состояния с retry функциональностью
- Empty состояния

### 3. Оптимизация производительности
- Дедупликация запросов
- Background refetching
- Optimistic updates

### 4. TypeScript поддержка
- Полная типизация всех API
- Автокомплит в IDE
- Проверка типов на этапе компиляции

## Использование в компонентах

### Базовый пример:
```tsx
'use client';
import { useNews } from '@features/news';

export function NewsList() {
  const { data, isLoading, error, refetch } = useNews({ limit: 5 });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      {data?.data.map(news => (
        <div key={news.id}>{news.title}</div>
      ))}
    </div>
  );
}
```

### Пример с мутацией:
```tsx
'use client';
import { useCreateNews } from '@features/news';

export function CreateNewsForm() {
  const createNews = useCreateNews();

  const handleSubmit = (data) => {
    createNews.mutate(data, {
      onSuccess: () => {
        console.log('Новость создана!');
      },
      onError: (error) => {
        console.error('Ошибка:', error.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* форма */}
    </form>
  );
}
```

## DevTools

В режиме разработки доступны React Query DevTools:
- Просмотр всех запросов и их состояний
- Инспекция кеша
- Ручная инвалидация
- Мониторинг производительности

## Рекомендации

1. **Используйте предустановленные хуки** (`useAppQuery`, `useAppMutation`) вместо базовых
2. **Создавайте ключи кеша** через `createQueryKey` для консистентности
3. **Обрабатывайте все состояния** (loading, error, empty)
4. **Используйте оптимистичные обновления** для лучшего UX
5. **Настраивайте время кеширования** в зависимости от типа данных

## Следующие шаги

1. Добавить infinite queries для пагинации
2. Реализовать offline support
3. Добавить prefetching для критических данных
4. Настроить background sync
5. Добавить метрики производительности
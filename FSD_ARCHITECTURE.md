# Feature-Sliced Design Architecture

Этот проект использует архитектуру Feature-Sliced Design (FSD) для лучшей организации кода.

## Структура проекта

```
src/
├── app/                    # Next.js App Router - маршруты приложения
├── features/               # Фичи приложения
│   ├── chat/              # Функциональность чата
│   │   ├── ui/            # UI компоненты чата
│   │   ├── model/         # Бизнес-логика, хуки, типы
│   │   └── api/           # API запросы для чата
│   └── news/              # Функциональность новостей
│       ├── ui/            # UI компоненты новостей
│       ├── model/         # Бизнес-логика новостей
│       └── api/           # API запросы для новостей
├── shared/                # Переиспользуемые элементы
│   ├── ui/                # Общие UI компоненты
│   ├── lib/               # Утилиты и хелперы
│   └── config/            # Глобальные конфиги
├── entities/              # Доменные типы и данные
└── components/            # Legacy компоненты (для постепенной миграции)
```

## Слои архитектуры

### 1. App Layer (`src/app/`)
- Next.js маршруты и страницы
- Глобальные стили и конфигурация
- API endpoints

### 2. Features Layer (`src/features/`)
Изолированные фичи приложения:

#### Chat Feature (`features/chat/`)
- `ui/` - ChatWidget, ChatSection
- `model/` - useChat хук, типы, eventBus
- `api/` - sendMessage, checkApiHealth

#### News Feature (`features/news/`)
- `ui/` - NewsSection, NewsCard
- `model/` - пока заглушки
- `api/` - пока заглушки

### 3. Shared Layer (`src/shared/`)
Переиспользуемые элементы:

#### UI (`shared/ui/`)
- StyledButton
- StyledInput
- QuickQuestionButtons

#### Lib (`shared/lib/`)
- cn (className утилита)
- fonts (шрифты)
- performance (оптимизации)
- StyledComponentsRegistry

#### Config (`shared/config/`)
- Глобальные конфигурации (пока пусто)

### 4. Entities Layer (`src/entities/`)
Доменные типы и данные:
- news.ts - типы новостей
- newsData.ts - данные новостей

## Путевые алиасы

В `tsconfig.json` настроены следующие алиасы:

```json
{
  "@/*": ["./src/*"],
  "@features/*": ["./src/features/*"],
  "@shared/*": ["./src/shared/*"],
  "@entities/*": ["./src/entities/*"]
}
```

## Примеры использования

### Импорт компонентов чата:
```typescript
import { ChatWidget, ChatSection } from '@features/chat';
import { useChat } from '@features/chat';
```

### Импорт shared компонентов:
```typescript
import { StyledButton, StyledInput } from '@shared/ui';
import { cn, rafThrottle } from '@shared/lib';
```

### Импорт entities:
```typescript
import { NewsItem, newsItems } from '@entities/news';
```

## Правила FSD

1. **Нисходящие зависимости**: верхние слои могут использовать нижние, но не наоборот
2. **Изоляция фич**: фичи не должны напрямую зависеть друг от друга
3. **Shared как единственное исключение**: все слои могут использовать shared
4. **Entities для общих типов**: доменные типы, используемые в разных фичах

## Следующие шаги

1. Постепенно мигрировать оставшиеся компоненты из `components/` в соответствующие слои
2. Добавить новые фичи в `features/`
3. Расширить `shared/config/` для глобальных настроек
4. Добавить больше entities по мере необходимости
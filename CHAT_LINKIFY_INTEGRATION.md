# Интеграция автоматического преобразования URL в ссылки в чат-приложении

## Краткое описание изменений

Обновлен чат-компонент для автоматического преобразования URL в кликабельные ссылки, которые открываются в новой вкладке с безопасными атрибутами.

## Установленные зависимости

```bash
npm install react-linkify
```

## Созданные файлы

### 1. `src/features/chat/ui/components/ChatMessage.tsx`
Новый компонент для отображения сообщений с автоматическим преобразованием URL в ссылки.

**Ключевые особенности:**
- Использует `react-linkify` для автоматического обнаружения URL
- Fallback функция с регулярными выражениями при недоступности `react-linkify`
- Кастомный декоратор для ссылок с безопасными атрибутами
- Поддержка accessibility (ARIA-атрибуты)
- Responsive дизайн с Tailwind CSS

### 2. `src/features/chat/ui/components/index.ts`
Индексный файл для экспорта компонента.

### 3. `__tests__/features/chat/ui/components/ChatMessage.test.tsx`
Полный набор unit тестов для проверки функциональности.

## Модифицированные файлы

### 1. `src/features/chat/ui/ChatSection.tsx`
- Добавлен импорт `ChatMessage` компонента
- Заменён рендеринг сообщений на использование `ChatMessage`

### 2. `src/features/chat/ui/ChatWidget.tsx`
- Добавлен импорт `ChatMessage` компонента
- Обновлён рендеринг сообщений с использованием нового компонента

## Функциональность

### Автоматическое преобразование URL
Компонент автоматически обнаруживает и преобразует в ссылки:
- HTTP и HTTPS URL
- URL с параметрами запроса
- URL с фрагментами
- Telegram ссылки (например, `https://t.me/username`)

### Безопасность
Все ссылки открываются с атрибутами:
- `target="_blank"` - открытие в новой вкладке
- `rel="noopener noreferrer"` - защита от уязвимостей

### Fallback функциональность
При недоступности `react-linkify` используется fallback с регулярными выражениями:
```javascript
const urlRegex = /(https?:\/\/[^\s]+)/g;
```

## Примеры использования

### Простое сообщение с URL
```
Входной текст: "Contact manager: https://t.me/serg_scherbina"
Результат: "Contact manager: " + <a href="https://t.me/serg_scherbina" target="_blank" rel="noopener noreferrer">https://t.me/serg_scherbina</a>
```

### Сообщение с несколькими URL
```
Входной текст: "Посетите https://example.com и https://google.com"
Результат: "Посетите " + <a>https://example.com</a> + " и " + <a>https://google.com</a>
```

## Тестирование

Запуск тестов:
```bash
npm test -- __tests__/features/chat/ui/components/ChatMessage.test.tsx
```

### Покрытие тестами
- ✅ Обычный текст без URL
- ✅ Сообщение с одним URL
- ✅ Сообщение с несколькими URL
- ✅ Telegram ссылки
- ✅ HTTP и HTTPS протоколы
- ✅ URL с параметрами и фрагментами
- ✅ CSS классы для разных типов отправителей
- ✅ Кастомные CSS классы
- ✅ Accessibility атрибуты

## Стилизация

Ссылки стилизованы с помощью Tailwind CSS:
```css
.text-blue-400 .hover:text-blue-300 .underline .transition-colors .duration-200
```

## Accessibility

- Все ссылки имеют описательные `aria-label` атрибуты
- Сообщения имеют `role="article"` и соответствующие `aria-label`
- Поддержка screen readers

## Производительность

- Компонент оптимизирован для React
- Использует `break-words` для корректного переноса длинных URL
- Минимальное влияние на производительность рендеринга

## Совместимость

- ✅ Next.js 15.3.0
- ✅ React 19.0.0
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Jest + React Testing Library

## Команды для проверки

```bash
# Установка зависимостей
npm install

# Запуск тестов
npm test

# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build
```
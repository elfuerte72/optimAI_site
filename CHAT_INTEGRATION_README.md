# 🤖 Интеграция OptimaAI Chat Bot

## 📋 Статус интеграции

✅ **API клиент настроен**
✅ **Next.js API Routes созданы**
✅ **ChatSection интегрирован**
✅ **ChatWidget добавлен**
✅ **QuickQuestions компонент создан**
✅ **Переменные окружения настроены**

## 🚀 Быстрый запуск

### 1. Запуск бэкенда

Согласно руководству интеграции, сначала запустите бэкенд:

```bash
cd /Users/maximpenkin/Documents/openai/site/backend
python main.py
```

Бэкенд будет доступен по адресу: `http://localhost:8000`

### 2. Запуск фронтенда

```bash
cd /Users/maximpenkin/Documents/openai/site/optimAI_site
npm run dev
```

Фронтенд будет доступен по адресу: `http://localhost:3000`

## 🔧 Настройка

### Переменные окружения

Файл `.env.local` уже создан со следующими настройками:

```env
# URL бэкенда для API роутов Next.js
API_URL=http://localhost:8000

# Опциональный API ключ (если требуется)
# API_KEY=your_optional_api_key_for_authentication
```

### Проверка работоспособности

1. **Health Check**: `http://localhost:3000/api/health`
2. **Chat API**: `http://localhost:3000/api/chat`

## 🎯 Интегрированные компоненты

### 1. ChatSection
- Основной чат на главной странице
- Автоматическое приветственное сообщение
- Интеграция с QuickQuestions
- Обработка ошибок и fallback сообщения

### 2. ChatWidget
- Плавающий чат-виджет в правом нижнем углу
- Анимированная кнопка с иконкой мозга
- Независимая история сообщений
- Настраиваемое приветственное сообщение

### 3. QuickQuestions
- Кнопки быстрых вопросов
- Интеграция с ChatSection через Context API
- Популярные вопросы о компании и услугах

## 🔗 API Endpoints

### Next.js API Routes

#### `/api/health`
- **Метод**: GET
- **Описание**: Проверка доступности бэкенда
- **Ответ**: Статус здоровья API

#### `/api/chat`
- **Метод**: POST
- **Описание**: Отправка сообщений боту
- **Тело запроса**:
```json
{
  "messages": [
    {"role": "user", "content": "Привет!"}
  ],
  "use_cache": true,
  "stream": false
}
```

## 🛠️ Архитектура

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # Проксирование к бэкенду
│   │   └── health/route.ts        # Health check
│   ├── page.tsx                   # Серверный компонент
│   └── ClientHomePage.tsx         # Клиентский компонент
├── features/
│   └── chat/
│       ├── api/
│       │   └── sendMessage.ts     # API клиент
│       └── ui/
│           ├── ChatSection.tsx    # Основной чат
│           ├── ChatWidget.tsx     # Плавающий виджет
│           └── QuickQuestions.tsx # Быстрые вопросы
```

## 🔄 Поток данных

1. **Пользователь** отправляет сообщение
2. **ChatSection/ChatWidget** → API клиент (`sendMessage.ts`)
3. **API клиент** → Next.js API Route (`/api/chat`)
4. **Next.js API Route** → OptimaAI Backend (`http://localhost:8000/chat`)
5. **Ответ** возвращается по обратному пути

## 🎨 Особенности UI/UX

### ChatSection
- Адаптивный дизайн
- Анимации появления сообщений
- Индикатор набора текста
- Автоматическое открытие при отправке сообщения

### ChatWidget
- Анимированная FAB кнопка
- Плавные переходы открытия/закрытия
- Компактный дизайн для мобильных устройств
- Временные метки сообщений

### QuickQuestions
- Сетка адаптивных кнопок
- Hover эффекты
- Интеграция с основным чатом

## 🚨 Обработка ошибок

### Сценарии ошибок
1. **Бэкенд недоступен**: Показ fallback сообщения
2. **Ошибка сети**: Уведомление о проблемах соединения
3. **Ошибка API**: Обработка и показ пользовательских сообщений

### Fallback сообщения
- Информативные сообщения об ошибках
- Предложения альтернативных способов связи
- Сохранение пользовательского опыта

## 📱 Адаптивность

- **Мобильные устройства**: Оптимизированный интерфейс
- **Планшеты**: Адаптивная сетка кнопок
- **Десктоп**: Полнофункциональный интерфейс

## 🔒 Безопасность

- Проксирование через Next.js API Routes
- Опциональная аутентификация через API ключи
- Валидация входных данных
- CORS настройки

## 🧪 Тестирование

### Ручное тестирование
1. Откройте `http://localhost:3000`
2. Проверьте появление приветственного сообщения
3. Отправьте тестовое сообщение
4. Проверьте работу быстрых вопросов
5. Протестируйте чат-виджет

### API тестирование
```bash
# Health check
curl http://localhost:3000/api/health

# Chat test
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Привет!"}]}'
```

## 📈 Мониторинг

- Логи в консоли браузера
- Network tab для отслеживания API запросов
- Проверка статуса бэкенда через health endpoint

## 🔄 Обновления

При обновлении бэкенда:
1. Проверьте совместимость API
2. Обновите типы в `sendMessage.ts` при необходимости
3. Протестируйте все сценарии использования

---

**Статус**: ✅ Готов к использованию
**Последнее обновление**: 01.06.2025
**Версия интеграции**: 1.0.0
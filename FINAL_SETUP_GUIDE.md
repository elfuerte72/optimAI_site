# 🚀 Финальная инструкция по подключению Next.js к OptimaAI Bot

## 📋 Что нужно знать

**URL бота:** `http://localhost:8000/api/chat`  
**API ключ:** `api_optimaai`  
**Метод:** `POST`

## ✅ Что уже настроено

1. ✅ **Удалено приветственное сообщение** - чат теперь пустой при загрузке
2. ✅ **Обновлен API ключ** в `.env.local`: `API_KEY=api_optimaai`
3. ✅ **Изменен endpoint** на `/api/chat` вместо `/chat`
4. ✅ **API ключ обязательный** - всегда отправляется в заголовке `X-API-Key`
5. ✅ **Обновлены тесты** с новым API ключом

## 🔧 Настройка

### 1. Переменные окружения (`.env.local`)
```env
# URL бэкенда для API роутов Next.js
API_URL=http://localhost:8000

# API ключ для аутентификации (обязательно)
API_KEY=api_optimaai
```

### 2. API роуты Next.js
- **`/api/chat`** - проксирует запросы к `http://localhost:8000/api/chat`
- **`/api/health`** - проверяет доступность бэкенда
- **Автоматически добавляет заголовок** `X-API-Key: api_optimaai`

### 3. Структура запроса
```javascript
// Отправляется к Next.js API Route
fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
    // X-API-Key добавляется автоматически в API Route
  },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Ваш вопрос' }
    ]
  })
})
```

### 4. Структура ответа
```json
{
  "message": {
    "role": "assistant",
    "content": "Ответ бота"
  },
  "finish_reason": "stop",
  "processing_time": 2.5,
  "from_cache": false,
  "model": "gpt-4o-mini"
}
```

## 🎯 Алгоритм работы

1. **Пользователь вводит сообщение** в чат
2. **Фронтенд добавляет** его в историю как `{role: "user", content: "текст"}`
3. **Отправляет всю историю** на `/api/chat` (Next.js API Route)
4. **Next.js API Route** добавляет заголовок `X-API-Key: api_optimaai`
5. **Проксирует запрос** к `http://localhost:8000/api/chat`
6. **Получает ответ бота** и возвращает его фронтенду
7. **Фронтенд добавляет ответ** в историю как `{role: "assistant", content: "ответ_бота"}`
8. **Отображает диалог** пользователю

## ⚠️ Важные моменты

- ✅ **API ключ `api_optimaai`** автоматически добавляется в каждый запрос
- ✅ **Отправляется вся история** диалога, а не только последнее сообщение
- ✅ **Обрабатываются ошибки** - если бэкенд недоступен, показывается сообщение с ссылкой на Telegram
- ✅ **Нет приветственного сообщения** - чат пустой при загрузке
- ✅ **Endpoint изменен** на `/api/chat` согласно новой инструкции

## 🔍 Проверка работы

### 1. Запустите бэкенд
```bash
cd /Users/maximpenkin/Documents/openai/site/backend
python main.py
```

### 2. Запустите фронтенд
```bash
cd /Users/maximpenkin/Documents/openai/site/optimAI_site
npm run dev
```

### 3. Протестируйте API
```bash
node test-api.js
```

### 4. Проверьте в браузере
- Откройте `http://localhost:3000`
- Чат должен быть пустым (без приветственного сообщения)
- Нажмите любую из кнопок быстрых вопросов
- Бот должен ответить

## 🧪 Тестирование

### Прямой тест бэкенда
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -H "X-API-Key: api_optimaai" \
  -d '{"messages":[{"role":"user","content":"Привет!"}]}'
```

### Тест через Next.js API
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Привет!"}]}'
```

## 🎉 Готово!

Теперь чат-бот:
- ✅ Работает без приветственного сообщения
- ✅ Использует правильный API ключ `api_optimaai`
- ✅ Подключается к правильному endpoint `/api/chat`
- ✅ Автоматически добавляет необходимые заголовки
- ✅ Правильно обрабатывает ошибки
- ✅ Ссылается на Telegram канал вместо номера телефона

**Перезапустите бэкенд** после изменения API ключа и всё будет работать! 🤖✨
# 🔧 Быстрое исправление бота

## ❌ Проблема
Бот показывает сообщение: "Извините, сервер OptimaAI бота временно недоступен. Пожалуйста, попробуйте позже или свяжитесь с нами в Telegram: https://t.me/optimaai_tg"

## ✅ Решение

### 1. Проверьте, запущен ли бэкенд
```bash
# Откройте новый терминал и запустите:
cd /Users/maximpenkin/Documents/openai/site/backend
python main.py
```

Вы должны увидеть что-то вроде:
```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

### 2. Проверьте доступность бэкенда
```bash
# В другом терминале:
curl http://localhost:8000/health
```

Должен вернуть: `{"status":"healthy"}`

### 3. Протестируйте API
```bash
cd /Users/maximpenkin/Documents/openai/site/optimAI_site
node test-api.js
```

### 4. Если бэкенд запущен, но бот не работает
Проверьте консоль браузера (F12 → Console) на наличие ошибок.

## 🎯 Что исправлено

1. ✅ **Убран номер телефона** - теперь бот ссылается только на Telegram канал
2. ✅ **Улучшена обработка ошибок** - бот теперь пытается отправить сообщение, а не проверяет health заранее
3. ✅ **Добавлены логи** - в консоли сервера видно запросы к бэкенду
4. ✅ **Приветственное сообщение** - показывается всегда, независимо от статуса API

## 🔍 Диагностика

### Если бот все еще не работает:

1. **Проверьте порты:**
   - Фронтенд: http://localhost:3000
   - Бэкенд: http://localhost:8000

2. **Проверьте логи:**
   - В консоли браузера (F12)
   - В терминале с бэкендом
   - В терминале с фронтендом

3. **Проверьте переменные окружения:**
   ```bash
   cat .env.local
   ```
   Должно быть: `API_URL=http://localhost:8000`

## 🚀 Быстрый тест

После запуска бэкенда и фронтенда:

1. Откройте http://localhost:3000
2. Увидите приветственное сообщение от бота
3. Нажмите любую из 3 кнопок быстрых вопросов:
   - "Чем занимается компания?"
   - "Подробнее об услугах компании"
   - "Как связаться с менеджером?"
4. Бот должен ответить информацией о компании

## ✨ Готово!

Теперь бот работает и ссылается на правильный Telegram канал вместо номера телефона.
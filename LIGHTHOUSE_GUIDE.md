# 🔍 Lighthouse Аудит для OptimaAI

Этот проект настроен для автоматического аудита производительности и SEO с помощью Google Lighthouse.

## 📋 Что включено

- **Lighthouse 12.2.1** - последняя версия инструмента аудита
- **Chrome Launcher** - для автоматического запуска браузера
- **Автоматический скрипт** - запускает сервер и выполняет аудит
- **HTML отчеты** - детальные отчеты сохраняются в папке `reports/`

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск полного аудита (рекомендуется)
```bash
# Собирает проект и запускает аудит
npm run lighthouse:build
```

### 3. Запуск аудита без пересборки
```bash
# Требует предварительной сборки: npm run build
npm run lighthouse
```

## 📊 Что проверяется

### Основные категории:
- ⚡ **Performance** - скорость загрузки и отзывчивость
- 🔍 **SEO** - оптимизация для поисковых систем  
- ♿ **Accessibility** - доступность для пользователей с ограниченными возможностями
- ✅ **Best Practices** - соблюдение лучших практик веб-разработки

### Ключевые метрики производительности:
- **First Contentful Paint (FCP)** - время до первого контента
- **Largest Contentful Paint (LCP)** - время до основного контента
- **Cumulative Layout Shift (CLS)** - стабильность макета
- **Total Blocking Time (TBT)** - время блокировки
- **Speed Index** - индекс скорости

## 📁 Структура отчетов

```
reports/
├── lighthouse-report-2024-01-15.html  # HTML отчет с детальным анализом
├── lighthouse-report-2024-01-16.html  # Отчеты сохраняются по датам
└── ...
```

## 🎯 Интерпретация результатов

### Оценки (0-100):
- 🟢 **90-100** - Отлично
- 🟡 **50-89** - Требует улучшения  
- 🔴 **0-49** - Плохо

### Рекомендуемые пороги для продакшена:
- **Performance**: ≥ 90
- **SEO**: ≥ 95
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 90

## 🛠️ Настройка

### Изменение URL для аудита
Отредактируйте `scripts/lighthouse-audit.js`:
```javascript
const CONFIG = {
  url: 'http://localhost:3000',  // Измените URL здесь
  port: 3000,
  // ...
};
```

### Настройка категорий аудита
В файле `scripts/lighthouse-audit.js` найдите:
```javascript
const lighthouseConfig = {
  settings: {
    onlyCategories: ['performance', 'seo', 'accessibility', 'best-practices'],
    // Добавьте или уберите категории по необходимости
  }
};
```

### Настройка устройства (мобильный/десктоп)
```javascript
const lighthouseConfig = {
  settings: {
    formFactor: 'desktop',  // или 'mobile'
    screenEmulation: {
      mobile: false,        // true для мобильного
      width: 1350,         // ширина экрана
      height: 940,         // высота экрана
    }
  }
};
```

## 🔧 Устранение неполадок

### Ошибка "Chrome not found"
```bash
# macOS
brew install google-chrome

# Ubuntu/Debian
sudo apt-get install google-chrome-stable

# Windows
# Скачайте Chrome с официального сайта
```

### Ошибка "Port already in use"
```bash
# Найти процесс на порту 3000
lsof -ti:3000

# Завершить процесс
kill -9 $(lsof -ti:3000)
```

### Ошибка "Server timeout"
Увеличьте таймаут в `scripts/lighthouse-audit.js`:
```javascript
await waitForServer(CONFIG.url, 60000); // 60 секунд вместо 30
```

## 📈 Оптимизация производительности

### Основные рекомендации:

1. **Изображения**
   - Используйте современные форматы (WebP, AVIF)
   - Добавьте атрибуты `width` и `height`
   - Реализуйте lazy loading

2. **CSS и JavaScript**
   - Минифицируйте файлы
   - Используйте code splitting
   - Удалите неиспользуемый код

3. **Шрифты**
   - Используйте `font-display: swap`
   - Предзагружайте критичные шрифты
   - Оптимизируйте размер шрифтов

4. **SEO**
   - Добавьте мета-теги
   - Используйте семантическую разметку
   - Оптимизируйте заголовки страниц

## 🔄 Автоматизация

### Интеграция в CI/CD
Добавьте в ваш workflow:
```yaml
- name: Run Lighthouse Audit
  run: |
    npm ci
    npm run lighthouse:build
    
- name: Upload Lighthouse Report
  uses: actions/upload-artifact@v3
  with:
    name: lighthouse-report
    path: reports/
```

### Регулярные проверки
Настройте cron job для регулярного аудита:
```bash
# Каждый день в 2:00
0 2 * * * cd /path/to/project && npm run lighthouse:build
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте, что все зависимости установлены: `npm install`
2. Убедитесь, что проект собирается: `npm run build`
3. Проверьте доступность Chrome: `google-chrome --version`
4. Просмотрите логи в консоли для диагностики

---

**Совет**: Запускайте аудит регулярно, особенно перед деплоем в продакшен, чтобы отслеживать изменения производительности и SEO метрик.
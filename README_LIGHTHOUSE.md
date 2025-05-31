# 🔍 Lighthouse Аудит - Быстрый старт

## Установка и запуск

### 1. Установите зависимости
```bash
npm install
```

### 2. Запустите полный аудит (рекомендуется)
```bash
npm run lighthouse:build
```

### 3. Или запустите аудит без пересборки
```bash
npm run lighthouse
```

## 📊 Что вы получите

- **HTML отчет** в папке `reports/` с детальным анализом
- **Оценки** по 4 категориям: Performance, SEO, Accessibility, Best Practices
- **Ключевые метрики** производительности в консоли
- **SEO рекомендации** для улучшения

## 🎯 Целевые показатели

- **Performance**: ≥ 90
- **SEO**: ≥ 95  
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 90

## 📁 Файлы

- `scripts/lighthouse-audit.js` - основной скрипт
- `reports/` - папка с отчетами
- `LIGHTHOUSE_GUIDE.md` - подробная документация

## 🔧 Устранение неполадок

**Ошибка "Port in use"**: Скрипт автоматически освобождает порт 3000

**Ошибка "Chrome not found"**: Установите Google Chrome

**Медленная работа**: Проверьте, что проект собран (`npm run build`)

---

Подробная документация в файле `LIGHTHOUSE_GUIDE.md`
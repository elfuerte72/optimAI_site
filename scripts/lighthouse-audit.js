#!/usr/bin/env node

/**
 * Lighthouse Audit Script для OptimaAI
 * 
 * Этот скрипт:
 * 1. Запускает Next.js сервер в production режиме
 * 2. Выполняет Lighthouse аудит главной страницы
 * 3. Генерирует HTML отчет в папке reports/
 * 4. Выводит основные метрики в консоль
 * 
 * Использование:
 * npm run lighthouse:build  - собрать проект и запустить аудит
 * npm run lighthouse        - запустить аудит (требует предварительной сборки)
 */

const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Конфигурация
const CONFIG = {
  url: 'http://localhost:3000',
  port: 3000,
  outputDir: 'reports',
  reportName: `lighthouse-report-${new Date().toISOString().split('T')[0]}.html`
};

// Создание директории для отчетов
function ensureReportsDir() {
  const reportsPath = path.join(process.cwd(), CONFIG.outputDir);
  if (!fs.existsSync(reportsPath)) {
    fs.mkdirSync(reportsPath, { recursive: true });
    console.log(`📁 Создана директория: ${CONFIG.outputDir}/`);
  }
}

// Проверка доступности сервера
async function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  
  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        console.log(`✅ Сервер доступен: ${url}`);
        return true;
      }
    } catch (error) {
      // Сервер еще не готов
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  throw new Error(`❌ Сервер не отвечает после ${timeout}ms: ${url}`);
}

// Освобождение порта
async function killPortProcess(port) {
  try {
    const { stdout } = await execAsync(`lsof -ti:${port}`);
    if (stdout.trim()) {
      const pids = stdout.trim().split('\n');
      for (const pid of pids) {
        await execAsync(`kill -9 ${pid}`);
        console.log(`🛑 Остановлен процесс ${pid} на порту ${port}`);
      }
      // Даем время процессу завершиться
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  } catch (error) {
    // Порт свободен или ошибка - продолжаем
  }
}

// Запуск Next.js сервера
function startNextServer() {
  return new Promise((resolve, reject) => {
    console.log('🚀 Запуск Next.js сервера...');
    
    const server = spawn('npm', ['start'], {
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true
    });

    let serverReady = false;

    server.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`[Next.js] ${output.trim()}`);
      
      if (output.includes('Ready') || output.includes('started server')) {
        serverReady = true;
        resolve(server);
      }
    });

    server.stderr.on('data', (data) => {
      const error = data.toString();
      console.error(`[Next.js Error] ${error.trim()}`);
    });

    server.on('error', (error) => {
      reject(new Error(`Ошибка запуска сервера: ${error.message}`));
    });

    // Таймаут для запуска сервера
    setTimeout(() => {
      if (!serverReady) {
        server.kill();
        reject(new Error('Таймаут запуска Next.js сервера'));
      }
    }, 15000);
  });
}

// Запуск Lighthouse через CLI
async function runLighthouse() {
  console.log('🔍 Запуск Lighthouse аудита...');
  
  const reportPath = path.join(process.cwd(), CONFIG.outputDir, CONFIG.reportName);
  
  const lighthouseCmd = [
    'npx lighthouse',
    CONFIG.url,
    '--output=html',
    '--output=json',
    `--output-path=${reportPath.replace('.html', '')}`,
    '--only-categories=performance,seo,accessibility,best-practices',
    '--form-factor=desktop',
    '--throttling-method=devtools',
    '--screenEmulation.mobile=false',
    '--screenEmulation.width=1350',
    '--screenEmulation.height=940',
    '--chrome-flags="--headless --no-sandbox --disable-dev-shm-usage"',
    '--quiet'
  ].join(' ');

  try {
    const { stdout, stderr } = await execAsync(lighthouseCmd);
    
    if (stderr && !stderr.includes('ChromeLauncher')) {
      console.warn('⚠️ Lighthouse warnings:', stderr);
    }
    
    return {
      htmlPath: `${reportPath.replace('.html', '.report.html')}`,
      jsonPath: `${reportPath.replace('.html', '.report.json')}`
    };
  } catch (error) {
    throw new Error(`Ошибка выполнения Lighthouse: ${error.message}`);
  }
}

// Чтение и вывод результатов из JSON отчета
async function displayResults(jsonPath) {
  try {
    if (!fs.existsSync(jsonPath)) {
      console.log('📊 HTML отчет создан, но JSON недоступен для детального анализа');
      return;
    }

    const reportData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const categories = reportData.categories;
    
    console.log('\n🎯 РЕЗУЛЬТАТЫ LIGHTHOUSE АУДИТА');
    console.log('================================');
    console.log(`📍 URL: ${reportData.finalUrl}`);
    console.log(`⏱️  Время аудита: ${new Date(reportData.fetchTime).toLocaleString('ru-RU')}`);
    console.log('\n📈 ОЦЕНКИ:');
    
    Object.keys(categories).forEach(categoryId => {
      const category = categories[categoryId];
      const score = Math.round(category.score * 100);
      const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
      console.log(`${emoji} ${category.title}: ${score}/100`);
    });

    // Ключевые метрики производительности
    if (categories.performance) {
      console.log('\n⚡ КЛЮЧЕВЫЕ МЕТРИКИ ПРОИЗВОДИТЕЛЬНОСТИ:');
      const audits = reportData.audits;
      
      const metrics = [
        { key: 'first-contentful-paint', name: 'First Contentful Paint' },
        { key: 'largest-contentful-paint', name: 'Largest Contentful Paint' },
        { key: 'cumulative-layout-shift', name: 'Cumulative Layout Shift' },
        { key: 'total-blocking-time', name: 'Total Blocking Time' },
        { key: 'speed-index', name: 'Speed Index' }
      ];

      metrics.forEach(metric => {
        const audit = audits[metric.key];
        if (audit && audit.displayValue) {
          console.log(`   ${metric.name}: ${audit.displayValue}`);
        }
      });
    }

    // SEO рекомендации
    if (categories.seo && categories.seo.score < 0.9) {
      console.log('\n🔍 SEO РЕКОМЕНДАЦИИ:');
      const seoAudits = reportData.audits;
      const failedSeoAudits = Object.keys(seoAudits)
        .filter(key => seoAudits[key].score !== null && seoAudits[key].score < 1)
        .slice(0, 5);
      
      failedSeoAudits.forEach(auditKey => {
        const audit = seoAudits[auditKey];
        if (audit.title && audit.description) {
          console.log(`   ⚠️  ${audit.title}`);
        }
      });
    }

    console.log('\n✨ Аудит завершен успешно!');
  } catch (error) {
    console.log('📊 HTML отчет создан, но возникла ошибка при чтении JSON:', error.message);
  }
}

// Основная функция
async function main() {
  let server = null;
  
  try {
    console.log('🎯 Запуск Lighthouse аудита для OptimaAI');
    console.log('=========================================\n');

    // Создаем директорию для отчетов
    ensureReportsDir();

    // Освобождаем порт если занят
    await killPortProcess(CONFIG.port);

    // Запускаем Next.js сервер
    server = await startNextServer();
    
    // Ждем готовности сервера
    await waitForServer(CONFIG.url);
    
    // Небольшая пауза для стабилизации
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Запускаем Lighthouse
    const { htmlPath, jsonPath } = await runLighthouse();
    
    console.log(`📊 HTML отчет сохранен: ${htmlPath}`);
    
    // Выводим результаты
    await displayResults(jsonPath);
    
    console.log(`\n📁 Откройте отчет в браузере: file://${htmlPath}`);
    
  } catch (error) {
    console.error('❌ Ошибка при выполнении аудита:', error.message);
    process.exit(1);
  } finally {
    // Останавливаем сервер
    if (server) {
      console.log('\n🛑 Остановка сервера...');
      server.kill();
      
      // Даем время серверу корректно завершиться
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

// Обработка сигналов завершения
process.on('SIGINT', () => {
  console.log('\n🛑 Получен сигнал прерывания. Завершение работы...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Получен сигнал завершения. Завершение работы...');
  process.exit(0);
});

// Запуск
if (require.main === module) {
  main();
}

module.exports = { main, CONFIG };
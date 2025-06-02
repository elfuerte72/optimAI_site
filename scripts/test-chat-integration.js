#!/usr/bin/env node

/**
 * Скрипт для тестирования интеграции чат-бота
 */

const http = require('http');

const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:8000';

console.log('🤖 Тестирование интеграции OptimaAI Chat Bot\n');

// Функция для выполнения HTTP запроса
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    if (options.method === 'POST' && options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

// Тест 1: Проверка доступности бэкенда
async function testBackendHealth() {
  console.log('1️⃣ Проверка доступности бэкенда...');
  try {
    const response = await makeRequest(`${BACKEND_URL}/health`);
    if (response.statusCode === 200) {
      console.log('✅ Бэкенд доступен');
      return true;
    } else {
      console.log(`❌ Бэкенд недоступен (статус: ${response.statusCode})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Ошибка подключения к бэкенду: ${error.message}`);
    return false;
  }
}

// Тест 2: Проверка Next.js API health endpoint
async function testFrontendHealthAPI() {
  console.log('2️⃣ Проверка Next.js API health endpoint...');
  try {
    const response = await makeRequest(`${FRONTEND_URL}/api/health`);
    if (response.statusCode === 200) {
      console.log('✅ Next.js health API работает');
      return true;
    } else {
      console.log(`❌ Next.js health API недоступен (статус: ${response.statusCode})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Ошибка подключения к Next.js API: ${error.message}`);
    return false;
  }
}

// Тест 3: Проверка Next.js chat API
async function testFrontendChatAPI() {
  console.log('3️⃣ Проверка Next.js chat API...');
  try {
    const testMessage = {
      messages: [
        { role: 'user', content: 'Тестовое сообщение' }
      ],
      use_cache: false,
      stream: false
    };

    const response = await makeRequest(`${FRONTEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testMessage)
    });

    if (response.statusCode === 200) {
      console.log('✅ Next.js chat API работает');
      try {
        const data = JSON.parse(response.data);
        if (data.message && data.message.content) {
          console.log(`📝 Ответ бота: "${data.message.content.substring(0, 50)}..."`);
        }
      } catch (e) {
        console.log('⚠️ Не удалось распарсить ответ');
      }
      return true;
    } else {
      console.log(`❌ Next.js chat API недоступен (статус: ${response.statusCode})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Ошибка тестирования chat API: ${error.message}`);
    return false;
  }
}

// Тест 4: Проверка доступности фронтенда
async function testFrontendAvailability() {
  console.log('4️⃣ Проверка доступности фронтенда...');
  try {
    const response = await makeRequest(FRONTEND_URL);
    if (response.statusCode === 200) {
      console.log('✅ Фронтенд доступен');
      return true;
    } else {
      console.log(`❌ Фронтенд недоступен (статус: ${response.statusCode})`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Ошибка подключения к фронтенду: ${error.message}`);
    return false;
  }
}

// Основная функция тестирования
async function runTests() {
  const results = [];
  
  results.push(await testBackendHealth());
  results.push(await testFrontendAvailability());
  results.push(await testFrontendHealthAPI());
  results.push(await testFrontendChatAPI());
  
  console.log('\n📊 Результаты тестирования:');
  console.log('================================');
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log(`✅ Пройдено: ${passed}/${total} тестов`);
  
  if (passed === total) {
    console.log('🎉 Все тесты пройдены! Интеграция работает корректно.');
    console.log('\n📝 Следующие шаги:');
    console.log('1. Откройте http://localhost:3000 в браузере');
    console.log('2. Проверьте работу чата на главной странице');
    console.log('3. Протестируйте чат-виджет в правом нижнем углу');
    console.log('4. Попробуйте быстрые вопросы');
  } else {
    console.log('❌ Некоторые тесты не пройдены. Проверьте настройки.');
    console.log('\n🔧 Возможные решения:');
    console.log('1. Убедитесь, что бэкенд запущен: cd backend && python main.py');
    console.log('2. Убедитесь, что фронтенд запущен: npm run dev');
    console.log('3. Проверьте переменные окружения в .env.local');
  }
  
  process.exit(passed === total ? 0 : 1);
}

// Запуск тестов
runTests().catch(console.error);
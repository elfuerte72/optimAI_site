#!/usr/bin/env node

/**
 * Тест нового API с ключом api_optimaai
 */

const http = require('http');

console.log('🤖 Тестирование нового API OptimaAI Bot\n');

// Тест прямого подключения к бэкенду
async function testBackendDirect() {
  console.log('1️⃣ Тестирование прямого подключения к бэкенду...');
  
  const testMessage = JSON.stringify({
    messages: [
      { role: 'user', content: 'Расскажи о компании OptimaAI' }
    ]
  });
  
  return new Promise((resolve, reject) => {
    const req = http.request('http://localhost:8000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'api_optimaai',
        'Content-Length': Buffer.byteLength(testMessage)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(data);
            if (response.message && response.message.content) {
              console.log(`✅ Ответ бота: "${response.message.content.substring(0, 100)}..."`);
              resolve(true);
            } else {
              console.log(`❌ Неожиданный формат ответа:`, response);
              resolve(false);
            }
          } catch (e) {
            console.log(`❌ Ошибка парсинга JSON:`, data);
            resolve(false);
          }
        } else {
          console.log(`❌ Ошибка: ${res.statusCode} - ${data}`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.error('❌ Ошибка подключения к бэкенду:', err.message);
      resolve(false);
    });
    
    req.write(testMessage);
    req.end();
  });
}

// Тест через Next.js API Route
async function testNextjsApi() {
  console.log('\n2️⃣ Тестирование через Next.js API Route...');
  
  const testMessage = JSON.stringify({
    messages: [
      { role: 'user', content: 'Какие услуги предоставляет компания?' }
    ]
  });
  
  return new Promise((resolve, reject) => {
    const req = http.request('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(testMessage)
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(data);
            if (response.message && response.message.content) {
              console.log(`✅ Ответ через Next.js: "${response.message.content.substring(0, 100)}..."`);
              resolve(true);
            } else {
              console.log(`❌ Неожиданный формат ответа:`, response);
              resolve(false);
            }
          } catch (e) {
            console.log(`❌ Ошибка парсинга JSON:`, data);
            resolve(false);
          }
        } else {
          console.log(`❌ Ошибка: ${res.statusCode} - ${data}`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.error('❌ Ошибка подключения к Next.js:', err.message);
      resolve(false);
    });
    
    req.write(testMessage);
    req.end();
  });
}

// Основная функция
async function runTests() {
  try {
    const backendOk = await testBackendDirect();
    const nextjsOk = await testNextjsApi();
    
    console.log('\n📊 Результаты:');
    console.log(`Прямое подключение к бэкенду: ${backendOk ? '✅' : '❌'}`);
    console.log(`Через Next.js API Route: ${nextjsOk ? '✅' : '❌'}`);
    
    if (backendOk && nextjsOk) {
      console.log('\n🎉 Все тесты пройдены! Новый API работает корректно.');
      console.log('\n📝 Что проверено:');
      console.log('✅ API ключ api_optimaai работает');
      console.log('✅ Endpoint /api/chat доступен');
      console.log('✅ Next.js правильно проксирует запросы');
      console.log('✅ Бот отвечает на вопросы');
    } else {
      console.log('\n❌ Некоторые тесты не пройдены.');
      console.log('\n🔧 Проверьте:');
      if (!backendOk) {
        console.log('1. Запущен ли бэкенд: cd backend && python main.py');
        console.log('2. Доступен ли endpoint: http://localhost:8000/api/chat');
        console.log('3. Правильный ли API ключ: api_optimaai');
      }
      if (!nextjsOk) {
        console.log('4. Запущен ли фронтенд: npm run dev');
        console.log('5. Правильные ли переменные в .env.local');
      }
    }
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
  }
}

runTests();
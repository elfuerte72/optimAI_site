#!/usr/bin/env node

/**
 * Простой тест API для проверки работы чат-бота
 */

const http = require('http');

// Тест health endpoint
async function testHealth() {
  console.log('🔍 Тестирование /api/health...');
  
  return new Promise((resolve, reject) => {
    const req = http.request('http://localhost:3000/api/health', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Response: ${data}`);
        resolve(res.statusCode === 200);
      });
    });
    
    req.on('error', (err) => {
      console.error('Ошибка:', err.message);
      reject(err);
    });
    
    req.end();
  });
}

// Тест chat endpoint
async function testChat() {
  console.log('\n💬 Тестирование /api/chat с новым API ключом...');
  
  const testMessage = JSON.stringify({
    messages: [
      { role: 'user', content: 'Привет! Расскажи о компании OptimaAI' }
    ]
  });
  
  return new Promise((resolve, reject) => {
    const req = http.request('http://localhost:3000/api/chat', {
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
      });
    });
    
    req.on('error', (err) => {
      console.error('Ошибка:', err.message);
      reject(err);
    });
    
    req.write(testMessage);
    req.end();
  });
}

// Основная функция
async function runTests() {
  console.log('🤖 Тестирование API OptimaAI Chat Bot\n');
  
  try {
    const healthOk = await testHealth();
    const chatOk = await testChat();
    
    console.log('\n📊 Результаты:');
    console.log(`Health API: ${healthOk ? '✅' : '❌'}`);
    console.log(`Chat API: ${chatOk ? '✅' : '❌'}`);
    
    if (healthOk && chatOk) {
      console.log('\n🎉 Все тесты пройдены! Бот работает корректно.');
    } else {
      console.log('\n❌ Некоторые тесты не пройдены.');
      console.log('\n🔧 Проверьте:');
      console.log('1. Запущен ли фронтенд: npm run dev');
      console.log('2. Запущен ли бэкенд: cd backend && python main.py');
      console.log('3. Доступен ли бэкенд на http://localhost:8000');
    }
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
  }
}

runTests();
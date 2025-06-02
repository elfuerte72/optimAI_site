#!/usr/bin/env node

/**
 * Тест с оригинальным форматом запроса из INTEGRATION_GUIDE.md
 */

const http = require('http');

console.log('🔍 Тест с оригинальным форматом запроса\n');

// Тест с полным форматом из руководства
async function testOriginalFormat() {
  console.log('1️⃣ Тест с полным форматом из INTEGRATION_GUIDE.md...');
  
  const testMessage = JSON.stringify({
    messages: [
      { role: 'user', content: 'Расскажи о компании Optima AI' }
    ],
    use_cache: false,
    stream: false
  });
  
  return new Promise((resolve) => {
    const req = http.request('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'your_optional_api_key_for_authentication',
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
            console.log(`✅ Успех! Ответ: "${response.message.content.substring(0, 100)}..."`);
            resolve(true);
          } catch (e) {
            console.log(`❌ Ошибка парсинга: ${data.substring(0, 200)}...`);
            resolve(false);
          }
        } else {
          console.log(`❌ Ошибка ${res.statusCode}: ${data.substring(0, 200)}...`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.error('❌ Ошибка подключения:', err.message);
      resolve(false);
    });
    
    req.write(testMessage);
    req.end();
  });
}

// Тест без API ключа но с полным форматом
async function testOriginalFormatNoKey() {
  console.log('\n2️⃣ Тест с полным форматом без API ключа...');
  
  const testMessage = JSON.stringify({
    messages: [
      { role: 'user', content: 'Расскажи о компании Optima AI' }
    ],
    use_cache: false,
    stream: false
  });
  
  return new Promise((resolve) => {
    const req = http.request('http://localhost:8000/chat', {
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
            console.log(`✅ Успех! Ответ: "${response.message.content.substring(0, 100)}..."`);
            resolve(true);
          } catch (e) {
            console.log(`❌ Ошибка парсинга: ${data.substring(0, 200)}...`);
            resolve(false);
          }
        } else {
          console.log(`❌ Ошибка ${res.statusCode}: ${data.substring(0, 200)}...`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.error('❌ Ошибка подключения:', err.message);
      resolve(false);
    });
    
    req.write(testMessage);
    req.end();
  });
}

// Основная функция
async function runTests() {
  try {
    const withKeyOk = await testOriginalFormat();
    const withoutKeyOk = await testOriginalFormatNoKey();
    
    console.log('\n📊 Результаты:');
    console.log(`С API ключом: ${withKeyOk ? '✅' : '❌'}`);
    console.log(`Без API ключа: ${withoutKeyOk ? '✅' : '❌'}`);
    
    if (withKeyOk) {
      console.log('\n✅ Найдено решение: используйте оригинальный API ключ и полный формат запроса');
    } else if (withoutKeyOk) {
      console.log('\n✅ Найдено решение: уберите API ключ и используйте полный формат запроса');
    } else {
      console.log('\n❌ Проблема не решена - проверьте логи бэкенда');
    }
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
  }
}

runTests();
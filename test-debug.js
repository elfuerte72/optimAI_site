#!/usr/bin/env node

/**
 * Отладочный тест для выяснения проблемы с API
 */

const http = require('http');

console.log('🔍 Отладка API OptimaAI Bot\n');

// Тест 1: Без API ключа
async function testWithoutApiKey() {
  console.log('1️⃣ Тест без API ключа...');
  
  const testMessage = JSON.stringify({
    messages: [
      { role: 'user', content: 'Привет' }
    ]
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
        console.log(`Response: ${data.substring(0, 200)}...`);
        resolve(res.statusCode === 200);
      });
    });
    
    req.on('error', (err) => {
      console.error('❌ Ошибка:', err.message);
      resolve(false);
    });
    
    req.write(testMessage);
    req.end();
  });
}

// Тест 2: Со старым API ключом
async function testWithOldApiKey() {
  console.log('\n2️⃣ Тест со старым API ключом...');
  
  const testMessage = JSON.stringify({
    messages: [
      { role: 'user', content: 'Привет' }
    ]
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
        console.log(`Response: ${data.substring(0, 200)}...`);
        resolve(res.statusCode === 200);
      });
    });
    
    req.on('error', (err) => {
      console.error('❌ Ошибка:', err.message);
      resolve(false);
    });
    
    req.write(testMessage);
    req.end();
  });
}

// Тест 3: С новым API ключом
async function testWithNewApiKey() {
  console.log('\n3️⃣ Тест с новым API ключом...');
  
  const testMessage = JSON.stringify({
    messages: [
      { role: 'user', content: 'Привет' }
    ]
  });
  
  return new Promise((resolve) => {
    const req = http.request('http://localhost:8000/chat', {
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
        console.log(`Response: ${data.substring(0, 200)}...`);
        resolve(res.statusCode === 200);
      });
    });
    
    req.on('error', (err) => {
      console.error('❌ Ошибка:', err.message);
      resolve(false);
    });
    
    req.write(testMessage);
    req.end();
  });
}

// Тест 4: Health check
async function testHealth() {
  console.log('\n4️⃣ Тест health endpoint...');
  
  return new Promise((resolve) => {
    const req = http.request('http://localhost:8000/health', {
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
      console.error('❌ Ошибка:', err.message);
      resolve(false);
    });
    
    req.end();
  });
}

// Основная функция
async function runDebugTests() {
  try {
    const healthOk = await testHealth();
    const withoutKeyOk = await testWithoutApiKey();
    const withOldKeyOk = await testWithOldApiKey();
    const withNewKeyOk = await testWithNewApiKey();
    
    console.log('\n📊 Результаты отладки:');
    console.log(`Health endpoint: ${healthOk ? '✅' : '❌'}`);
    console.log(`Без API ключа: ${withoutKeyOk ? '✅' : '❌'}`);
    console.log(`Старый API ключ: ${withOldKeyOk ? '✅' : '❌'}`);
    console.log(`Новый API ключ: ${withNewKeyOk ? '✅' : '❌'}`);
    
    console.log('\n💡 Рекомендации:');
    if (healthOk) {
      console.log('✅ Бэкенд запущен и отвечает');
    } else {
      console.log('❌ Бэкенд недоступен - запустите: cd backend && python main.py');
    }
    
    if (withoutKeyOk) {
      console.log('✅ API работает без ключа - уберите API ключ из настроек');
    } else if (withOldKeyOk) {
      console.log('✅ API работает со старым ключом - используйте старый ключ');
    } else if (withNewKeyOk) {
      console.log('✅ API работает с новым ключом - всё настроено правильно');
    } else {
      console.log('❌ API не работает ни с одним вариантом - проверьте бэкенд');
    }
    
  } catch (error) {
    console.error('❌ Ошибка при отладке:', error.message);
  }
}

runDebugTests();
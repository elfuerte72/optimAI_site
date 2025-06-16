import { NextResponse } from 'next/server';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: Message[];
  stream?: boolean;
  use_cache?: boolean;
}

export async function POST(request: Request) {
  try {
    // Получаем тело запроса
    const body: ChatRequest = await request.json();

    // Проверяем обязательные поля
    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: 'Необходимо предоставить массив сообщений.' },
        { status: 400 }
      );
    }

    // URL для бэкенда (возвращаемся к старому endpoint)
    const apiUrl = `${process.env.API_URL || 'http://localhost:8000'}/chat`;

    // Передаем запрос в бэкенд с опциональным API ключом
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Добавляем обязательный API ключ
    const apiKey = process.env.API_KEY || 'api_optimaai';
    headers['X-API-Key'] = apiKey;

    console.log(`Отправка запроса к бэкенду: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    // Если запрос неуспешен, возвращаем статус ошибки
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.detail || 'Ошибка API' },
        { status: response.status }
      );
    }

    // Получаем данные и возвращаем их
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Ошибка в /api/chat:', error);

    // Безопасное получение сообщения об ошибке
    const errorText = error instanceof Error ? error.message : String(error);

    // Проверяем, есть ли проблема с подключением к бэкенду
    const isConnectionError = errorText.includes('ECONNREFUSED') ||
      errorText.includes('fetch failed') ||
      errorText.includes('network');

    let errorMessage = 'Внутренняя ошибка сервера.';
    let botMessage = 'Извините, произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте позже.';

    if (isConnectionError) {
      errorMessage = 'Не удалось подключиться к бэкенду.';
      botMessage = 'Извините, сервер OptimaAI бота временно недоступен. Пожалуйста, попробуйте позже или свяжитесь с нами в Telegram: https://t.me/academyOptima';
    }

    if (error instanceof SyntaxError) {
      errorMessage = 'Некорректный формат запроса.';
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    // Возвращаем ответ в формате бота
    return NextResponse.json(
      {
        message: {
          role: 'assistant',
          content: botMessage,
        },
        finish_reason: 'error',
        error: errorMessage
      },
      { status: 200 } // Возвращаем 200, чтобы фронтенд мог обработать ответ
    );
  }
}

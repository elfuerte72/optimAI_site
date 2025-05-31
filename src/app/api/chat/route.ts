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

    // URL для бэкенда
    const apiUrl = process.env.API_URL || 'http://localhost:8000/chat';

    // Передаем запрос в бэкенд
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    let errorMessage = 'Внутренняя ошибка сервера.';
    if (error instanceof SyntaxError) {
      // Ошибка парсинга JSON
      errorMessage = 'Некорректный формат запроса.';
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    // Для других типов ошибок возвращаем сообщение, совместимое с форматом ожидаемого ответа
    return NextResponse.json(
      {
        error: errorMessage,
        message: {
          role: 'assistant',
          content:
            'Извините, произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте позже.',
        },
      },
      { status: 500 }
    );
  }
}

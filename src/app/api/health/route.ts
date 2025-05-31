import { NextResponse } from 'next/server';

/**
 * API маршрут для проверки доступности бэкенда
 * @route GET /api/health
 */
export async function GET() {
  try {
    // URL для бэкенда
    const apiUrl = process.env.API_URL || 'http://localhost:8000/health';

    // Отправляем запрос к бэкенду
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      next: { revalidate: 10 }, // Кэширование на 10 секунд
    });

    // Если запрос неуспешен, возвращаем статус ошибки
    if (!response.ok) {
      return NextResponse.json({ error: 'API недоступен' }, { status: response.status });
    }

    // Получаем данные и возвращаем их
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API health check failed:', error);
    return NextResponse.json({ error: 'Ошибка соединения с API' }, { status: 500 });
  }
}

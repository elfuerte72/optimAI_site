import { NextResponse } from 'next/server';

interface RequestBody {
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const userMessage = body.message;

    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
      return NextResponse.json({ error: 'Сообщение не может быть пустым.' }, { status: 400 });
    }

    // Имитация ответа от AI
    // В реальном приложении здесь был бы вызов к вашему AI бэкенду
    // Например: const aiResponse = await getAiResponse(userMessage);
    const aiReply = `AI Ответ на ваше сообщение: "${userMessage}". Это заглушка, ожидающая интеграции с реальным AI.`;

    return NextResponse.json({ reply: aiReply });

  } catch (error) {
    console.error('Ошибка в /api/chat:', error);
    let errorMessage = 'Внутренняя ошибка сервера.';
    if (error instanceof SyntaxError) { // Ошибка парсинга JSON
        errorMessage = 'Некорректный формат запроса.';
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    // Для других типов ошибок можно добавить более специфичную обработку
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 
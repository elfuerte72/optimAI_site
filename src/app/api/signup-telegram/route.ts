import { NextResponse } from 'next/server';

interface SignUpRequestBody {
  name?: string;
  contact?: string;
  service?: string;
  comment?: string;
}

// Helper function to escape markdown V2 characters for Telegram
function escapeMarkdownV2(text: string): string {
  const ESCAPE_CHARS = /[_*\[\]()~`>#+\-=|{}.!]/g;
  return text.replace(ESCAPE_CHARS, '\\$&');
}

export async function POST(request: Request) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram Bot Token or Chat ID not configured in environment variables.');
    return NextResponse.json(
      { error: 'Ошибка конфигурации сервера: не удалось отправить уведомление.' }, 
      { status: 500 }
    );
  }

  try {
    const body: SignUpRequestBody = await request.json();
    const { name, contact, service, comment } = body;

    if (!name || !contact || !service) {
      return NextResponse.json(
        { error: 'Пожалуйста, заполните все обязательные поля: Имя, Контакт и Услуга.' }, 
        { status: 400 }
      );
    }

    // Construct the message for Telegram
    let messageText = `🔔 *Новая заявка с сайта Optima AI* 🔔\n\n`;
    messageText += `*Имя:* ${escapeMarkdownV2(name)}\n`;
    messageText += `*Контакт:* ${escapeMarkdownV2(contact)}\n`;
    messageText += `*Услуга:* ${escapeMarkdownV2(service)}\n`;
    if (comment && comment.trim() !== '') {
      messageText += `*Комментарий:* ${escapeMarkdownV2(comment)}\n`;
    }
    messageText += `\n_Это автоматическое уведомление._`;
    
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: 'MarkdownV2',
      }),
    });

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok || !telegramResult.ok) {
      console.error('Telegram API Error:', telegramResult);
      return NextResponse.json(
        { error: 'Не удалось отправить уведомление в Telegram. Пожалуйста, свяжитесь с нами напрямую.' }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Ваша заявка успешно отправлена! Мы скоро свяжемся с вами.' });

  } catch (error) {
    console.error('Error in /api/signup-telegram:', error);
    if (error instanceof SyntaxError) {
        return NextResponse.json({ error: 'Некорректный формат запроса.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Внутренняя ошибка сервера при обработке заявки.' }, { status: 500 });
  }
} 
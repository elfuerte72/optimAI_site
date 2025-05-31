'use client';

import React, { useState } from 'react';
import { StyledButton } from './';
import { eventBus } from '@features/chat';

export default function QuickQuestionButtons() {
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  // Обработчик нажатия на кнопку с вопросом
  const handleQuestionClick = (question: string) => {
    console.log('Нажата кнопка:', question);

    // Визуальная индикация нажатия кнопки
    setClickedButton(question);

    // Отправляем событие через Event Bus
    eventBus.emit('send_message', question);

    // Сбросить состояние кнопки через короткое время
    setTimeout(() => setClickedButton(null), 500);
  };

  return (
    <div className="mx-auto mb-8 flex w-full max-w-4xl flex-wrap justify-center gap-2">
      <StyledButton
        onClick={() => handleQuestionClick('Чем занимается компания?')}
        className={clickedButton === 'Чем занимается компания?' ? 'opacity-70' : ''}
        data-testid="company-info-button"
      >
        Чем занимается компания?
      </StyledButton>
      <StyledButton
        onClick={() => handleQuestionClick('Подробнее об услугах компании')}
        className={clickedButton === 'Подробнее об услугах компании' ? 'opacity-70' : ''}
        data-testid="services-info-button"
      >
        Подробнее об услугах компании
      </StyledButton>
      <StyledButton
        onClick={() => handleQuestionClick('Как связаться с менеджером?')}
        className={clickedButton === 'Как связаться с менеджером?' ? 'opacity-70' : ''}
        data-testid="contact-manager-button"
      >
        Как связаться с менеджером?
      </StyledButton>
    </div>
  );
}

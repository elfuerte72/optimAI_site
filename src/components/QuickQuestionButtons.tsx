'use client';

import React from 'react';
import StyledButton from './StyledButton';
import { useChatContext } from './ChatSection';

export default function QuickQuestionButtons() {
  // Use the chat context hook at the component level
  const chatContext = useChatContext();
  
  // Handle clicking a question button
  const handleQuestionClick = (question: string) => {
    chatContext.processAndSendMessage(question);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-wrap justify-center gap-2 mb-8">
      <StyledButton 
        onClick={() => handleQuestionClick("Чем занимается компания?")}
      >
        Чем занимается компания?
      </StyledButton>
      <StyledButton 
        onClick={() => handleQuestionClick("Подробнее об услугах компании")}
      >
        Подробнее об услугах компании
      </StyledButton>
      <StyledButton 
        onClick={() => handleQuestionClick("Как связаться с менеджером?")}
      >
        Как связаться с менеджером?
      </StyledButton>
    </div>
  );
}

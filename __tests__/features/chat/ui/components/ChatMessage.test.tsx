import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChatMessage } from '@/features/chat/ui/components/ChatMessage';

describe('ChatMessage', () => {
  it('renders plain text message without URLs', () => {
    const plainText = 'Это обычное сообщение без ссылок';
    
    render(<ChatMessage text={plainText} sender="user" />);
    
    expect(screen.getByText(plainText)).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders message with single URL as clickable link', () => {
    const messageWithUrl = 'Посетите наш сайт: https://example.com';
    
    render(<ChatMessage text={messageWithUrl} sender="bot" />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveTextContent('https://example.com');
  });

  it('renders message with multiple URLs as clickable links', () => {
    const messageWithMultipleUrls = 'Посетите https://example.com и https://google.com для получения информации';
    
    render(<ChatMessage text={messageWithMultipleUrls} sender="bot" />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    
    expect(links[0]).toHaveAttribute('href', 'https://example.com');
    expect(links[0]).toHaveAttribute('target', '_blank');
    expect(links[0]).toHaveAttribute('rel', 'noopener noreferrer');
    
    expect(links[1]).toHaveAttribute('href', 'https://google.com');
    expect(links[1]).toHaveAttribute('target', '_blank');
    expect(links[1]).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Telegram contact manager URL correctly', () => {
    const telegramMessage = 'Contact manager: https://t.me/serg_scherbina';
    
    render(<ChatMessage text={telegramMessage} sender="bot" />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://t.me/serg_scherbina');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveTextContent('https://t.me/serg_scherbina');
    
    // Проверяем, что текст до ссылки тоже отображается
    expect(screen.getByText(/Contact manager:/)).toBeInTheDocument();
  });

  it('applies correct CSS classes for user messages', () => {
    render(<ChatMessage text="User message" sender="user" />);
    
    const messageElement = screen.getByRole('article');
    expect(messageElement).toHaveClass('bg-blue-600', 'text-white');
  });

  it('applies correct CSS classes for bot messages', () => {
    render(<ChatMessage text="Bot message" sender="bot" />);
    
    const messageElement = screen.getByRole('article');
    expect(messageElement).toHaveClass('bg-neutral-800', 'text-white', 'border', 'border-blue-500/30');
  });

  it('handles HTTP and HTTPS URLs correctly', () => {
    const messageWithBothProtocols = 'HTTP: http://example.com и HTTPS: https://secure.com';
    
    render(<ChatMessage text={messageWithBothProtocols} sender="bot" />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    
    expect(links[0]).toHaveAttribute('href', 'http://example.com');
    expect(links[1]).toHaveAttribute('href', 'https://secure.com');
  });

  it('handles URLs with query parameters and fragments', () => {
    const complexUrl = 'Ссылка: https://example.com/path?param=value&other=123#section';
    
    render(<ChatMessage text={complexUrl} sender="bot" />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com/path?param=value&other=123#section');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-test-class';
    
    render(<ChatMessage text="Test message" sender="user" className={customClass} />);
    
    const messageElement = screen.getByRole('article');
    expect(messageElement).toHaveClass(customClass);
  });

  it('has proper accessibility attributes', () => {
    render(<ChatMessage text="Test message with https://example.com" sender="user" />);
    
    const messageElement = screen.getByRole('article');
    expect(messageElement).toHaveAttribute('aria-label', 'Сообщение от пользователя');
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Открыть ссылку https://example.com в новой вкладке');
  });
});
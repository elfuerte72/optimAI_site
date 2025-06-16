import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChatMessage } from './ChatMessage';

describe('ChatMessage', () => {
  it('should render basic text without links', () => {
    render(<ChatMessage text="Привет, как дела?" sender="user" />);
    expect(screen.getByText('Привет, как дела?')).toBeInTheDocument();
  });

  it('should render Telegram links as clickable', () => {
    const text = 'Свяжитесь с нами: https://t.me/serg_scherbina';
    render(<ChatMessage text={text} sender="bot" />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://t.me/serg_scherbina');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should handle Telegram links with @ prefix', () => {
    const text = 'Напишите нам @https://t.me/serg_scherbina';
    render(<ChatMessage text={text} sender="bot" />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://t.me/serg_scherbina');
  });

  it('should handle Telegram links without protocol', () => {
    const text = 'Наш канал: t.me/serg_scherbina';
    render(<ChatMessage text={text} sender="bot" />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://t.me/serg_scherbina');
  });

  it('should handle telegram.me links', () => {
    const text = 'Контакт: telegram.me/serg_scherbina';
    render(<ChatMessage text={text} sender="bot" />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://telegram.me/serg_scherbina');
  });

  it('should handle multiple links in one message', () => {
    const text = 'Наши контакты: https://t.me/serg_scherbina и https://example.com';
    render(<ChatMessage text={text} sender="bot" />);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://t.me/serg_scherbina');
    expect(links[1]).toHaveAttribute('href', 'https://example.com');
  });

  it('should preserve text around links', () => {
    const text = 'Начало текста https://t.me/serg_scherbina конец текста';
    render(<ChatMessage text={text} sender="bot" />);
    
    expect(screen.getByText('Начало текста', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('конец текста', { exact: false })).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
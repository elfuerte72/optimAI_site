/**
 * Простой Event Bus для коммуникации между компонентами
 */

type EventCallback = (...args: any[]) => void;

interface EventBus {
  on(event: string, callback: EventCallback): void;
  off(event: string, callback: EventCallback): void;
  emit(event: string, ...args: any[]): void;
}

class EventBusImpl implements EventBus {
  private events: Record<string, EventCallback[]> = {};

  on(event: string, callback: EventCallback): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event: string, callback: EventCallback): void {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  emit(event: string, ...args: any[]): void {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((callback) => {
      callback(...args);
    });
  }
}

// Создаем единственный экземпляр Event Bus
const eventBus = new EventBusImpl();

export default eventBus;

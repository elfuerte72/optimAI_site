/**
 * Throttle function to limit how often a function can be called
 * @param callback Function to throttle
 * @param delay Delay in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(callback: T, delay: number): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
}

/**
 * Debounce function to delay execution until after a period of inactivity
 * @param callback Function to debounce
 * @param delay Delay in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(callback: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

/**
 * RAF throttle - use requestAnimationFrame to optimize DOM reads/writes
 * @param callback Function to optimize
 */
export function rafThrottle<T extends (...args: any[]) => any>(callback: T): (...args: Parameters<T>) => void {
  let ticking = false;
  return (...args: Parameters<T>) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback(...args);
        ticking = false;
      });
      ticking = true;
    }
  };
}
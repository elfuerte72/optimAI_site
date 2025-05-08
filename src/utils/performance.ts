// Utility for performance optimizations

/**
 * A throttled version of requestAnimationFrame that prevents excessive function calls
 * @param callback The function to throttle
 * @returns A throttled function that executes at most once per animation frame
 */
export const rafThrottle = <T extends (...args: any[]) => any>(callback: T): ((...args: Parameters<T>) => void) => {
  let requestId: number | null = null;

  return (...args: Parameters<T>) => {
    if (requestId === null) {
      requestId = requestAnimationFrame(() => {
        callback(...args);
        requestId = null;
      });
    }
  };
};

/**
 * Sets up intersection observer for lazy loading elements
 * @param selector CSS selector for elements to observe
 * @param threshold Visibility threshold to trigger loading
 * @param callback Function to call when element becomes visible
 */
export const setupIntersectionObserver = (
  selector: string,
  threshold = 0.1,
  callback: (element: Element) => void
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold, rootMargin: '200px 0px' }
  );

  document.querySelectorAll(selector).forEach((el) => {
    observer.observe(el);
  });

  return observer;
};

/**
 * Prefetches a page to improve perceived load time
 * @param href The URL to prefetch
 */
export const prefetchPage = (href: string): void => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.as = 'document';
  document.head.appendChild(link);
};

/**
 * Browser-only font loading optimization
 * @param fontFamilies Array of font family names to optimize
 */
export const optimizeFontLoading = (fontFamilies: string[]): void => {
  if (typeof window === 'undefined') return;

  // Add font-display: swap to ensure text remains visible during font loading
  const style = document.createElement('style');
  const fontFaceRules = fontFamilies
    .map((font) => `
      @font-face {
        font-family: "${font}";
        font-display: swap;
      }
    `)
    .join('');

  style.textContent = fontFaceRules;
  document.head.appendChild(style);
};
// Utility for performance optimizations

/**
 * A throttled version of requestAnimationFrame that prevents excessive function calls
 * @param callback The function to throttle
 * @returns A throttled function that executes at most once per animation frame
 */
export const rafThrottle = <T extends (...args: any[]) => any>(
  callback: T
): ((...args: Parameters<T>) => void) => {
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

// Removed prefetchPage as it is not used, and next/link provides built-in prefetching.
// /**
//  * Prefetches a page to improve perceived load time
//  * @param href The URL to prefetch
//  */
// export const prefetchPage = (href: string): void => {
//   const link = document.createElement('link');
//   link.rel = 'prefetch';
//   link.href = href;
//   link.as = 'document';
//   document.head.appendChild(link);
// };

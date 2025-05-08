import { setupIntersectionObserver } from './performance';

/**
 * Sets up lazy loading for below-the-fold elements
 * - Lazy loads images with data-src attributes
 * - Loads components when they come into view
 */
export const setupLazyLoading = (): void => {
  if (typeof window === 'undefined') return;

  // Lazy load images
  setupIntersectionObserver('[data-src]', 0.01, (element) => {
    const img = element as HTMLImageElement;
    if (img.dataset.src) {
      img.src = img.dataset.src;
      delete img.dataset.src;
      
      img.onload = () => {
        img.classList.add('loaded');
        img.classList.remove('lazy-image');
      };
    }
  });

  // Lazy load background images
  setupIntersectionObserver('[data-bg]', 0.01, (element) => {
    const el = element as HTMLElement;
    if (el.dataset.bg) {
      el.style.backgroundImage = `url(${el.dataset.bg})`;
      delete el.dataset.bg;
      
      // Add a loaded class for transition effects
      setTimeout(() => {
        el.classList.add('bg-loaded');
      }, 50);
    }
  });

  // Animate elements into view
  setupIntersectionObserver('.animate-on-scroll', 0.1, (element) => {
    setTimeout(() => {
      element.classList.add('in-view');
    }, 100);
  });
};

/**
 * Preloads critical images to improve LCP
 * @param imageUrls Array of image URLs to preload
 */
export const preloadCriticalImages = (imageUrls: string[]): void => {
  if (typeof window === 'undefined') return;
  
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Preloads fonts to avoid CLS
 * @param fontUrls Array of font URLs to preload
 */
export const preloadFonts = (fontUrls: string[]): void => {
  if (typeof window === 'undefined') return;
  
  fontUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = url;
    document.head.appendChild(link);
  });
};
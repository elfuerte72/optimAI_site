/**
 * Utility for lazy loading images and other resources
 */

/**
 * Set up an Intersection Observer to lazy load elements
 * @param selector CSS selector for elements to lazy load
 * @param options Custom options for the Intersection Observer
 */
export function setupLazyLoading(
  selector: string = '[data-lazy]',
  options: IntersectionObserverInit = { 
    rootMargin: '200px 0px', 
    threshold: 0.01 
  }
): void {
  // Check if Intersection Observer is supported
  if (!('IntersectionObserver' in window)) {
    // For browsers that don't support Intersection Observer, load all immediately
    const elements = document.querySelectorAll(selector);
    elements.forEach(loadElement);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadElement(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Observe all elements with the data-lazy attribute
  document.querySelectorAll(selector).forEach(element => {
    observer.observe(element);
  });
}

/**
 * Load a lazy element (image, iframe, etc.)
 * @param element The DOM element to load
 */
function loadElement(element: Element): void {
  if (element instanceof HTMLImageElement) {
    const src = element.dataset.src;
    if (src) {
      element.src = src;
      element.classList.add('loaded');
    }
  } else if (element instanceof HTMLIFrameElement) {
    const src = element.dataset.src;
    if (src) {
      element.src = src;
      element.classList.add('loaded');
    }
  }
  
  // Remove the lazy attribute to prevent reloading
  element.removeAttribute('data-lazy');
  element.removeAttribute('data-src');
}
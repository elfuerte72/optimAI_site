'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function ReactQueryDevtoolsProvider() {
  // Показываем DevTools только в development режиме
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <ReactQueryDevtools 
      initialIsOpen={false}
      buttonPosition="bottom-left"
    />
  );
}
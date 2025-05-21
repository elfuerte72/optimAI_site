/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind v4 конфигурация
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  rules: [
    // Определение правил для цветов через CSS переменные
    ['bg-background', { backgroundColor: 'hsl(var(--background))' }],
    ['text-foreground', { color: 'hsl(var(--foreground))' }],
    ['bg-primary', { backgroundColor: 'hsl(var(--primary))' }],
    ['text-primary', { color: 'hsl(var(--primary))' }],
    ['text-primary-foreground', { color: 'hsl(var(--primary-foreground))' }],
    ['bg-primary-foreground', { backgroundColor: 'hsl(var(--primary-foreground))' }],
    ['bg-secondary', { backgroundColor: 'hsl(var(--secondary))' }],
    ['text-secondary', { color: 'hsl(var(--secondary))' }],
    ['text-secondary-foreground', { color: 'hsl(var(--secondary-foreground))' }],
    ['bg-secondary-foreground', { backgroundColor: 'hsl(var(--secondary-foreground))' }],
    ['bg-muted', { backgroundColor: 'hsl(var(--muted))' }],
    ['text-muted', { color: 'hsl(var(--muted))' }],
    ['text-muted-foreground', { color: 'hsl(var(--muted-foreground))' }],
    ['bg-muted-foreground', { backgroundColor: 'hsl(var(--muted-foreground))' }],
    ['bg-accent', { backgroundColor: 'hsl(var(--accent))' }],
    ['text-accent', { color: 'hsl(var(--accent))' }],
    ['text-accent-foreground', { color: 'hsl(var(--accent-foreground))' }],
    ['bg-accent-foreground', { backgroundColor: 'hsl(var(--accent-foreground))' }],
    ['bg-destructive', { backgroundColor: 'hsl(var(--destructive))' }],
    ['text-destructive', { color: 'hsl(var(--destructive))' }],
    ['text-destructive-foreground', { color: 'hsl(var(--destructive-foreground))' }],
    ['bg-destructive-foreground', { backgroundColor: 'hsl(var(--destructive-foreground))' }],
    ['bg-popover', { backgroundColor: 'hsl(var(--popover))' }],
    ['text-popover', { color: 'hsl(var(--popover))' }],
    ['text-popover-foreground', { color: 'hsl(var(--popover-foreground))' }],
    ['bg-popover-foreground', { backgroundColor: 'hsl(var(--popover-foreground))' }],
    ['bg-card', { backgroundColor: 'hsl(var(--card))' }],
    ['text-card', { color: 'hsl(var(--card))' }],
    ['text-card-foreground', { color: 'hsl(var(--card-foreground))' }],
    ['bg-card-foreground', { backgroundColor: 'hsl(var(--card-foreground))' }],
    ['border-border', { borderColor: 'hsl(var(--border))' }],
    ['outline-ring', { outlineColor: 'hsl(var(--ring))' }],
    
    // Определение border-radius через переменные
    ['rounded-lg', { borderRadius: 'var(--radius)' }],
    ['rounded-md', { borderRadius: 'calc(var(--radius) - 2px)' }],
    ['rounded-sm', { borderRadius: 'calc(var(--radius) - 4px)' }],
  ],
  
  // Определение темной темы через CSS-переменные
  theme: {
    // Определение контейнера
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
  
  // Анимации для Tailwind CSS v4
  animation: {
    keyframes: {
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
    durations: {
      'accordion': '0.2s',
    },
    timingFns: {
      'accordion': 'ease-out',
    },
    properties: {
      'accordion-down': {
        animationName: 'accordion-down',
        animationDuration: 'var(--accordion)',
        animationTimingFunction: 'var(--accordion)',
      },
      'accordion-up': {
        animationName: 'accordion-up',
        animationDuration: 'var(--accordion)',
        animationTimingFunction: 'var(--accordion)',
      },
    },
  },
  
  // Tailwind v4 больше не использует plugins так, как раньше
  // Вместо этого используется встроенная функциональность
  darkMode: 'class',
};

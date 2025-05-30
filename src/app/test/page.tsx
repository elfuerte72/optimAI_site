import Image from 'next/image';

export default function TestPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero section with Tailwind CSS classes */}
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-primary mb-6 text-4xl font-bold">Тестовая страница Tailwind CSS v4</h1>
        <p className="text-foreground mb-8 text-lg">
          Эта страница тестирует работу Tailwind CSS v4 с Next.js 15.3.0
        </p>

        {/* Карточки с разными цветами и стилями */}
        <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="bg-primary text-primary-foreground rounded-lg p-6 shadow-lg">
            <h3 className="mb-2 text-xl font-semibold">Primary Card</h3>
            <p>Это карточка с основным цветом</p>
          </div>

          <div className="bg-secondary text-secondary-foreground rounded-lg p-6 shadow-lg">
            <h3 className="mb-2 text-xl font-semibold">Secondary Card</h3>
            <p>Это карточка со вторичным цветом</p>
          </div>

          <div className="bg-accent text-accent-foreground rounded-lg p-6 shadow-lg">
            <h3 className="mb-2 text-xl font-semibold">Accent Card</h3>
            <p>Это карточка с акцентным цветом</p>
          </div>
        </div>

        {/* Секция с кнопками разных стилей */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button className="bg-primary text-primary-foreground rounded-md px-4 py-2 transition-opacity hover:opacity-90">
            Primary Button
          </button>
          <button className="bg-secondary text-secondary-foreground rounded-md px-4 py-2 transition-opacity hover:opacity-90">
            Secondary Button
          </button>
          <button className="bg-destructive text-destructive-foreground rounded-md px-4 py-2 transition-opacity hover:opacity-90">
            Destructive Button
          </button>
          <button className="bg-muted text-muted-foreground rounded-md px-4 py-2 transition-opacity hover:opacity-90">
            Muted Button
          </button>
        </div>

        {/* Тестирование утилитарных классов размеров, отступов и т.д. */}
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <p className="text-xs">Text Extra Small</p>
            <p className="text-sm">Text Small</p>
            <p className="text-base">Text Base</p>
            <p className="text-lg">Text Large</p>
            <p className="text-xl">Text Extra Large</p>
            <p className="text-2xl">Text 2XL</p>
            <p className="text-3xl">Text 3XL</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-primary text-primary-foreground flex size-16 items-center justify-center rounded-full">
              Circle
            </div>
            <div className="bg-secondary text-secondary-foreground flex size-16 items-center justify-center rounded-lg">
              Square
            </div>
            <div className="bg-accent text-accent-foreground flex h-16 w-32 items-center justify-center rounded-md">
              Rectangle
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

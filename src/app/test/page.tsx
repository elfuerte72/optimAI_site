import Image from 'next/image';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero section with Tailwind CSS classes */}
      <section className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-primary mb-6">Тестовая страница Tailwind CSS v4</h1>
        <p className="text-lg text-foreground mb-8">
          Эта страница тестирует работу Tailwind CSS v4 с Next.js 15.3.0
        </p>
        
        {/* Карточки с разными цветами и стилями */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Primary Card</h3>
            <p>Это карточка с основным цветом</p>
          </div>
          
          <div className="bg-secondary text-secondary-foreground p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Secondary Card</h3>
            <p>Это карточка со вторичным цветом</p>
          </div>
          
          <div className="bg-accent text-accent-foreground p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Accent Card</h3>
            <p>Это карточка с акцентным цветом</p>
          </div>
        </div>
        
        {/* Секция с кнопками разных стилей */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Primary Button
          </button>
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Secondary Button
          </button>
          <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Destructive Button
          </button>
          <button className="bg-muted text-muted-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            Muted Button
          </button>
        </div>
        
        {/* Тестирование утилитарных классов размеров, отступов и т.д. */}
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-xs">Text Extra Small</p>
            <p className="text-sm">Text Small</p>
            <p className="text-base">Text Base</p>
            <p className="text-lg">Text Large</p>
            <p className="text-xl">Text Extra Large</p>
            <p className="text-2xl">Text 2XL</p>
            <p className="text-3xl">Text 3XL</p>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <div className="size-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
              Circle
            </div>
            <div className="size-16 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground">
              Square
            </div>
            <div className="w-32 h-16 bg-accent rounded-md flex items-center justify-center text-accent-foreground">
              Rectangle
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
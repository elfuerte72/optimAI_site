import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        {/* Favicon links optimized for different devices */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Meta tags for SEO */}
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="OptimaAI — интеграция искусственного интеллекта в бизнес" />
      </Head>
      <body className="antialiased bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
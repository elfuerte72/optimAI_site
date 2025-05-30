// /Users/maximpenkin/Documents/openai/site/optimAI_site/src/components/TestimonialsDataWrapper.tsx
// import fs from 'fs'; // File system operations commented out for now
// import path from 'path'; // Path operations commented out for now
import TestimonialsCarousel, { Testimonial } from './TestimonialsCarousel';

// // Original function to parse the markdown content - COMMENTED OUT
// const parseTestimonials = (markdownContent: string): Testimonial[] => {
//   const testimonials: Testimonial[] = [];
//   const entries = markdownContent.trim().split(/\r?\n\s*---\s*\r?\n/);
//   entries.forEach(entry => {
//     const lines = entry.trim().split(/\r?\n/);
//     if (lines.length >= 2) {
//       const name = lines[0].trim();
//       let text = lines.slice(1).join('\n').trim();
//       text = text.replace(/^[\s*"*]+|[\s*"*]+$/g, '');
//       if (text.startsWith('*') && text.endsWith('*') && text.length > 1) {
//           text = text.substring(1, text.length - 1).trim();
//       }
//       if (text.startsWith('"') && text.endsWith('"') && text.length > 1) {
//           text = text.substring(1, text.length - 1).trim();
//       }
//       if (name && text) {
//         testimonials.push({ name, text });
//       }
//     }
//   });
//   return testimonials;
// };

const TestimonialsDataWrapper = () => {
  // Using hardcoded testimonials to bypass file reading/parsing issues for now
  const testimonials: Testimonial[] = [
    {
      name: 'Катерина Анатольевна',
      text: 'Прошла обучение по промптингу и хочу выразить огромную благодарность! 25 из 25 на итоговой проверке — отличный результат для первого знакомства с ИИ. Благодарю наставников — Максима, Сергея и Григория — за профессионализм и поддержку. Спасибо за возможность расти, развиваться и встречаться с единомышленниками. До новых встреч!',
    },
    {
      name: 'Мария Савенко',
      text: 'Спасибо за обучение! Было интересно, познавательно и вдохновляюще. Радует, что обучение помогло увидеть новые возможности работы с искусственным интеллектом и почувствовать уверенность в применении промптинга в реальных задачах.',
    },
    {
      name: 'Ольга Морозова',
      text: 'Обучение промптингу прошло на одном дыхании! Огромное спасибо за доступную подачу материала, живые примеры и поддержку на каждом этапе. Теперь я уверенно применяю ИИ в работе и вижу реальные результаты.',
    },
    // Add more testimonials here if needed
  ];

  // // Original file reading logic - COMMENTED OUT
  // try {
  //   const filePath = path.join(process.cwd(), 'otziv.md');
  //   const fileContents = fs.readFileSync(filePath, 'utf8');
  //   testimonials = parseTestimonials(fileContents);
  // } catch (error) {
  //   console.error("Error reading or parsing testimonials file (otziv.md):", error);
  //   // Fallback to empty or hardcoded if file read fails even if uncommented
  // }

  return <TestimonialsCarousel testimonials={testimonials} />;
};

export default TestimonialsDataWrapper;

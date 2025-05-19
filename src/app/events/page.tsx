// src/app/events/page.tsx
import React from 'react';

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Мероприятия</h1>
        <p className="text-xl text-center text-gray-300">
          Информация о предстоящих и прошедших мероприятиях будет доступна здесь в ближайшее время.
        </p>
        {/* Add more content related to events here */}
      </div>
    </div>
  );
};

export default EventsPage;

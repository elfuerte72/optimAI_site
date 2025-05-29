'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { NewsItem } from './NewsTypes';

interface NewsCardProps {
  news: NewsItem;
  isExpanded: boolean;
  onToggle: () => void;
}

export const NewsCard = ({ news, isExpanded, onToggle }: NewsCardProps) => {
  return (
    <Card 
      className="bg-black border border-neutral-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:border-neutral-600 cursor-pointer"
      onClick={onToggle}
    >
      <div className="relative h-64 w-full">
        <Image 
          src={news.image} 
          alt={news.title} 
          fill 
          style={{objectFit: 'contain'}} 
          className="transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{news.title}</h3>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-gray-300"
          >
            <p className="whitespace-pre-line">{news.content}</p>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

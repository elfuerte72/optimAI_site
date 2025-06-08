'use client';

import React from 'react';
import Image from 'next/image';

interface FlipCardProps {
  position: string;
  image: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ position, image }) => {
  return (
    <div className="card">
      <div className="content">
        {/* Back side (shows on hover) - Contains position description */}
        <div className="back">
          <div className="back-content">
            <p className="text-center text-neutral-200">{position}</p>
          </div>
        </div>

        {/* Front side (shows by default) - Contains photo */}
        <div className="front">
          <Image src={image} alt={position} layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

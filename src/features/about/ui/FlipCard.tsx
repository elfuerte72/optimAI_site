'use client';

import React from 'react';
import Image from 'next/image';

interface FlipCardProps {
  name: string;
  position: string;
  image: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ name, position, image }) => {
  return (
    <div className="card">
      <div className="content">
        {/* Back side (shows on hover) - Contains position description */}
        <div className="back">
          <div className="back-content">
            <h3 className="mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-xl font-semibold text-transparent">
              {name}
            </h3>
            <p className="text-center text-neutral-200">{position}</p>
          </div>
        </div>

        {/* Front side (shows by default) - Contains photo */}
        <div className="front">
          <div className="img">
            <div className="circle"></div>
            <div className="circle" id="right"></div>
            <div className="circle" id="bottom"></div>
          </div>
          <div className="front-content">
            <div className="profile-image">
              <Image
                src={image}
                alt={name}
                width={160}
                height={160}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="name-container">
              <small className="badge">{name}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

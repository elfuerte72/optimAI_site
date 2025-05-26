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
        {/* Back side (shows on hover) */}
        <div className="back">
          <div className="back-content">
            <h3 className="text-xl font-semibold mb-2 text-sky-400">{name}</h3>
            <p className="text-neutral-300">{position}</p>
          </div>
        </div>
        
        {/* Front side (shows by default) */}
        <div className="front">
          <div className="img">
            <div className="circle"></div>
            <div className="circle" id="right"></div>
            <div className="circle" id="bottom"></div>
          </div>
          <div className="front-content">
            <small className="badge">Основатель</small>
            <div className="profile-image">
              <Image 
                src={image} 
                alt={name} 
                width={120} 
                height={120} 
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div className="description">
              <div className="title">
                <p className="title">
                  <strong>{name}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

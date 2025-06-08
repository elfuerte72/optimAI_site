'use client';

import React from 'react';
import styled from 'styled-components';

interface FlipCardStylesProps {
  children: React.ReactNode;
}

const FlipCardStyles: React.FC<FlipCardStylesProps> = ({ children }) => {
  return <StyledWrapper suppressHydrationWarning>{children}</StyledWrapper>;
};

const StyledWrapper = styled.div`
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 2rem;
    width: 100%;
  }
  .card {
    overflow: visible;
    width: 200px;
    height: 270px;
    margin: 0 auto;
    perspective: 1000px;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0px 0px 10px 1px #00000080;
    border-radius: 12px;
  }

  .front,
  .back {
    background-color: #000;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 12px;
    overflow: hidden;
  }

  .back {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .back::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(
      90deg,
      transparent,
      #3b82f6,
      #8b5cf6,
      #6366f1,
      #3b82f6,
      transparent
    );
    animation: rotation_481 5000ms infinite linear;
  }

  .back-content {
    position: absolute;
    width: 99%;
    height: 99%;
    background-color: #151515;
    border-radius: 12px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 1rem;
    text-align: center;
  }

  .card:hover .content {
    transform: rotateY(180deg);
  }

  /* Reverse the front and back sides to show photo first */
  .front {
    transform: rotateY(0deg);
    color: white;
  }

  .back {
    transform: rotateY(180deg);
  }

  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }

  /* Front styling (already moved above) */


  /* Removed description section as it's no longer needed */

  .title {
    font-size: 16px;
    max-width: 100%;
    display: flex;
    justify-content: center;
    color: #6366f1;
  }
`;

export default FlipCardStyles;

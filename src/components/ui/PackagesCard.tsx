'use client';

import React from 'react';
import styled from 'styled-components';

interface PackageItem {
  name: string;
  details?: string; // For price and duration, if needed inside the card directly
}

interface PackagesCardProps {
  packages: PackageItem[];
}

const PackagesCard: React.FC<PackagesCardProps> = ({ packages }) => {
  return (
    <StyledWrapper>
      <div className="card">
        {packages.map((pkg, index) => (
          <p key={index}><span>{pkg.name}</span></p>
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex; /* Added to center the card if needed */
  justify-content: center; /* Added to center the card if needed */
  align-items: center; /* Added to center the card if needed */
  padding: 20px; /* Added some padding around the card area */

  .card {
    width: 280px; /* Increased width slightly for better text fit */
    height: 300px; /* Increased height slightly */
    border-radius: 8px;
    background: linear-gradient(145deg, #333, #000);
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0.4em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }

  .card p {
    flex: 1;
    overflow: hidden;
    cursor: pointer;
    border-radius: 8px;
    transition: flex 0.5s ease-in-out; /* Added ease-in-out */
    background: linear-gradient(145deg, #212121, #000);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center; /* Ensure text within p is centered */
  }

  .card p:hover {
    flex: 4;
  }

  .card p span {
    padding: 0.4em; /* Increased padding slightly */
    text-align: center;
    transform: rotate(0deg); /* Start with no rotation for better readability */
    transition: transform 0.5s ease-in-out; /* Added ease-in-out */
    text-transform: uppercase;
    color: #00ffeb;
    font-weight: bold; /* Corrected value */
    letter-spacing: 0.05em; /* Adjusted letter spacing */
    font-size: 0.9rem; /* Adjusted font size */
    position: relative;
    z-index: 1;
    white-space: normal; /* Allow text to wrap if necessary */
    word-break: break-word; /* Break words to prevent overflow */
  }

  .card p:hover span {
    transform: rotate(0deg); /* Keep rotation at 0 on hover */
  }

  .card p::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.05); /* Reduced opacity for a subtler effect */
    z-index: 0;
    transition: opacity 0.5s ease-in-out; /* Added ease-in-out */
    pointer-events: none;
    opacity: 0;
  }

  .card p:hover::before {
    opacity: 1;
  }
`;

export default PackagesCard;

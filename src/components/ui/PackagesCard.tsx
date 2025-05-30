'use client';

import React from 'react';
import styled from 'styled-components';

interface PackageItem {
  name: string;
  description: string;
}

interface PackagesCardProps {
  packages: PackageItem[];
}

const PackagesCard: React.FC<PackagesCardProps> = ({ packages }) => {
  return (
    <StyledWrapper>
      <div className="card">
        {packages.map((pkg, index) => (
          <p key={index}>
            <span className="package-name">{pkg.name}</span>
            <span className="package-details">{pkg.description}</span>
          </p>
        ))}
      </div>
    </StyledWrapper>
  );
};

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

  .card p .package-name {
    display: block; /* Ensure it takes up space to be centered */
    transition: opacity 0.3s ease-in-out;
  }

  .card p .package-details {
    display: block; /* Ensure it takes up space */
    font-size: 0.75rem; /* Smaller font for details */
    color: #b0e0e6; /* Lighter color for details, adjust as needed */
    margin-top: 8px; /* Space between name and details */
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition:
      opacity 0.4s ease-in-out 0.1s,
      max-height 0.4s ease-in-out 0.1s; /* Delay appearance */
    white-space: normal;
    word-break: break-word;
    line-height: 1.4;
  }

  .card p:hover .package-name {
    opacity: 1; /* Keep name visible or style differently if needed */
  }

  .card p:hover .package-details {
    opacity: 1;
    max-height: 150px; /* Adjust based on expected content length */
  }

  /* Original span styles, now applied to .package-name by default */
  .card p span {
    /* This will now primarily style .package-name, details are overridden */
    padding: 0.4em; /* Increased padding slightly */
    text-align: center;
    transform: rotate(0deg); /* Start with no rotation for better readability */
    transition: transform 0.5s ease-in-out; /* Added ease-in-out */
    text-transform: uppercase;
    color: #00ffeb;
    font-weight: bold;
    letter-spacing: 0.05em;
    font-size: 0.9rem;
    position: relative;
    z-index: 1;
    white-space: normal; /* Allow text to wrap if necessary */
    word-break: break-word; /* Break words to prevent overflow */
  }

  .card p:hover .package-name {
    /* Style for name on hover if different from details */
    transform: rotate(0deg); /* Keep rotation at 0 on hover */
  }

  .card p::before {
    content: '';
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

'use client';

import React from 'react';
import styled from 'styled-components';

interface CustomCardProps {
  title: string;
  description: string;
}

const StyledWrapper = styled.div`
  /* Styles for the card wrapper itself, if any needed for alignment within the grid cell */
  display: flex; /* Ensures the card-content takes up the space */
  justify-content: center; /* Centers card-content if grid cell is larger */

  .card-content {
   width: 190px;
   height: 254px;
   border-radius: 30px;
   background: #212121;
   box-shadow: 15px 15px 30px rgb(25, 25, 25),
               -15px -15px 30px rgb(60, 60, 60);
   padding: 20px;
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
   color: white; 
   box-sizing: border-box; /* Ensures padding is included in width/height */
 }

 .card-content h3 {
    font-size: 1.15rem; /* Adjusted for smaller card size */
    font-weight: bold;
    margin-bottom: 10px;
    color: #e0e0e0; 
 }

 .card-content p {
    font-size: 0.8rem; 
    color: #b0b0b0; 
    line-height: 1.4;
    overflow: hidden; /* Prevents text overflow */
    text-overflow: ellipsis; /* Adds ellipsis for overflowed text */
    /* max-height: calc(0.8rem * 1.4 * 5); /* Approx 5 lines, adjust as needed */
 }
`;

const CustomCard: React.FC<CustomCardProps> = ({ title, description }) => {
  return (
    <StyledWrapper>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </StyledWrapper>
  );
}

export default CustomCard;

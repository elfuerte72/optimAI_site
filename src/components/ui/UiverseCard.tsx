'use client';

import React from 'react';
import styled from 'styled-components';

interface UiverseCardProps {
  title: string;
  description: string;
}

const StyledWrapper = styled.div`
  width: 100%; /* Карточка будет занимать всю ширину ячейки грида */
  position: relative;
  background-color: rgb(16 16 16);
  border: 1px solid rgb(255 255 255 / 5%);
  border-radius: 1.5rem;
  padding: 1rem;
  box-sizing: border-box;

  &::after {
    content: '';
    height: 70px;
    width: 1px;
    position: absolute;
    left: -1px;
    top: 65%;
    transition:
      top 600ms ease,
      opacity 600ms ease;
    background: linear-gradient(transparent, mediumslateblue, transparent);
    box-shadow: 0 0 30px mediumslateblue;
    opacity: 0;
  }

  &:hover::after {
    top: 25%;
    opacity: 1;
  }

  .card-content-inner {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Выравнивание контента по верху */
    align-items: center;
    background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-position: 50% 50%;
    background-size: 1.1rem 1.1rem;
    padding: 0.8rem; /* Было 1.5rem (исходно 2rem) */
    border-radius: 1.25rem;
    overflow: hidden;
    min-height: 120px; /* Было 180px (исходно 220px) */
    text-align: center;
    box-sizing: border-box;
  }

  .card-title {
    color: #fff;
    font-size: 1.4rem; /* Увеличено с 1.2rem */
    font-weight: bold;
    margin-bottom: 0.6rem; /* Увеличено с 0.5rem */
  }

  .card-description {
    color: rgb(255 255 255 / 75%);
    line-height: 1.4rem; /* Увеличено с 1.3rem */
    font-size: 1rem; /* Увеличено с 0.85rem */
  }

  /* Адаптивность из примера */
  @media (max-width: 700px) {
    padding: 0.75rem;
    border-radius: 1rem;
    .card-content-inner {
      min-height: 110px; /* Было 160px */
      padding: 0.7rem; /* Было 1.25rem */
    }
    .card-title {
      font-size: 1.25rem; /* Увеличено с 1.1rem */
    }
    .card-description {
      font-size: 0.9rem; /* Увеличено с 0.8rem */
    }
  }

  @media (max-width: 600px) {
    .card-content-inner {
      padding: 0.6rem; /* Было 1rem */
      min-height: 100px; /* Было 150px */
    }
    .card-title {
      font-size: 1.1rem; /* Увеличено с 1.0rem */
    }
    .card-description {
      font-size: 0.85rem; /* Увеличено с 0.75rem */
    }
  }
`;

const UiverseCard: React.FC<UiverseCardProps> = ({ title, description }) => {
  return (
    <StyledWrapper>
      <div className="card-content-inner">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </StyledWrapper>
  );
};

export default UiverseCard;

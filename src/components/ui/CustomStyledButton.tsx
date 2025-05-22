'use client';

import React from 'react';
import styled from 'styled-components';

interface CustomStyledButtonProps {
  href: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  'aria-label'?: string; // Changed to match HTML attribute directly
}

const StyledLink = styled.a`
  min-width: 120px;
  position: relative;
  cursor: pointer;
  padding: 12px 17px;
  border: 0;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  background: radial-gradient(
    ellipse at bottom,
    rgba(71, 81, 92, 1) 0%,
    rgba(11, 21, 30, 1) 45%
  );
  color: rgba(255, 255, 255, 0.66);
  text-decoration: none;
  display: inline-block;
  text-align: center;

  transition: all 1s cubic-bezier(0.15, 0.83, 0.66, 1);

  &::before {
    content: "";
    width: 70%;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 15%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0.2;
    transition: all 1s cubic-bezier(0.15, 0.83, 0.66, 1);
  }

  &:hover {
    color: rgba(255, 255, 255, 1);
    transform: scale(1.1) translateY(-3px);
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CustomStyledButton: React.FC<CustomStyledButtonProps> = ({ href, children, target, rel, 'aria-label': ariaLabel }) => {
  return (
    <StyledLink href={href} target={target} rel={rel} aria-label={ariaLabel}>
      {children}
    </StyledLink>
  );
};

export default CustomStyledButton;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavButtons: React.FC = () => {
  return (
    <ButtonsWrapper>
      <Link to={'/sign-in'}>
        <span data-testid={'to-sing-in'}>Sign In</span>
      </Link>
      <Link to={'/sign-up'}>
        <span data-testid={'to-sing-up'}>Sign Up</span>
      </Link>
    </ButtonsWrapper>
  );
};

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 12px;
  justify-content: space-around;
`;

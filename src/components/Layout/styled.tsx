import styled from 'styled-components';

export const MainLayoutContent = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.lg}px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

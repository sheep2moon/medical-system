import styled from 'styled-components';

export const CenteredContainer = styled.div`
  width: 100vw;
  margin-top: 4rem;
  min-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.dark};
`;

import styled from 'styled-components';

export const CenteredContainer = styled.div`
  width: 100vw;
  margin-top: 6rem;
  min-height: calc(100vh - 6rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  background-repeat: no-repeat;
  background-size: cover;

  //background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.dark};
`;

export const VerticalSpace = styled.div`
  width: 100%;
  height: ${({ height }) => `${height}rem`};
`;

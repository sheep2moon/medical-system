import styled from 'styled-components';

export const PrimaryButton = styled.button`
  padding: 1rem;
  font-size: 1.4rem;
  background: ${({ theme }) => theme.primary};
`;

export const SecondaryButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  font-weight: 700;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.dark};
  border: ${({ theme }) => `2px solid ${theme.dark}`};
  border-radius: 0.25rem;
  box-shadow: 0 2px 3px 0 #888;
  transition: all 0.2s ease-in;
  :hover {
    cursor: pointer;
    transition: all 0.2s ease-in;
    box-shadow: 0 4px 2px 0 #888;
  }
`;

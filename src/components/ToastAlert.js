import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SecondaryButton } from './Buttons';

const ToastAlert = ({ message, setAlertMessage, duration, color }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    if (duration) {
      setTimeout(() => {
        setIsOpen(false);
        setAlertMessage('');
      }, duration);
    }
  }, [duration, message, setAlertMessage]);
  if (!message) {
    return null;
  }
  return (
    <AlertContainer isOpen={isOpen}>
      <AlertMessage>{message}</AlertMessage>
      <SecondaryButton onClick={() => setIsOpen(false)}>
        Zamknij
      </SecondaryButton>
    </AlertContainer>
  );
};

export default ToastAlert;

const AlertContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  background: ${({ theme }) => theme.light};
  padding: 1rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  box-shadow: 0 0 5px 2px #00000040;
  font-size: 1.9rem;
`;
const AlertMessage = styled.p`
  margin-right: 1.4rem;
`;

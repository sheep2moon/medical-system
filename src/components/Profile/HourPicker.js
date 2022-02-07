import React from 'react';
import styled from 'styled-components';

const HourPicker = ({ options, selectedHour, setSelectedHour }) => {
  return (
    <PickerContainer>
      {options.map((option, index) => (
        <Option
          onClick={() => setSelectedHour(index)}
          isActive={index === selectedHour}
        >
          {option}
        </Option>
      ))}
    </PickerContainer>
  );
};

export default HourPicker;

const PickerContainer = styled.div``;
const Option = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  padding: 0.25rem;
  background: ${({ isActive, theme }) =>
    isActive ? theme.primary : theme.light};
`;

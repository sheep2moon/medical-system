import React from 'react';
import styled from 'styled-components';

const HourPicker = ({ options, selectedHour, setSelectedHour }) => {
  return (
    <PickerContainer>
      {options &&
        options.map((option, index) => (
          <Option
            key={index}
            onClick={() => {
              if (selectedHour === index) {
                setSelectedHour(null);
              } else {
                setSelectedHour(index);
              }
            }}
            isActive={index === selectedHour}
          >
            {option}
          </Option>
        ))}
    </PickerContainer>
  );
};

export default HourPicker;

const PickerContainer = styled.div`
  display: flex;
  gap: 2px;
`;
const Option = styled.div`
  border: 1px solid #00000030;
  font-size: 1.4rem;
  cursor: pointer;
  user-select: none;
  display: flex;
  padding: 0.25rem 0.5rem;
  background: ${({ isActive, theme }) =>
    isActive ? theme.green : theme.light};
`;

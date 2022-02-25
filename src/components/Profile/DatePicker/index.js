import React, { useRef, useState } from "react";
import styled from "styled-components";
import { BsCalendar } from "react-icons/bs";
import Calendar from "./Calendar";
import { format } from "date-fns";

const DatePicker = ({ setCurrentDate }) => {
  const inputRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const pickDate = (date) => {
    //change format of date here
    inputRef.current.value = format(date, "yyyy-MM-dd");
    setCurrentDate(format(date, "yyyy-MM-dd"));
    toggleOpen();
  };

  return (
    <DatePickerContainer
      onClick={() => {
        if (!isOpen) {
          setIsOpen(true);
        }
      }}
    >
      <CalendarWrap isOpen={isOpen}>
        <Calendar pickDate={pickDate} />
      </CalendarWrap>
      <StyledInput ref={inputRef} type="text" disabled />
      <PickerWrap onClick={toggleOpen}>
        <PickerIcon />
        <p>Kliknij aby wybrać</p>
      </PickerWrap>
    </DatePickerContainer>
  );
};

export default DatePicker;

const DatePickerContainer = styled.div`
  border: 1px solid #00000030;
  display: flex;
  position: relative;
  /* change font size to manipulate size of picker */
  width: 28em;
`;
const CalendarWrap = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  border: 4px solid #000;
  z-index: 10;
  top: 3em;
`;
const StyledInput = styled.input`
  padding: 0 0.25em;
  font-size: 1.2em;
  border: none;
`;
const PickerWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #eee;
  padding: 0.25rem;
  > p {
    font-size: 1.2em;
    font-weight: 700;
    color: #000;
  }
  :hover {
    cursor: pointer;
    background-color: #ccc;
  }
`;
const PickerIcon = styled(BsCalendar)`
  font-size: 2em;
  color: #000;
`;

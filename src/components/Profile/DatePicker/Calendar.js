import { addMonths, getMonth, getYear, subMonths } from 'date-fns';
import React, { useState } from 'react';
import styled from 'styled-components';
import CalendarBody from './CalendarBody';
import { AiFillLeftSquare } from 'react-icons/ai';
import { AiFillRightSquare } from 'react-icons/ai';

// month labels
export const months = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

const Calendar = ({ pickDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const backwardMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const forwardMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <CalendarContainer>
      <CalendarHeading>
        <span onClick={backwardMonth}>
          <LeftArrow />
        </span>
        <h2>{`${months[getMonth(currentMonth)]} ${getYear(currentMonth)}`}</h2>
        <span onClick={forwardMonth}>
          <RightArrow />
        </span>
      </CalendarHeading>
      <CalendarBody currentMonth={currentMonth} pickDate={pickDate} />
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 28em;
  margin: auto auto;
  color: #000;
  box-shadow: 1px 2px 4px #000;
`;

const CalendarHeading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  justify-content: space-between;
  background-color: #fff;
  > span {
    display: flex;
    align-items: center;
    opacity: 0.8;
    :hover {
      cursor: pointer;
      opacity: 1;
    }
  }
`;

const LeftArrow = styled(AiFillLeftSquare)`
  font-size: 2em;
`;
const RightArrow = styled(AiFillRightSquare)`
  font-size: 2em;
`;

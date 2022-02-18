import {
  addDays,
  differenceInCalendarDays,
  getDate,
  getDay,
  startOfMonth,
  subDays,
} from 'date-fns';
import { endOfMonth } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//days labels
export const daysNames = ['Pon', 'Wt', 'Śr', 'Czw', 'Pią', 'Sob', 'Nie'];

const CalendarBody = ({ currentMonth, pickDate, startFromMonday = true }) => {
  const [calendarDays, setCalendarDays] = useState([]);
  const [monthInfo, setMonthInfo] = useState({
    monthStart: null,
    monthEnd: null,
  });

  useEffect(() => {
    // 0 - sunday , 6 - monday
    const firstDayDiff = startFromMonday ? 6 : 0;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startWith = subDays(
      monthStart,
      (getDay(monthStart) + firstDayDiff) % 7
    );
    let endWith = null;

    if (firstDayDiff === 6) {
      // start with monday
      endWith = addDays(monthEnd, (7 - getDay(monthEnd)) % 7);
    } else {
      // start with sunday
      endWith = addDays(monthEnd, 6 - getDay(monthEnd));
    }
    const daysCount = differenceInCalendarDays(endWith, startWith);
    let days = [];
    for (let i = 0; i < daysCount + 1; i++) {
      days.push(addDays(startWith, i));
    }
    setCalendarDays(days);
    setMonthInfo({ monthStart, monthEnd });
  }, [currentMonth, startFromMonday]);

  return (
    <TableWrap>
      <ColumnNames>
        {daysNames.map((day) => (
          <ColumnName key={day}>{day}</ColumnName>
        ))}
      </ColumnNames>
      <Cells>
        {calendarDays.length > 0 &&
          calendarDays.map((day, index) => {
            const isCurrentMonth =
              day >= monthInfo.monthStart && day <= monthInfo.monthEnd;
            return (
              <DayCell
                key={index}
                isCurrentMonth={isCurrentMonth}
                isAvailable={day > Date.now()}
                onClick={() => {
                  if (day > Date.now()) {
                    pickDate(day);
                  }
                }}
              >
                <p>{getDate(day)}</p>
              </DayCell>
            );
          })}
      </Cells>
    </TableWrap>
  );
};

export default CalendarBody;

const TableWrap = styled.div`
  background-color: #fff;
  width: 28em;
  transition: all 0.2s ease-in-out;
`;
const ColumnNames = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  box-shadow: 1px 0 2px #000;
  background-color: #eee;
`;
const ColumnName = styled.p`
  font-size: 1.4em;
  line-height: 1.6em;
  text-align: center;
`;

const Cells = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(7, 1fr);
  transition: all 0.2s ease-in-out;
`;

const DayCell = styled.div`
  transition: all 0.1s ease-in-out;
  width: 4em;
  height: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, isAvailable }) =>
    isAvailable ? theme.light : theme.secondary};
  font-size: 1em;
  font-weight: 700;
  outline: 1px solid #00000008;
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? 1 : 0.6)};
  :hover {
    box-shadow: inset 0 0 12px 2px #00000030;
    cursor: pointer;
  }
`;

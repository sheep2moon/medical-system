import { addMinutes, getTime, set } from 'date-fns';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { supabase } from '../../supabaseConfig';
import { PrimaryButton } from '../Buttons';
import DatePicker from '../Profile/DatePicker';
import ToastAlert from '../ToastAlert';

const SetHours = () => {
  const [hourList, setHourList] = useState([]);
  const [pickedHours, setPickedHours] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);
  const { id } = useSelector((state) => state.user);
  const [alertMessage, setAlertMessage] = useState('');
  const [writedTerms, setWritedTerms] = useState([]);

  const fetchTerms = async () => {
    const { data, error } = await supabase.from('terms').select();
    if (error) {
      setAlertMessage(error.message);
    } else {
      if (data) {
        setWritedTerms(data.filter((row) => row.doctor_id === id));
      }
    }
  };

  const handleAddTerms = async () => {
    const terms = {
      doctor_id: id,
      day: currentDate,
      free_hours: pickedHours,
      busy_hours: [],
    };
    let error;
    if (writedTerms.some((el) => el.day === currentDate)) {
      ({ error } = await supabase
        .from('terms')
        .update(terms)
        .match({ day: currentDate, doctor_id: id }));
      if (!error) {
        setAlertMessage('Pomyślnie zaktualizowano terminy');
        fetchTerms();
      }
    } else {
      ({ error } = await supabase.from('terms').insert(terms));
      if (!error) {
        setAlertMessage('Pomyślnie dodano terminy');
        fetchTerms();
      }
    }
    if (error) {
      setAlertMessage(error.message);
    }
  };

  const generateHourList = () => {
    let hourStringList = [];
    let currentTime = set(Date.now(), { hours: 8, minutes: 0, seconds: 0 });
    while (
      currentTime.getTime() <
      set(Date.now(), { hours: 19, minutes: 0, seconds: 0 }).getTime()
    ) {
      hourStringList.push(currentTime.toLocaleTimeString().substring(0, 5));
      currentTime = addMinutes(currentTime, 15);
    }
    setHourList(hourStringList);
  };

  useEffect(() => {
    fetchTerms();
    generateHourList();
  }, []);

  useEffect(() => {
    setPickedHours([]);
    writedTerms.map((row) => {
      console.log(row.day, currentDate);
      if (row.day === currentDate) {
        setPickedHours(row.free_hours);
      }
    });
  }, [currentDate]);

  return (
    <>
      {alertMessage && (
        <ToastAlert
          message={alertMessage}
          duration={5000}
          setAlertMessage={setAlertMessage}
        />
      )}
      <FormContainer>
        <h1>Wybierz dzień</h1>
        <DatePicker setCurrentDate={setCurrentDate} />
        <h1>Wybierz dostępne godziny</h1>
        <HourGrid>
          {currentDate &&
            hourList.map((hour) => (
              <HourPick
                key={hour}
                isPicked={pickedHours.includes(hour)}
                onClick={() => {
                  if (!pickedHours.includes(hour)) {
                    setPickedHours([...pickedHours, hour]);
                  } else {
                    setPickedHours(pickedHours.filter((h) => h !== hour));
                  }
                }}
              >
                {hour}
              </HourPick>
            ))}
        </HourGrid>
        <PrimaryButton onClick={() => handleAddTerms()}>
          Zatwierdź
        </PrimaryButton>
      </FormContainer>
    </>
  );
};

export default SetHours;

const FormContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HourGrid = styled.div`
  max-width: 600px;
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
`;
const HourPick = styled.span`
  user-select: none;
  font-size: 1.4rem;
  cursor: pointer;
  display: block;
  padding: 0.25rem;
  border: 1px solid #00000020;
  background: ${({ theme, isPicked }) =>
    isPicked ? theme.green : theme.light};
`;

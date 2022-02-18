import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { supabase } from '../../supabaseConfig';
import { PrimaryButton, SecondaryButton } from '../Buttons';
import ToastAlert from '../ToastAlert';
import DatePicker from './DatePicker';
import HourPicker from './HourPicker';

const NewVisit = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [currentDate, setCurrentDate] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [termData, setTermData] = useState([]);
  const [hoursList, setHourList] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const { id } = useSelector((state) => state.user);

  //Fetching terms and doctor list
  const fetchData = async () => {
    const profiles_data = await supabase
      .from('profiles')
      .select()
      .eq('is_doctor', 'true');
    if (profiles_data.error) {
      setAlertMessage(profiles_data.error.message);
    }
    if (profiles_data.data) {
      setDoctors(profiles_data.data);
      setSelectedDoctor(profiles_data.data[0].id);
    }

    const terms_data = await supabase.from('terms').select();
    if (terms_data.error) {
      setAlertMessage(terms_data.error.message);
    }
    if (terms_data.data) {
      console.log(terms_data.data);
      setTermData(terms_data.data);
    }
  };

  useEffect(() => {
    fetchData();
    return supabase.removeAllSubscriptions();
  }, []);

  //Free hours update
  useEffect(() => {
    setSelectedHour(null);
    if (termData[0]?.day && currentDate) {
      console.log(currentDate);
      console.log(termData);
      const new_list = termData.filter(
        (row) => row.day === currentDate && row.doctor_id === selectedDoctor
      );
      console.log('list', hoursList);
      setHourList(new_list[0]?.free_hours);
    }
  }, [currentDate, selectedDoctor, termData]);

  //Add visit to database
  const handleAddVisit = async () => {
    const visit_data = {
      day: currentDate,
      hour: hoursList[selectedHour],
      doctor_id: selectedDoctor,
      patient_id: id,
    };

    const { error } = await supabase
      .from('visits')
      .insert(visit_data, { returning: 'minimal' });

    if (error) {
      setAlertMessage(error.message);
    } else {
      setAlertMessage('Wizyta umówiona');
    }

    updateTerms();
  };

  const updateTerms = async () => {
    const this_day_terms = termData.filter(
      (row) => row.day === currentDate && row.doctor_id === selectedDoctor
    );
    const busy_hours = this_day_terms[0].busy_hours;
    const new_free_hours = hoursList;
    const busy_hour = new_free_hours.splice(selectedHour, 1);
    const terms = {
      free_hours: new_free_hours,
      busy_hours: [...busy_hours, busy_hour],
    };
    const { error } = await supabase
      .from('terms')
      .update(terms)
      .match({ day: currentDate, doctor_id: selectedDoctor });

    if (error) {
      setAlertMessage(error.message);
    }
  };

  return (
    <>
      {alertMessage && (
        <ToastAlert
          message={alertMessage}
          setAlertMessage={setAlertMessage}
          duration={5000}
        />
      )}
      <FormWrapper>
        <SLabel>Wybierz lekarza z listy</SLabel>
        <DoctorList
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        >
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.username}
            </option>
          ))}
        </DoctorList>
        <SLabel>Wybierz dzień</SLabel>
        <DatePicker setCurrentDate={setCurrentDate} />
        <ResultContainer>
          <SLabel>
            {hoursList?.length
              ? 'Dostępne godziny:'
              : 'Brak dostępnych terminów tego dnia, wybierz inny dzień'}
          </SLabel>
          <HourPicker
            options={hoursList}
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
          />
        </ResultContainer>

        <SecondaryButton onClick={handleAddVisit}>Potwierdź</SecondaryButton>
      </FormWrapper>
    </>
  );
};

export default NewVisit;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
`;
const SLabel = styled.label`
  font-size: 1.4rem;
`;
const DoctorList = styled.select`
  width: 100%;
  max-width: 400px;
  font-size: 1.4rem;
  border: 1px solid #00000030;
  margin-bottom: 2rem;
`;
const ResultContainer = styled.div`
  margin: 2rem 0;
`;

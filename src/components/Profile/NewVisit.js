import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../../supabaseConfig';
import ToastAlert from '../ToastAlert';
import DatePicker from './DatePicker';
import HourPicker from './HourPicker';

const NewVisit = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const hours = ['3:30', '4:20', '5:25', '10:25'];
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    const res = await supabase
      .from('profiles')
      .select()
      .eq('is_doctor', 'true');
    if (res.error) {
      setAlertMessage(res.error.message);
    }
    if (res.data) {
      setDoctors(res.data);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

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
        <SLabel>Wybierz specjaliste</SLabel>
        <DoctorList>
          {doctors.map((doctor) => (
            <option value={doctor.id}>{doctor.username}</option>
          ))}
        </DoctorList>
        <DatePicker />
        <SLabel>Wybierz godzinę</SLabel>
        <HourPicker
          options={hours}
          selectedHour={selectedHour}
          setSelectedHour={setSelectedHour}
        />
      </FormWrapper>
    </>
  );
};

export default NewVisit;

const FormWrapper = styled.div``;
const SLabel = styled.label`
  font-size: 1.4rem;
`;
const DoctorList = styled.select`
  width: 100%;
  font-size: 1.4rem;
  border: 1px solid #00000030;
  margin-bottom: 2rem;
`;

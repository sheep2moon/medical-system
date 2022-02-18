import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { supabase } from '../../supabaseConfig';

const YourVisits = ({ setAlertMessage }) => {
  const [visitList, setVisitList] = useState();
  const { id } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const fetchVisits = async () => {
    try {
      const { error, data } = await supabase
        .from('visits')
        .select()
        .eq('patient_id', id);
      if (error) {
        throw error;
      } else {
        setVisitList(data);
        console.log(data);
      }
    } catch (error) {
      setAlertMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  return (
    <>
      {loading ? (
        <h1>Wczytywanie...</h1>
      ) : (
        <div>
          <h1>twoje wizyty</h1>
          <VisitsWrap>
            {visitList?.length &&
              visitList.map((visit) => (
                <Visit key={visit.created_at}>
                  <h4>Dnia</h4>
                  <p>{visit.day}</p>
                  <h4>Godzina</h4>
                  <p>{visit.hour}</p>
                  <h4>Doktor</h4>
                  <p>{visit.doctor_id}</p>
                </Visit>
              ))}
          </VisitsWrap>
        </div>
      )}
    </>
  );
};

export default YourVisits;

const VisitsWrap = styled.div`
  border: ${({ theme }) => `4px solid ${theme.secondary}`};
  border-radius: 1rem;
  padding: 1rem;
`;
const Visit = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  font-size: 1.6rem;
  font-weight: 700;
`;

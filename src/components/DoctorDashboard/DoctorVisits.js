import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { supabase } from "../../supabaseConfig";
import ToastAlert from "../ToastAlert";
import { Oval } from "react-loader-spinner";
import { VerticallyCentered } from "../Containers";

const DoctorVisits = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [visitList, setVisitList] = useState([]);
  const { id } = useSelector((state) => state.user);

  const fetchVisits = async () => {
    setLoading(true);
    try {
      const { error, data } = await supabase
        .from("visits")
        .select()
        .eq("doctor_id", id);
      if (error) {
        throw error;
      } else if (data.length > 0) {
        console.log(data);
        setVisitList(data);
        console.log(visitList[0].day);
        let today = new Date();
        console.log(today.toLocaleDateString());
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

  const cancelVisit = async (id) => {
    setLoading(true);
    try {
      console.log(id);
      const { error } = await supabase.from("visits").delete().eq("id", id);
      if (error) throw error;
      else setVisitList(visitList.filter((visit) => visit.id !== id));
    } catch (error) {
      setAlertMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <VerticallyCentered>
        {" "}
        <Oval color="#2666CF" ariaLabel="loading" />{" "}
      </VerticallyCentered>
    );
  if (visitList.length === 0) {
    return <EmptyMessage>Brak umówionych wizyt</EmptyMessage>;
  }
  return (
    <VisitsContainer>
      {alertMessage && (
        <ToastAlert
          message={alertMessage}
          setAlertMessage={setAlertMessage}
          duration={5000}
        />
      )}
      <VisitsList>
        <RowNames>
          <p>Nr.</p>
          <p>Dzień</p>
          <p>Godzina</p>
          <p>Pacjent</p>
          <p>Anuluj</p>
        </RowNames>
        {visitList.map((visit, index) => (
          <Row key={visit.id}>
            <p>{index + 1}</p>
            <p>{visit.day}</p>
            <p>{visit.hour}</p>
            <p>{visit.patient_id}</p>
            <button onClick={cancelVisit(visit.id)}>X</button>
          </Row>
        ))}
      </VisitsList>
    </VisitsContainer>
  );
};
export default DoctorVisits;

const VisitsContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  max-width: 600px;
`;
const EmptyMessage = styled.h2`
  margin: auto 0;
`;
const VisitsList = styled.div`
  width: 100%;
`;
const RowNames = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr 2fr 0.5fr;
  background-color: ${({ theme }) => theme.secondary};
  color: #fff;
  p {
    text-align: center;
    border-right: 1px solid #00000020;
    padding: 0.25rem;
  }
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr 2fr 0.5fr;
  border: 1px solid #000;
  border-top: none;
  p {
    border-right: 1px solid #00000020;
    padding: 0.25rem;
  }
  button {
    background: none;
    border: none;
    width: 100%;
    :hover {
      background-color: #00000020;
      cursor: pointer;
    }
  }
`;

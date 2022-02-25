import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { supabase } from "../../supabaseConfig";
import { Oval } from "react-loader-spinner";
import { VerticallyCentered } from "../Containers";
import { PrimaryButton } from "../Buttons.js";

const YourVisits = ({ setAlertMessage }) => {
  const [visitList, setVisitList] = useState([]);
  const { id } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(null);

  const handleCancelVisit = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("visits").delete().eq("id", id);
      if (error) throw error;
      else {
        setVisitList(visitList.filter((visit) => visit.id !== id));
        setAlertMessage("Wizyta anulowana");
      }
    } catch (error) {
      setAlertMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchVisits = async () => {
    setLoading(true);
    console.log(id);
    try {
      const { error, data } = await supabase
        .from("visits")
        .select()
        .eq("patient_id", id);
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
    if (id) {
      fetchVisits();
    }
  }, [id]);

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
    <>
      <h1>twoje wizyty</h1>
      <VisitsWrap>
        {visitList.length &&
          visitList.map((visit) => (
            <Visit key={visit.created_at} isExpired={visit.day}>
              <Col>
                <p>
                  Dnia <span>{visit.day}</span>o godzinie{" "}
                  <span>{visit.hour}</span>{" "}
                </p>
                <p>specjalista: {visit.doctor_username}</p>
              </Col>
              <PrimaryButton onClick={() => handleCancelVisit(visit.id)}>
                Anuluj
              </PrimaryButton>
            </Visit>
          ))}
      </VisitsWrap>
    </>
  );
};

export default YourVisits;

const EmptyMessage = styled.h2`
  margin: auto 0;
`;
const VisitsWrap = styled.div`
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
`;
const Col = styled.div``;
const Visit = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  display: flex;
  background-color: #eee;
  padding: 0.5rem;
  border-radius: 0.5rem;
  justify-content: space-between;
  align-items: center;
  p {
    span {
      color: ${({ theme }) => theme.secondary};
      margin: 0 1rem;
    }
  }
`;

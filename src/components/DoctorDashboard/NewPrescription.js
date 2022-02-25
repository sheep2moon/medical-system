import axios from "axios";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { PrimaryButton, SecondaryButton } from "../Buttons";
import { supabase } from "../../supabaseConfig";
import { useEffect } from "react";
import ToastAlert from "../ToastAlert.js";
import { VerticalSpace } from "../Containers.js";
import { useSelector } from "react-redux";

const NewPrescription = () => {
  const [loading, setLoading] = useState(false);
  const [drugList, setDrugList] = useState([]);
  const [formsList, setFormsList] = useState([]);
  const [forms, setForms] = useState([]);
  const [pickedDrug, setPickedDrug] = useState({ name: "", form: "" });
  const [pickedPatientId, setPickedPatientId] = useState("");
  const [patientList, setPatientList] = useState([]);
  const [patientDropdown, setPatientDropdown] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [addedDrugs, setAddedDrugs] = useState([]);
  const drugRef = useRef();
  const patientRef = useRef();
  const drugNoteRef = useRef();
  const { id } = useSelector((state) => state.user);

  const fetchPatients = async () => {
    try {
      const { error, data } = await supabase
        .from("profiles")
        .select()
        .eq("is_doctor", false);
      if (error) throw error;
      else {
        setPatientList(data);
      }
    } catch (error) {
      setAlertMessage(error.message);
    }
  };

  const handleAddDrug = () => {
    if (addedDrugs.some((el) => el.name === pickedDrug.name)) {
      setAlertMessage("Lek znajduje się na liście");
    } else {
      const newlyAdded = {
        name: pickedDrug.name,
        form: pickedDrug.form,
        note: drugNoteRef.current.value,
      };
      setAddedDrugs([...addedDrugs, newlyAdded]);
      drugRef.current.value = "";
      drugNoteRef.current.value = "";
      setForms([]);
      setFormsList([]);
      setPickedDrug({});
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDrugSearch = async (term) => {
    if (term.length > 2) {
      const res = await axios.get(
        `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${term}&ef=STRENGTHS_AND_FORMS,RXCUIS`
      );
      setDrugList(res.data[1]);
      setFormsList(res.data[2].STRENGTHS_AND_FORMS);
      console.log(res.data[1]);
      console.log(res.data[2].STRENGTHS_AND_FORMS);
    } else {
      setDrugList([]);
      setFormsList([]);
      setForms([]);
    }
  };
  const handlePatientSearch = async (term) => {
    if (!term) {
      console.log("Jestem");
      setPatientDropdown([]);
    } else if (patientList) {
      const dropdownArray = patientList.filter((patient) =>
        patient.username.includes(term)
      );
      setPatientDropdown(dropdownArray);
    }
  };
  const handleSubmitPrescription = async () => {
    setLoading(true);
    let textDrugList = [];
    addedDrugs.forEach((drug) =>
      textDrugList.push(`${drug.name}^${drug.form}^${drug.note}`)
    );
    try {
      const { error } = await supabase
        .from("prescriptions")
        .insert([
          { drugs: textDrugList, patient: pickedPatientId, doctor: id },
        ]);
      if (error) throw error;
      else {
        setPickedPatientId(null);
        setAddedDrugs([]);
        setAlertMessage("Recepta została wydana");
      }
    } catch (error) {
      setAlertMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <FormWrapper>
      {alertMessage && (
        <ToastAlert
          message={alertMessage}
          setAlertMessage={setAlertMessage}
          duration={5000}
        />
      )}
      <h1>Nowa recepta</h1>
      <SearchWrap>
        <p>recepta dla:</p>
        <SearchInput
          ref={patientRef}
          onChange={(e) => handlePatientSearch(e.target.value)}
        />
        <DropdownList>
          {patientDropdown.length > 0 &&
            patientDropdown.map((patient, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  patientRef.current.value = patient.username;
                  setPatientDropdown([]);
                  setPickedPatientId(patient.id);
                }}
              >
                {patient.username}
              </ListItem>
            ))}
        </DropdownList>
      </SearchWrap>
      <PrescriptionList>
        {addedDrugs.length > 0 &&
          addedDrugs.map((drug, index) => (
            <DrugItem key={index}>
              <p>{drug.name}</p>
              <p>{drug.form}</p>
              <p>{drug.note}</p>
              <button
                onClick={() => {
                  setAddedDrugs(
                    addedDrugs.filter((item) => item.name !== drug.name)
                  );
                }}
              >
                usuń
              </button>
            </DrugItem>
          ))}
      </PrescriptionList>
      {addedDrugs.length > 0 && (
        <SecondaryButton
          disabled={loading ? true : false}
          onClick={handleSubmitPrescription}
        >
          {loading ? "Wystawianie..." : "Wystaw recepte"}
        </SecondaryButton>
      )}
      <VerticalSpace height={2} />
      <NewDrug>
        <h2>dodaj do recepty</h2>
        <SearchWrap>
          <p>nazwa leku</p>
          <SearchInput
            ref={drugRef}
            onChange={(e) => handleDrugSearch(e.target.value)}
          />
          <DropdownList>
            {drugList.map((drug, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  drugRef.current.value = drug;
                  setForms(formsList[index]);
                  setDrugList([]);
                  setPickedDrug({ ...pickedDrug, name: drug });
                }}
              >
                {drug}
              </ListItem>
            ))}
          </DropdownList>
          {forms.length > 0 && (
            <>
              <p>dawka</p>
              <FormList>
                {forms.map((form, index) => (
                  <ListFormItem
                    key={index}
                    onClick={() => {
                      setPickedDrug({ ...pickedDrug, form });
                    }}
                    isPicked={pickedDrug.form === form}
                  >
                    {form}
                  </ListFormItem>
                ))}
              </FormList>
            </>
          )}
        </SearchWrap>
        <h2>opis</h2>
        <DrugNote ref={drugNoteRef} />
        <PrimaryButton onClick={handleAddDrug}>Dodaj</PrimaryButton>
      </NewDrug>
    </FormWrapper>
  );
};

export default NewPrescription;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;
`;
const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const SearchInput = styled.input`
  width: 100%;
  font-size: 1.2rem;
  padding: 0.5rem 0.25rem;
`;
const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
`;
const ListItem = styled.li`
  font-size: 1.2rem;
  cursor: pointer;
  background: ${({ theme }) => theme.light};
  padding: 0.25rem;
  border: 1px solid #00000020;
  :hover {
    border: 1px solid #00000070;
  }
`;
const ListFormItem = styled.li`
  font-size: 1.2rem;
  cursor: pointer;
  background: ${({ theme, isPicked }) =>
    isPicked ? theme.primary : theme.light};
  padding: 0.25rem;
  border: 1px solid #00000020;
  :hover {
    border: 1px solid #00000070;
  }
`;

const NewDrug = styled.div`
  border: ${({ theme }) => `1px solid ${theme.secondary}`};
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const FormList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0;
  list-style: none;
`;
const DrugNote = styled.textarea`
  margin-bottom: 1rem;
`;
const PrescriptionList = styled.ul``;
const DrugItem = styled.li`
  list-style: decimal;
  font-weight: 600;
  border-bottom: 1px solid #000;
  padding: 0.25rem 0;
  margin: 0.25rem 0;
  position: relative;
  button {
    background-color: ${({ theme }) => theme.primary};
    border: none;
    border-radius: 0.25rem;
    position: absolute;
    box-shadow: 0 0 4px #00000030;
    font-size: 1.2rem;
    bottom: 5px;
    right: 0;
  }
`;

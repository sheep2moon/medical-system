import axios from 'axios';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../Buttons';

const NewPrescription = () => {
  const [drugList, setDrugList] = useState([]);
  const searchRef = useRef();

  const handleSearchChange = async (term) => {
    if (term.length > 3) {
      const res = await axios.get(
        `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${term}&ef=STRENGTHS_AND_FORMS,RXCUIS`
      );
      setDrugList(res.data[1]);
      console.log(res.data[1]);
    }
  };

  return (
    <FormWrapper>
      <h1>nowa recepta</h1>
      <SearchWrap>
        <SearchInput
          ref={searchRef}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <DropdownList>
          {drugList.map((drug, index) => (
            <ListItem
              key={index}
              onClick={() => {
                searchRef.current.value = drug;
                setDrugList([]);
              }}
            >
              {drug}
            </ListItem>
          ))}
        </DropdownList>
      </SearchWrap>
    </FormWrapper>
  );
};

export default NewPrescription;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;
const SearchWrap = styled.div``;
const SearchInput = styled.input`
  width: 300px;
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
  background: ${({ theme }) => theme.secondary};
  padding: 0.25rem;
  border: 1px solid #00000010;
  :hover {
    border: 1px solid #00000070;
  }
`;

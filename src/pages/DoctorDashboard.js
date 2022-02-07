import React from 'react';
import styled from 'styled-components';
import { CenteredContainer } from '../components/Containers';
import NewPrescription from '../components/DoctorDashboard/NewPrescription';

const DoctorDashboard = () => {
  return (
    <CenteredContainer>
      <DashboardContainer>
        <h1>witaj panmie doktorze</h1>
        <NewPrescription />
      </DashboardContainer>
    </CenteredContainer>
  );
};

export default DoctorDashboard;

const DashboardContainer = styled.div`
  background: ${({ theme }) => theme.light};
  width: 100%;
  margin-top: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px 0px #00000040;
  min-height: calc(100vh - 5rem);
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

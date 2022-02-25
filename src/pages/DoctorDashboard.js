import React, { useState } from "react";
import styled from "styled-components";
import { CenteredContainer } from "../components/Containers";
import DashboardViews from "../components/DoctorDashboard/DashboardViews";
import NewPrescription from "../components/DoctorDashboard/NewPrescription";
import SetHours from "../components/DoctorDashboard/SetHours";
import ToastAlert from "../components/ToastAlert";
import EditProfile from "../components/EditProfile";
import DoctorVisits from "../components/DoctorDashboard/DoctorVisits";
const DoctorDashboard = () => {
  const [view, setView] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");
  return (
    <>
      {alertMessage && <ToastAlert message={alertMessage} duration={5000} />}
      <CenteredContainer>
        <DashboardContainer>
          <DashboardViews
            view={view}
            setView={setView}
            setAlertMessage={setAlertMessage}
          />
          {view === 1 && <NewPrescription />}
          {view === 2 && <SetHours />}
          {view === 3 && <EditProfile />}
          {view === 4 && <DoctorVisits />}
        </DashboardContainer>
      </CenteredContainer>
    </>
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

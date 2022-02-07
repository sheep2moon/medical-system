import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { CenteredContainer } from '../components/Containers';
import DatePicker from '../components/Profile/DatePicker';
import NewVisit from '../components/Profile/NewVisit';
import Options from '../components/Profile/Options';
import YourVisits from '../components/Profile/YourVisits';
import EditProfile from '../components/Profile/EditProfile';
import ToastAlert from '../components/ToastAlert';

const Profile = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [option, setOption] = useState(0);
  const { id, age, email, visits, username } = useSelector(
    (state) => state.user
  );

  return (
    <CenteredContainer>
      <ProfileWrapper>
        {error && <ToastAlert message={error} duration={false} />}
        <h1>{`${username} (${email})`}</h1>
        {<Options setError={setError} setOption={setOption} option={option} />}
        {option === 1 && <YourVisits setOption={setOption} visits={visits} />}
        {option === 2 && <NewVisit setOption={setOption} />}
        {option === 3 && <EditProfile setOption={setOption} />}
      </ProfileWrapper>
    </CenteredContainer>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.light};
  border-radius: 0.5rem;
  box-shadow: 0 0 10px 0px #00000040;
  margin-top: 1rem;
  min-height: calc(100vh - 5rem);
`;

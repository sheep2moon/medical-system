import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CenteredContainer } from '../components/Containers';
import NewVisit from '../components/Profile/NewVisit';
import Options from '../components/Profile/Options';
import YourVisits from '../components/Profile/YourVisits';
import EditProfile from '../components/EditProfile';
import ToastAlert from '../components/ToastAlert';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../redux/userSlice';
import { supabase } from '../supabaseConfig';

const Profile = () => {
  const [option, setOption] = useState(0);
  const { visits, username } = useSelector((state) => state.user);
  const [alertMessage, setAlertMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!username) {
      const user = supabase.auth.user();
      dispatch(fetchUserProfile(user.id));
    }
  }, []);

  return (
    <CenteredContainer>
      <ProfileWrapper>
        {alertMessage && <ToastAlert message={alertMessage} duration={5000} />}
        <TopText>
          {username
            ? username
            : 'przejdz do edycji profilu i ustaw dane personalne'}
        </TopText>
        {
          <Options
            setAlertMessage={setAlertMessage}
            setOption={setOption}
            option={option}
          />
        }
        {option === 1 && (
          <YourVisits
            setOption={setOption}
            setAlertMessage={setAlertMessage}
            visits={visits}
          />
        )}
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
const TopText = styled.p`
  font-size: 1.6rem;
`;

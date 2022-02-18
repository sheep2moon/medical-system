import React from 'react';
import { BiExit } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { BsJournalBookmark, BsBook } from 'react-icons/bs';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseConfig';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/userSlice';

const DashboardViews = ({ view, setView, setAlertMessage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      setAlertMessage(error);
    } else {
      dispatch(updateUser(null));
      navigate('/');
    }
  };

  return (
    <ViewsContainer>
      <ViewButton onClick={() => setView(1)} isActive={view === 1}>
        <BsBook />
        <p>Wypisz recepte</p>
      </ViewButton>
      <ViewButton onClick={() => setView(2)} isActive={view === 2}>
        <BsJournalBookmark />
        <p>Terminy</p>
      </ViewButton>
      <ViewButton onClick={() => setView(3)} isActive={view === 3}>
        <CgProfile />
        <p>Edytuj profil</p>
      </ViewButton>
      <ViewButton onClick={() => setView(4)} isActive={view === 4}>
        <BsBook />
        <p>Wizyty</p>
      </ViewButton>
      <ViewButton onClick={Logout}>
        <BiExit />
        <p>Wyloguj</p>
      </ViewButton>
    </ViewsContainer>
  );
};

export default DashboardViews;

const ViewsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.1rem;
`;
const ViewButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  gap: 1rem;
  box-shadow: ${({ isActive, theme }) =>
    isActive ? `0 5px 5px ${theme.primary}` : ''};
  svg {
    font-size: 1.4rem;
    margin: 0 0.5rem;
  }
`;

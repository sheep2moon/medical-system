import React from 'react';
import styled from 'styled-components';
import { BiExit } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { BsJournalBookmark, BsBook } from 'react-icons/bs';
import { supabase } from '../../supabaseConfig';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Options = ({ setAlertMessage, setOption, option }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Logout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      setAlertMessage(error.message);
    } else {
      dispatch(updateUser(null));
      navigate('/');
    }
  };

  return (
    <OptionsContainer>
      <OptionWrapper onClick={() => setOption(1)} isActive={option === 1}>
        <BsBook />
        <OptionText>Twoje wizyty</OptionText>
      </OptionWrapper>

      <OptionWrapper onClick={() => setOption(2)} isActive={option === 2}>
        <BsJournalBookmark />
        <OptionText>Umów na wizyte</OptionText>
      </OptionWrapper>

      <OptionWrapper onClick={() => setOption(3)} isActive={option === 3}>
        <CgProfile />
        <OptionText>Edytuj Profil</OptionText>
      </OptionWrapper>

      <OptionWrapper onClick={Logout}>
        <BiExit />
        <OptionText>Wyloguj</OptionText>
      </OptionWrapper>
    </OptionsContainer>
  );
};

export default Options;

const OptionsContainer = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;
const OptionWrapper = styled.button`
  cursor: pointer;
  display: flex;
  padding: 0 2rem;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  border-radius: 0.25rem;
  box-shadow: ${({ isActive, theme }) =>
    isActive ? `0 5px 5px ${theme.primary}` : ''};
  background: ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.light};

  svg {
    font-size: 2.2rem;
  }
`;
const OptionText = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
`;

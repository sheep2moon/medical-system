import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateUser } from '../../redux/userSlice';
import { supabase } from '../../supabaseConfig';
import { SecondaryButton } from '../Buttons';
import ToastAlert from '../ToastAlert';

const UserInfo = () => {
  const [inputUsername, setInputUsername] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { age, username } = useSelector((state) => state.user);
  useEffect(() => {
    if (age) setInputAge(age);
    if (username) setInputUsername(username);
  }, [age, username]);

  const handleUpdateProfile = async (username, age) => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user?.id,
        username: inputUsername,
        age: inputAge,
        updated_at: new Date(),
        avatar_url: '',
      };

      let response = await supabase
        .from('profiles')
        .upsert(updates, { returning: 'minimal' });
      console.log(response);
      if (response.status === 201) {
        setAlertMessage('Pomyślnie zaktualizowano profil');
        dispatch(updateUser({ username: inputUsername, age: inputAge }));
      }
      if (response.error) throw response.error;
    } catch (error) {
      console.log('ERRO');
      setAlertMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setAlertMessage('Wprowadzone hasłą nie są takie same.');
    }
  };

  return (
    <FormsContainer>
      {alertMessage && (
        <ToastAlert
          message={alertMessage}
          setAlertMessage={setAlertMessage}
          duration={5000}
        />
      )}
      <UpdateForm>
        <h1>Dane personalne</h1>
        <SLabel>Imię i nazwisko</SLabel>
        <SInput
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
        />
        <SLabel>Wiek</SLabel>
        <SInput
          value={inputAge}
          onChange={(e) => setInputAge(e.target.value)}
        />
        <SecondaryButton
          onClick={(e) => {
            e.preventDefault();
            handleUpdateProfile(username, age);
          }}
        >
          {loading ? 'Czekaj...' : 'Potwierdź'}
        </SecondaryButton>
      </UpdateForm>
      <UpdateForm>
        <h1>Zmiana hasła</h1>
        <SLabel>Nowe hasło</SLabel>
        <SInput
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <SLabel>Powtórz nowe hasło</SLabel>
        <SInput
          type='password'
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <SecondaryButton
          onClick={(e) => {
            e.preventDefault();
            handlePasswordChange(newPassword, confirmNewPassword);
          }}
        >
          {loading ? 'Czekaj...' : 'Zmień hasło'}
        </SecondaryButton>
      </UpdateForm>
    </FormsContainer>
  );
};

export default UserInfo;

const FormsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
const UpdateForm = styled.div`
  display: flex;
  flex-direction: column;
`;
const SLabel = styled.label`
  font-size: 1.6rem;
  margin-bottom: -0.5rem;
`;
const SInput = styled.input`
  padding: 0.25rem 0.25rem;
  margin: 0.5rem 0;
  font-size: 1.6rem;
  :last-child {
    margin-bottom: 2rem;
  }
`;

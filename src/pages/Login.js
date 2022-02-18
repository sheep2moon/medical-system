import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton } from '../components/Buttons';
import { CenteredContainer, VerticalSpace } from '../components/Containers';
import { StyledForm, StyledInput, StyledLabel } from '../components/Forms';
import ToastAlert from '../components/ToastAlert';
import { fetchUserProfile } from '../redux/userSlice';
import { supabase } from '../supabaseConfig';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const { is_doctor, id } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const res = await supabase.auth.signIn({ email, password });
      if (res.error) throw res.error;
      console.log('login', res);
      dispatch(fetchUserProfile(res.user.id));
      if (res.user.is_doctor) {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      if (error) {
        setAlertMessage(error.message);
      } else {
        setAlertMessage('Nieprawidłowe dane');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CenteredContainer>
        <ToastAlert
          message={alertMessage}
          setAlertMessage={setAlertMessage}
          duration={5000}
        />

        <StyledForm>
          <StyledLabel>Adres email</StyledLabel>
          <StyledInput
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledLabel>Hasło</StyledLabel>
          <StyledInput
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <VerticalSpace height={2} />
          <PrimaryButton
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email, password);
            }}
            disabled={loading}
          >
            {loading ? 'Czekaj...' : 'Zaloguj'}
          </PrimaryButton>
          <BottomTextWrap>
            <p>Nie masz konta?</p>
            <StyledLink to='/register'>Zarejestruj się</StyledLink>
          </BottomTextWrap>
        </StyledForm>
      </CenteredContainer>
    </>
  );
};

export default Register;

const BottomTextWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  margin-left: 0.75rem;
`;

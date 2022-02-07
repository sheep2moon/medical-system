import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton } from '../components/Buttons';
import { CenteredContainer } from '../components/Containers';
import { supabase } from '../supabaseConfig';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (email, password, repeatPassword) => {
    if (password !== repeatPassword) {
      return;
    }
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CenteredContainer>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledLabel>Powtórz hasło</StyledLabel>
          <StyledInput
            id='repeat-password'
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <PrimaryButton
            onClick={(e) => {
              e.preventDefault();
              handleSignup(email, password, repeatPassword);
            }}
            disabled={loading}
          >
            {loading ? 'Czekaj...' : 'Zarejestruj'}
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

const StyledForm = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;
const StyledInput = styled.input`
  padding: 1rem;
  margin-bottom: 0.5rem;
`;
const StyledLabel = styled.label`
  font-size: 1.4rem;
`;
const BottomTextWrap = styled.div`
  display: flex;
  font-size: 1.2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  margin-left: 0.75rem;
`;

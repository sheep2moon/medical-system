import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PrimaryButton } from '../components/Buttons';
import { CenteredContainer } from '../components/Containers';
import ToastAlert from '../components/ToastAlert';
import { updateUser } from '../redux/userSlice';
import { supabase } from '../supabaseConfig';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const res = await supabase.auth.signIn({ email, password });
      if (res.error) throw error;
      console.log(res);
      dispatch(updateUser(res.user));
      navigate('/profile');
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CenteredContainer>
        {error && <ToastAlert message={error} duration={false} />}
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
          <PrimaryButton
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email, password);
            }}
            disabled={loading}
          >
            {loading ? 'Czekaj...' : 'Zaloguj'}
          </PrimaryButton>
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
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;
const StyledLabel = styled.label`
  font-size: 1.4rem;
`;

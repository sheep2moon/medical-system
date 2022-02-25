import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PrimaryButton } from "../components/Buttons";
import { CenteredContainer, VerticalSpace } from "../components/Containers";
import { StyledInput, StyledLabel } from "../components/Forms";
import ToastAlert from "../components/ToastAlert.js";
import { supabase } from "../supabaseConfig";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (email, password, repeatPassword) => {
    if (password !== repeatPassword) {
      setAlertMessage("Hasła nie są takie same");
      return;
    }
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      console.log("register", data);
      navigate("/login");
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CenteredContainer>
        {alertMessage && (
          <ToastAlert
            message={alertMessage}
            setAlertMessage={setAlertMessage}
            duration={false}
          />
        )}
        <StyledForm>
          <StyledLabel>Adres email</StyledLabel>
          <StyledInput
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledLabel>Hasło</StyledLabel>
          <StyledInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledLabel>Powtórz hasło</StyledLabel>
          <StyledInput
            type="password"
            id="repeat-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <VerticalSpace height={2} />
          <PrimaryButton
            onClick={(e) => {
              e.preventDefault();
              handleSignup(email, password, repeatPassword);
            }}
            disabled={loading}
          >
            {loading ? "Czekaj..." : "Zarejestruj"}
          </PrimaryButton>
          <BottomTextWrap>
            <p>Masz już konto?</p>
            <StyledLink to="/login">Zaloguj się</StyledLink>
          </BottomTextWrap>
        </StyledForm>
      </CenteredContainer>
    </>
  );
};

export default Register;

const StyledForm = styled.form`
  margin: auto 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;
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

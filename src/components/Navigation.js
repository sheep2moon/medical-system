import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchUserProfile, updateUser } from '../redux/userSlice';
import { supabase } from '../supabaseConfig';
import { GiHospitalCross } from 'react-icons/gi';
import { PrimaryButton } from './Buttons.js';
const Navigation = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  const navigate = useNavigate()

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      dispatch(fetchUserProfile(user.id));
    }
  }, []);

  const logout = async () => {
    let { error } = await supabase.auth.signOut();
    if(error){
      console.log(error);
    }else{
      dispatch(updateUser(null));
      navigate('/');
    }
  };

  const navigateToLogin = () => {
    navigate('/login')
  }

  return (
    <NavContainer>
      <Navbar>
        <LogoWrap>
          <GiHospitalCross />
          <h1>Medyczny System Pacjenta</h1>

        </LogoWrap>
        
        {id ? (
          <NavButton onClick={logout}>Wyloguj</NavButton>
        ) : (
          <NavButton onClick={navigateToLogin}>Zaloguj</NavButton>
        )}
      </Navbar>
    </NavContainer>
  );
};

export default Navigation;

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 4rem;
  z-index: 999;
  background: ${({ theme }) => theme.light};
  box-shadow: 0 0 25px 2px #00000070;

  display: flex;
  align-items: center;
`;

const Navbar = styled.nav`
  width: 95vw;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;
const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.secondary};
  svg {
    color: ${({ theme }) => theme.secondary};
    font-size: 3rem;
    margin-right: 0.5rem;
  }
`;
const NavButton = styled.button`
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.light};
  border-radius: 0.25rem;
  padding: 0 1rem;
  font-size: 1.2rem;
  margin: 0 1rem 0 auto;
  transition: all 0.2s ease-in-out;
  :hover{
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    box-shadow: ${({theme}) => `0 2px 4px ${theme.dark}`};
  }
  
`;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchUserProfile } from '../redux/userSlice';
import { supabase } from '../supabaseConfig';
import { GiHospitalCross } from 'react-icons/gi';
const Navigation = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user);

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      dispatch(fetchUserProfile(user.id));
    }
  }, []);

  return (
    <NavContainer>
      <Navbar>
        <LogoWrap>
          <GiHospitalCross />
          <h1>Medyczny System Pacjenta</h1>
        </LogoWrap>
        {username ? (
          <NavLink to='/profile'>{username}</NavLink>
        ) : (
          <NavLink to='/login'>Zaloguj</NavLink>
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
  height: 6rem;
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
  font-size: 1.8rem;
  color: ${({ theme }) => theme.secondary};
  svg {
    color: ${({ theme }) => theme.secondary};
    font-size: 4rem;
    margin-right: 0.5rem;
  }
`;
const NavLink = styled(Link)`
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.light};
  border-radius: 0.25rem;
  padding: 0 1rem;
  font-size: 1.6rem;
  text-decoration: none;
  margin: 0 1rem;
  :last-child {
    margin-left: auto;
  }
`;

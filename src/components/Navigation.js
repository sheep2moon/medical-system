import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { updateUser } from '../redux/userSlice';
import { supabase } from '../supabaseConfig';

const Navigation = () => {
  const dispatch = useDispatch();

  const setLocalData = async (user) => {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', user.id);
    if (error) {
      //handle error
      console.log(error);
    } else {
      //handle data
      console.log(data);
      const userData = {
        id: user.id,
        email: user.email,
        username: data[0].username,
        visits: data[0].visits_id,
        age: data[0].age,
      };
      dispatch(updateUser(userData));
    }
  };

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      setLocalData(user);
    }
  }, []);

  return (
    <NavContainer>
      <Navbar>
        <NavLink to='/'>Strona Główna</NavLink>
        <NavLink to='/profile'>Profil</NavLink>
        <NavLink to='/login'>Zaloguj</NavLink>
        <NavLink to='/register'>rejestracja</NavLink>
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
  background: ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.light};
  display: flex;
  align-items: center;
`;

const Navbar = styled.nav`
  width: 100vw;
  display: flex;
  align-items: center;
`;
const NavLink = styled(Link)`
  color: ${({ theme }) => theme.light};
  font-size: 2rem;
  text-decoration: none;
  margin: 0 1rem;
`;

import React from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../components/Buttons';
import { CenteredContainer } from '../components/Containers';
import home_doctor from '../assets/home_doctor.svg'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <CenteredContainer>
      <HomeWrapper>
        <HeroImg src={home_doctor}/>
        <Col>
          <h1>Witaj w elektronicznym systemie rejestracji pacjenta.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eius voluptatem amet velit reiciendis ex nisi possimus, voluptatum repellendus quidem, libero debitis dolore facilis, corporis unde fugit numquam esse impedit!</p>
          <Opt>
            <h2>Jeżeli masz konto</h2>
            <SLink to='/login'>Przejdź do logowania</SLink>
          </Opt>
          <Opt>
            <h2>W przeciwnym wypadku</h2>
            <SLink to='/register'>Zarejestruj się</SLink>
          </Opt>
        </Col>
      </HomeWrapper>
    </CenteredContainer>
  );
};

export default Home;

const HomeWrapper = styled.div`
  display:flex;
  margin:auto auto;
  gap: 2rem;
  background-color:${({theme}) => theme.light};
  padding: 2rem  1rem;
  border-radius: 2rem;
`

const HeroImg = styled.img`
  max-width: 500px;
`
const Col = styled.div`
  max-width: 500px;
  h1{
    text-align: center;
    margin-bottom: 1rem;
  }
`
const Opt = styled.div`
  display:flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`
const SLink = styled(Link)`
  background-color: ${({theme}) => theme.secondary};
  color: ${({theme}) => theme.light};
  font-weight: 700;
  font-size:1.2rem;
  text-decoration: none;
  display:flex;
  padding:0.25rem 0.5rem;
  border-radius:0.5rem;
  margin: 0 1rem;
  align-items: center;
`
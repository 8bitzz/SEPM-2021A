import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';

function Result() {
    return (
        <Wrapper>
            <NavBar/>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  padding-left: 4em;
  background: #ffffff;
  height:100vh;
  text-align: center;
`;

export default Result;

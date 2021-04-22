import React from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import { useHistory } from 'react-router-dom';

const ResultPage = (props) => {
    const history = useHistory();
    return (
        <Wrapper>
            <NavBar/>
            <VideosWrapper>
                <h1>Result Page</h1>
                <br />
                <button onClick={() => history.goBack()}>Go Back</button>
            </VideosWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  padding-left: 4em;
  background: #ffffff;
  height:100vh;
  text-align: center;
`;

const VideosWrapper = styled.section`
  padding-top: 20em;
  background: #ffffff;
  height:100vh;
  text-align: center;
`;

export default ResultPage;

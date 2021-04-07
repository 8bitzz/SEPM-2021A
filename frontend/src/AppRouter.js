import React from 'react';
import App from './App';

import styled from 'styled-components';
import cover from './images/cover.png';
import { Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';

function AppRouter() {
    return (
      <Wrapper>
        <LogoWrapper>
            <img src={cover} alt="cover" width="600px"></img>
            <div>
                <Link to="/search"><button>Login</button></Link>
            </div>
                
        
                
        
        </LogoWrapper>
      </Wrapper>

    
    );
  }
  
  const Wrapper = styled.section`
    padding-left: 4em;
    background: #ffffff;
    height:100vh;
    text-align: center;
  `;
  
  const LogoWrapper = styled.div`
    padding-top:10vh;
    height:30vh;
    text-align: center;
  `;
  
  export default AppRouter;
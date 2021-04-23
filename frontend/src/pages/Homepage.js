import styled from 'styled-components';
import NavBar from '../components/NavBar';
import cover from '../images/cover.png';
import EduSearchBar from '../components/EduSearchBar';
import EduSearchButton from '../components/EduSearchButton';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <Wrapper>
      <NavBar/>
      <LogoWrapper>
        <img src={cover} alt="cover" height="200px"></img>
      </LogoWrapper>
      <EduSearchBar/>
      <EduSearchButton name='How to search'/>
      <LinkWrapper to='/result'><EduSearchButton name='Search this'/></LinkWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin: 0px;
  background: #ffffff;
  height:100vh;
  text-align: center;
`;

const LogoWrapper = styled.div`
  margin-top: 40px;
  height:200px;
  text-align: center;
`;

const LinkWrapper = styled(Link)`
  text-decoration: none;
`;

export default Homepage;

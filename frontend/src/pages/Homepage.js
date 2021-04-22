import styled from 'styled-components';
import NavBar from '../components/NavBar';
import cover from '../images/cover.png';
import HomeSearchBar from '../components/HomeSearchBar';
import SearchButton from '../components/SearchButton';

function Homepage() {
  return (
    <Wrapper>
      <NavBar/>
      <LogoWrapper>
        <img src={cover} alt="cover" width="600px"></img>
      </LogoWrapper>
      <HomeSearchBar/>
      <SearchButton name='How to search'/>
      <SearchButton name='Search this'/>
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

export default Homepage;

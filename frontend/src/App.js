import styled from 'styled-components';
import Search from './components/Search';
import NavBar from './components/NavBar';
import cover from './images/cover.png';

function App() {
  return (
    <Wrapper>
      <NavBar/>
      <LogoWrapper>
        <img src={cover} alt="cover" width="600px"></img>
      </LogoWrapper>
      <Search/>
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

export default App;

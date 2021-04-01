import styled from 'styled-components';
import Search from './components/Search';
import NavBar from './components/NavBar';

function App() {
  return (
    <Wrapper>
      <NavBar/>
      <LogoWrapper>
        <p>Welcome to EduSearch</p>
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

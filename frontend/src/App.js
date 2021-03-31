import './App.css';
import styled from 'styled-components';
import Search from './components/Search';

function App() {
  const Wrapper = styled.section`
    padding-left: 4em;
    background: #ffffff;
    height:100vh;
    text-align: center;
  `;

  return (
    <Wrapper>
      <p>Welcome to EduSearch</p>
      <Search/>
    </Wrapper>
  );
}

export default App;

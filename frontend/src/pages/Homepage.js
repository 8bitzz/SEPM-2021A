import React from 'react';
import styled from 'styled-components';
import HomeNavBar from '../components/HomeNavBar';
import cover from '../images/cover.png';
import EduSearchBar from '../components/EduSearchBar';
import EduSearchButton from '../components/EduSearchButton';
import { useHistory } from "react-router-dom"

const Homepage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const history = useHistory();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const putSearchParam = (event) => {
    const params = new URLSearchParams()
    if (searchTerm) {
      params.append("term", searchTerm)
    } else {
      params.delete("term")
    }
    history.push({
      pathname: '/search',
      search: params.toString()
    })
  }

  const handleSubmit = (event) => {
    putSearchParam();
    event.preventDefault();
  }

  return (
    <Wrapper>
      <HomeNavBar/>
      <LogoWrapper>
        <img src={cover} alt="cover" height="200px"></img>
      </LogoWrapper>
      <form onSubmit={handleSubmit}>
        <EduSearchBar searchTerm={searchTerm} onSearch={handleSearch}/>
      </form>
      <EduSearchButton name='How to search'/>
      <EduSearchButton name='Search this' onClick={putSearchParam}/>
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

export default Homepage;

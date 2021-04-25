import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import cover from '../images/cover.png';
import EduSearchBar from '../components/EduSearchBar';
import EduSearchButton from '../components/EduSearchButton';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom"

const Homepage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const history = useHistory();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const putSearchParam = () => {
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

  return (
    <Wrapper>
      <Navigation/>
      <LogoWrapper>
        <img src={cover} alt="cover" height="200px"></img>
      </LogoWrapper>
      <EduSearchBar searchTerm={searchTerm} onSearch={handleSearch}/>
      <EduSearchButton name='How to search'/>
      <EduSearchButton name='Search this' handleClick={putSearchParam}/>
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

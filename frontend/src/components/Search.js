import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

function Search() {
    return(
        <form>
            <SearchBar>
                <IconGray/>
                <SearchInput/>
            </SearchBar>
            <SearchButton>Search this</SearchButton>
            <SearchButton>How to search?</SearchButton>
        </form>
    );
}

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid lightgray;
    height: 30px;
    padding: 10px 20px;
    border-radius: 999px;
    width: 75vw;
    margin: 1rem auto;
    margin-top: 40px;
    max-width: 560px;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 10px 20px;
    border: none;
    font-size: medium;

    :focus {
        outline-width: 0;
    }
`;

const SearchButton = styled.button`
    padding: 7px 15px;
    background-color: #f8f8f8;
    border: 1px solid white;
    color: #5f6368;
    font-size: medium;
    margin-right: 5px;

    :hover {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        background-image: -webkit-linear-gradient(top, #f8f8f8, #f1f1f1);
        background-color: #f8f8f8;
        border: 1px solid #c6c6c6;
        color: #222;
    }
`;

const IconGray = styled(SearchIcon)`
    color: gray;
`;

export default Search;
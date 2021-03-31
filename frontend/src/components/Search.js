import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

function Search() {
    return(
        <form>
            <SearchBar>
                <IconGray/>
                <SearchInput/>
            </SearchBar>
            <SearchButton>How to search</SearchButton>
            <SearchButton>Search this</SearchButton>
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

const SearchButton = styled(Button)`
    background-color: #f8f8f8 !important;
    color: #5f6368 !important;
    margin: 5px !important;
    padding: 7px 15px !important;
    text-transform: capitalize !important;

    :hover {
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1)!important;
        color: #222 !important;
    }
`;

const IconGray = styled(SearchIcon)`
    color: gray;
`;

export default Search;
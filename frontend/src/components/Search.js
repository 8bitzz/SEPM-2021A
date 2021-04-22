import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const Search = (props) => {
    const history = useHistory();
    return(
        <form>
            <SearchBar>
                <IconGray/>
                <SearchInput/>
            </SearchBar>
            <SearchButton>How to search</SearchButton>
            <SearchButton onClick={() => history.push('/contact')}>Go to contact</SearchButton>
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
    margin: 30px auto;
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
    && {
        background-color: #f8f8f8;
        color: #5f6368;
        margin: 5px;
        padding: 7px 15px;
        text-transform: capitalize;
    }
    
    &&:hover {
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
        color: #222;
    }
`;

const IconGray = styled(SearchIcon)`
    color: gray;
`;

export default Search;
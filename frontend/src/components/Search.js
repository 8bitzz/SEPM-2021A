import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

function Search() {
    const SearchInput = styled.div`
        display: flex;
        align-items: center;
        border: 1px solid lightgray;
        height: 30px;
        padding: 10px 20px;
        border-radius: 999px;
        width: 75vw;
        margin: 0 auto;
        margin-top: 40px;
        max-width: 560px;
    `;

    return(
        <form>
            <SearchInput>
                <SearchIcon/>
                <input/>
            </SearchInput>
            <Button>I'm feeling lucky</Button>
        </form>
    );
}

export default Search;
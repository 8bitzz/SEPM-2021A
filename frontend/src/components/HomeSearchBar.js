import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

function HomeSearchBar() {
    return (
        <>
            <SearchBar>
                <IconGray/>
                <SearchInput/>
            </SearchBar>
        </>
    )
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

const IconGray = styled(SearchIcon)`
    color: gray;
`;

export default HomeSearchBar

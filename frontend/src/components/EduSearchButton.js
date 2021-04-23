import React from 'react'
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const EduSearchButton = ({name}) => {
    return (
        <>
            <StyledButton>{name}</StyledButton>
        </>
    )
}

const StyledButton = styled(Button)`
    && {
        background-color: #f8f8f8;
        color: #5f6368;
        margin: 5px;
        padding: 7px 15px;
        text-transform: capitalize;
    }
    
    &&:hover {
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
        background-color: #7de38d;
        color: #222;
    }
`;

export default EduSearchButton

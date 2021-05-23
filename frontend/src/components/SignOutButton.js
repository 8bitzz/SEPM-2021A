import React from 'react';
import { withFirebase } from '../services/index';
import EduSearchButton from './EduSearchButton';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import { useHistory } from "react-router-dom"

// const StyledButton = styled(Button)`
//     && {
//         background-color: #f8f8f8;
//         color: #5f6368;
//         margin: 5px;
//         padding: 7px 15px;
//         text-transform: capitalize;
//     }
    
//     &&:hover {
//         box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
//         background-color: #b23b3b;
//         color: #222;
//     }
// `;
const SignOutButton = ({ firebase }) => {
    const history = useHistory();
    
    const handleSignOut = () => {
        firebase.doSignOut();
        localStorage.removeItem("userID");
        history.push('/');
    }

    return (
        <EduSearchButton handleClick={handleSignOut} name="Sign out"/>
    );
}

export default withFirebase(SignOutButton);
import React from 'react';
import { withFirebase } from '../services/index';
import EduSearchButton from './EduSearchButton';

import { useHistory } from "react-router-dom"

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
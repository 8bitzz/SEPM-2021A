import React from 'react';
import { withFirebase } from '../services/index';
import EduSearchButton from './EduSearchButton';

const SignOutButton = ({ firebase }) => {
    return (
        <EduSearchButton handleClick={firebase.doSignOut} name="Sign out"/>
    );
}

export default withFirebase(SignOutButton);
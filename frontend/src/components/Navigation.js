import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import EduSearchButton from './EduSearchButton';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';

const Navigation = ({authUser}) => {
    return(
        <NavWrap position="fixed">
            {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
        </NavWrap>
    );
}

const NavigationNonAuth = () => {
    return (
        <>
            <Toolbar>
                <LinkWrap to="/signin"><EduSearchButton name="Sign in"></EduSearchButton></LinkWrap>
            </Toolbar>
        </>
    );
}
 
const NavigationAuth = () => {
    return(
        <>
            <Toolbar>
                <SignOutButton />
            </Toolbar>
        </>
    );
}

const LinkWrap = styled(Link)`
    text-decoration: none;
`;

const NavWrap = styled(AppBar)`
    background-color: #fff;
    color: #5f6368;
    box-shadow: 0px 0px 0px 0px;
    align-items: flex-end
`;

export default Navigation;
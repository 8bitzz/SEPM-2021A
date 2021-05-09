import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import EduSearchButton from './EduSearchButton';
import { Link } from 'react-router-dom';
import SignOutButton from './SignOutButton';
 
import { AuthUserContext } from '../session/index';

const HomeNavBar = () => {
    return(
        <AuthUserContext.Consumer>
            { authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    );
}

const NavigationNonAuth = () => {
    return (
        <NavWrap position="fixed">
            <Toolbar>
                <LinkWrap to="/signin"><EduSearchButton name="Sign in"></EduSearchButton></LinkWrap>
            </Toolbar>
        </NavWrap>
    );
}
 
const NavigationAuth = () => {
    return(
        <NavWrap position="fixed">
            <Toolbar>
                <SignOutButton />
            </Toolbar>
        </NavWrap>
    );
}

const LinkWrap = styled(Link)`
    text-decoration: none;
`;

const NavWrap = styled(AppBar)`
    && {
        background-color: #ffffff;
        color: #5f6368;
        box-shadow: 0px 0px 0px 0px;
        align-items: flex-end;
    }
    
`;

export default HomeNavBar;
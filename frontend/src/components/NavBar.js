import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import EduSearchButton from './EduSearchButton';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOutButton';
 
import { AuthUserContext } from '../session/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: '#fff', 
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: "#4ca790",
      
    },
    toolBar: {
      justifyContent: 'space-between',
    },
    user: {
      marginLeft: theme.spacing(1),
      // flexGrow: 1,
    }
  }),
);

const LinkWrap = styled(Link)`
    text-decoration: none;
    color: #ffffff;
`;

const NavBar = () => {
    return(
        <AuthUserContext.Consumer>
            { authUser =>
                authUser ? <NavBarAuth /> : <NavBarNonAuth />
            }
        </AuthUserContext.Consumer>
    );
} 

const NavBarAuth = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <LinkWrap to='/'>
                        <Typography variant="h6" className={classes.logo} noWrap>
                            EduSearch
                        </Typography>
                    </LinkWrap>
                    <div>
                        <SignOutButton/>
                        <IconButton className={classes.user} color="inherit" ><AccountCircle/></IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const NavBarNonAuth = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <LinkWrap to='/'>
                        <Typography variant="h6" className={classes.logo} noWrap>
                            EduSearch
                        </Typography>
                    </LinkWrap>
                    <div>
                        <LinkWrap to="/signin"><EduSearchButton name="Sign in"></EduSearchButton></LinkWrap>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;

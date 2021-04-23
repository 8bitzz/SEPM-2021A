import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import EduSearchButton from './EduSearchButton';

const useStyles = makeStyles({
    navBar: {
        backgroundColor: "#fff",
        color: "#5f6368",
        boxShadow: "0px 0px 0px 0px",
        alignItems:'flex-end'
    }
});

function NavBar() {
    const classes = useStyles();

    return(
        <AppBar position="fixed" className={classes.navBar}>
            <Toolbar>
                <EduSearchButton name="Sign up"></EduSearchButton>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
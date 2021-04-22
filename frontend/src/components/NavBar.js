import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

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
    const history = useHistory();

    return(
        <AppBar position="fixed" className={classes.navBar}>
            <Toolbar>
                <AuthenButton onClick={() => history.push('/contact')}>Sign up</AuthenButton>
            </Toolbar>
        </AppBar>
    );
}

const AuthenButton = styled(Button)`
    && {
        background-color: #f8f8f8;
        color: #5f6368;
        margin: 5px;
        padding: 7px 15px;
        text-transform: uppercase;
    }
    
    &&:hover {
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
        background-color: #7de38d;
        color: #222;
    }
`;


export default NavBar;
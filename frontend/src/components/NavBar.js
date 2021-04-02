import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
                <Button>Sign up</Button>
                <Button>Log in</Button>
                <IconButton>
                    <AccountCircle/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
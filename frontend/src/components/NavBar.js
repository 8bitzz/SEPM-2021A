import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
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

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const NavBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <LinkWrapper to='/'>
                        <Typography variant="h6" className={classes.logo} noWrap>
                            EduSearch
                        </Typography>
                    </LinkWrapper>
                    <div>
                        <IconButton className={classes.user} color="inherit" ><AccountCircle/></IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;

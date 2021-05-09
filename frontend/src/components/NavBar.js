import React from "react";
import { createStyles, makeStyles, fade } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import EduSearchButton from "./EduSearchButton";
import SignOutButton from "./SignOutButton";

import { AuthUserContext } from "../session/index";
import styled from "styled-components";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      backgroundColor: "#fff",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: "#4ca790",
    },
    toolBar: {
      justifyContent: "space-between",
    },
    user: {
      marginLeft: theme.spacing(1),
      // flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '20ch',
          // '&:focus': {
          //   width: '20ch',
          // },
        },
    },
  })
);

const LinkWrap = styled(Link)`
  text-decoration: none;
  color: #ffffff;
`;

const NavBar = ({searchTerm, onSearch, onSubmit}) => {
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavBarAuth searchTerm={searchTerm} onSearch={onSearch} onSubmit={onSubmit}/> : <NavBarNonAuth searchTerm={searchTerm} onSearch={onSearch} onSubmit={onSubmit}/>)}
    </AuthUserContext.Consumer>
  );
};

const NavBarAuth = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <LinkWrap to="/">
            <Typography variant="h6" className={classes.logo} noWrap>
              EduSearch
            </Typography>
          </LinkWrap>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={props.onSubmit}>
              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={props.searchTerm}
                onChange={props.onSearch}
                autoFocus
              />
            </form>
            
          </div>
          <div>
            <SignOutButton />
            <IconButton className={classes.user} color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const NavBarNonAuth = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <LinkWrap to="/">
            <Typography variant="h6" className={classes.logo} noWrap>
              EduSearch
            </Typography>
          </LinkWrap>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={props.onSubmit}>
              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={props.searchTerm}
                onChange={props.onSearch}
                autoFocus
              />
            </form>
          </div>
          <div>
            <LinkWrap to="/signin">
              <EduSearchButton name="Sign in"></EduSearchButton>
            </LinkWrap>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;

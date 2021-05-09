import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

import styled from "styled-components";
import { Link } from "react-router-dom";
import {useLocation} from "react-router-dom";

import Video from "../components/Video";
import SaveButton from "../components/SaveButton";
import NavBar from "../components/NavBar";
import { AppBar } from "@material-ui/core";

const drawerWidth = 250;

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 5,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: '#4ca790',
    color: 'white',
  },
}))(Badge);

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
      justifyContent: 'space-between',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2, 16, 2, 14),
    },
    functionBar: {
      paddingLeft: theme.spacing(5),
      justifyContent: "space-between",
    },
    clipBar: {
      display: "flex",
      alignItems: "center",
    },
    countClip: {},
    transcript: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(5),
    },
    keywordsBar: {
      paddingLeft: theme.spacing(5),
      justifyContent: "space-between",
      border: "1px solid black",
      borderRadius: "10px",  
    },
  })
);

const SubmitButton = styled(Button)`
  && {
    background-color: #233326;
    color: #fff;
    margin-left: 20px;
    padding: 7px 15px;
    text-transform: capitalize;
  }

  &&:hover {
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
    background-color: #7de38d;
    color: #222;
  }
`;

const vidSource =
  "http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com";
const vidTranscipt =
  "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nullafacilisi etiam dignissim diam. Pulvinar elementum integer enim neque Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nullafacilisi etiam dignissim diam. Pulvinar elementum integer enim nequeConsequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nullafacilisi etiam dignissim diam. Pulvinar elementum integer enim neque";

const SearchResult = () => {
  const classes = useStyles();

  const [count, setCount] = React.useState(1);
  const totalPage = 10;

  const [word, setWord] = React.useState(1);
  const totalWord = 5;

  // Get the value of URL param
  const search = useLocation().search;
  const query = new URLSearchParams(search).get('term');

  // Set the initial state to the param value
  const [searchTerm, setSearchTerm] = React.useState(query);

  // Update the searchTerm on input changed
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar searchTerm={searchTerm} onSearch={handleSearch}/>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button onClick={event =>  window.location.href='/savedclips'}>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText>Saved Clips</ListItemText>
            </ListItem>
            <Divider />
            <ListItem button button onClick={event =>  window.location.href='/notes'}>
              <ListItemIcon>
                <NoteAddIcon />
              </ListItemIcon>
              <ListItemText>Notes</ListItemText>
            </ListItem>
            <Divider />
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <p>Searching for: {searchTerm}</p>

        <div>
          <Toolbar className={classes.functionBar}>
            <div>
              <SaveButton />
              <StyledBadge badgeContent={1} max={9} >
                <IconButton><NoteAddOutlinedIcon/></IconButton>
              </StyledBadge>
            </div>

            <div className={classes.clipBar}>
              <IconButton onClick={() => setCount(1)}>
                <FirstPageIcon />
              </IconButton>
              <IconButton
                onClick={() => setCount(count > 1 ? count - 1 : count)}
              >
                <NavigateBeforeOutlinedIcon />
              </IconButton>
              <Typography className={classes.countClip}>
                {" "}
                {count}/{totalPage}
              </Typography>
              <IconButton
                onClick={() => setCount(count < totalPage ? count + 1 : count)}
              >
                <NavigateNextOutlinedIcon />
              </IconButton>
              <IconButton onClick={() => setCount(totalPage)}>
                <LastPageIcon />
              </IconButton>
            </div>
          </Toolbar>
        </div>

        <Video source={vidSource} /> 

        <div className={classes.transcript}>
          <Toolbar className={classes.keywordsBar}>
            <div>
            <Typography>
                {" "}
                {word}/{totalWord}
              </Typography>
            </div>
            <div>
              <p> "<b>{searchTerm}</b>" </p>
            </div>
            <div>
            <IconButton
                onClick={() => setWord(word > 1 ? word - 1 : word)}
              >
                <NavigateBeforeOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={() => setWord(word < totalWord? word + 1 : word)}
              >
                <NavigateNextOutlinedIcon />
              </IconButton>
            </div>
            
          </Toolbar>
        </div>

        <div className={classes.transcript}> {vidTranscipt}</div>
      </main>
    </div>
  );
};

export default SearchResult;

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
import FavoriteIcon from "@material-ui/icons/Favorite";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

import styled from "styled-components";
import { Link } from "react-router-dom";
import {useLocation} from "react-router-dom";

import Video from "../components/Video";
import NavBar from "../components/NavBar";

const drawerWidth = 250;

const useStyles = makeStyles((theme: Theme) =>
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
    progress: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
    },
    error: {
      textAlign: "center",
      color: "red",
    }
  })
);

const vidSource =
  "http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com";
const vidTranscipt =
  "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nullafacilisi etiam dignissim diam. Pulvinar elementum integer enim neque Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nullafacilisi etiam dignissim diam. Pulvinar elementum integer enim nequeConsequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nullafacilisi etiam dignissim diam. Pulvinar elementum integer enim neque";

const videosReducer = (state, action) => {
  switch (action.type) {
    case 'VIDEOS_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'VIDEOS_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload, // payload ???
      };
    case 'VIDEOS_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const SearchResult = () => {
  const classes = useStyles();

  // Handle states related to asynchronous data
  const [videos, dispatchVideos] = React.useReducer(
    videosReducer,
    { data: [], 
      isLoading: false, 
      isError: false 
    }
  );

  // Get the value of URL param
  const search = useLocation().search;
  const query = new URLSearchParams(search).get('term');

  // Set the initial state to the param value
  const [searchTerm, setSearchTerm] = React.useState(query);

  // Handle UI when loading
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  // Update the searchTerm on input changed
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  
  const handleSubmit = (event) => {
    const message = "Call API with searchTerm = ";
    alert(`${message}${searchTerm}`);
    setIsLoading(false);
    
    event.preventDefault();
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar searchTerm={searchTerm} onSearch={handleSearch} onSubmit={handleSubmit}/>
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
            <ListItem button>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText>Saved Clips</ListItemText>
            </ListItem>
            <Divider />
            <ListItem button>
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
        <Typography variant="body1">Searching for: {searchTerm}</Typography>
        { isError && <div className={classes.error}><Typography>Something went wrong ... </Typography></div> }

        { isLoading 
        ? <div className={classes.progress}><CircularProgress /></div>
        : <Video searchTerm={searchTerm} source={vidSource} transcript={vidTranscipt}/> 
        }

      </main>
    </div>
  );
};

export default SearchResult;

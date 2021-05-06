import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
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
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';
import { useLocation } from "react-router-dom";

import Video from "../components/Video";
import NavBar from "../components/NavBar";

const drawerWidth = 250;

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

const API_ENDPOINT = 'http://localhost:7001/app/search?term=';

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
        data: action.payload, 
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

  // Set the initial state of searchTerm as the URL param
  const search = useLocation().search;
  const query = new URLSearchParams(search).get('term');
  const [searchTerm, setSearchTerm] = React.useState(query);

  // Use Reducer to handle states related to asynchronous data
  const [videos, dispatchVideos] = React.useReducer(
    videosReducer,
    { data: {}, 
      isLoading: false, 
      isError: false 
    }
  );

  // Introduce URL state to trigger the side-effect for fetching data if only user submit searchTerm
  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );
  
  const handleFetchVideos = React.useCallback(() => {
    dispatchVideos({ type: 'VIDEOS_FETCH_INIT' });

    axios
      .get(url)
      .then(result => {
        dispatchVideos({
          type: 'VIDEOS_FETCH_SUCCESS',
          payload: result.data,
        });
      })
      .catch(() =>
        dispatchVideos({ type: 'VIDEOS_FETCH_FAILURE' })
      );
  }, [url]); // Re-fetch data when the url is updated

  React.useEffect(() => {
    handleFetchVideos();
  }, [handleFetchVideos]); // Trigger when handleFetchVideos() is re-defined

  // Update the searchTerm on input changed
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
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
        { videos.isError && <div className={classes.error}><Typography>Something went wrong ... </Typography></div> }

        { videos.isLoading 
        ? <div className={classes.progress}><CircularProgress /></div>
        : <Video 
            searchTerm={searchTerm} 
            videoUrl={videos.data.videoURL} 
            noVideos={videos.data.numberOfMatchedVideos}
            transcriptList={videos.data.originalTranscription}
            transcriptIndex={videos.data.matchingTranscriptionIndexs}
          /> 
        }
      </main>
    </div>
  );
};

export default SearchResult;

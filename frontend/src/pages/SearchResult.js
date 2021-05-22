import React from "react";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
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
import Badge from '@material-ui/core/Badge';
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import IconButton from "@material-ui/core/IconButton";

import axios from 'axios';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom"

import Video from "../components/Video";
import NavBar from "../components/NavBar";
import SaveVideoButton from "../components/SaveVideoButton";

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
      padding: theme.spacing(2, 24, 2, 24),
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
    })
);

// const API_ENDPOINT = 'http://localhost:7001/app/search?term=';
const API_ENDPOINT = `${process.env.REACT_APP_URL}/app/search?term=`;

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
        data: action.payload.video_list_result, 
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
  const history = useHistory();

  // Set the initial state of searchTerm as the URL params
  const search = useLocation().search;
  const query = new URLSearchParams(search).get('term');
  const [searchTerm, setSearchTerm] = React.useState(query || " ");

  // Use Reducer to handle states related to asynchronous data
  const [videos, dispatchVideos] = React.useReducer(
    videosReducer,
    { data: [], 
      isLoading: false, 
      isError: false 
    }
  );

  // Introduce URL state to trigger the side-effect for fetching data if only user submit searchTerm
  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}&isExact=true`
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
    const params = new URLSearchParams();

    if (searchTerm) {
      // Update param on search API
      setUrl(`${API_ENDPOINT}${searchTerm}&isExact=true`);

      // Update search param with new keyword
      params.delete("term");
      params.append("term", searchTerm);
      history.push({
        pathname: '/search',
        search: params.toString()
      })
    }
    
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

        { videos.isError && <div className={classes.error}><Typography>Something went wrong ... </Typography></div> }

        { videos.isLoading 
        ? <div className={classes.progress}><CircularProgress /></div>  
        : <Videos 
            searchTerm={searchTerm}
            videosList={videos.data}
         /> 
        }
      </main>
    </div>
  );
};

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

const Videos = ({videosList, searchTerm}) => {
  const classes = useStyles();
  const totalVideos = videosList?.length ?? 0;
  const [videoCount, setVideoCount] = React.useState(0);
  const [video, setVideo] = React.useState(videosList[0]);

  const handleNextButtonClicked = () => {
    if ((videoCount + 1) >= totalVideos) {
      return;
    }

    var nextCount = videoCount + 1;
    const nextVideo = videosList[nextCount];
    setVideo(nextVideo);
    setVideoCount(nextCount);
  }

  const handlePreviousButtonClicked = () => {
    if ((videoCount - 1) < 0) {
      return;
    }

    var previousCount = videoCount - 1;
    const previousVideo = videosList[previousCount];
    setVideo(previousVideo);
    setVideoCount(previousCount);
  }

  const tokenid = localStorage.getItem("idtoken") ?? null;

  return(
    <div>
      { totalVideos > 0
      ? <div>
          <div>
              <Toolbar className={classes.functionBar}>
                <div>
                  {/* <SaveButton />
                  <StyledBadge badgeContent={1} max={9} >
                    <IconButton><NoteAddOutlinedIcon/></IconButton>
                  </StyledBadge> */}
                  <SaveVideoButton
                    key={video._id} 
                    tokenid={tokenid}
                    videoid={video._id}
                    searchTerm={searchTerm}
                  />
                </div>

                <div className={classes.clipBar}>
                  <IconButton onClick={() => setVideoCount(0)}>
                    <FirstPageIcon />
                  </IconButton>
                  <IconButton
                    onClick={handlePreviousButtonClicked}
                  >
                    <NavigateBeforeOutlinedIcon />
                  </IconButton>
                  <Typography className={classes.countClip}>
                    {" "}
                    {videoCount + 1} of {totalVideos} videos
                  </Typography>
                  <IconButton
                    onClick={handleNextButtonClicked}
                  >
                    <NavigateNextOutlinedIcon />
                  </IconButton>
                  <IconButton onClick={() => setVideoCount(totalVideos - 1)}>
                    <LastPageIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </div>
          <Video 
            video={video}
            keyWord={searchTerm}
            key={video._id}
          />
        </div>
      : <div className={classes.error}><Typography>No videos found... </Typography></div>
      }
    </div>
  );
}

export default SearchResult;

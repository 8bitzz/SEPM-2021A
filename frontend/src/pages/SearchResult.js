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

import Video from "../components/Video";
import NavBar from "../components/NavBar";
import SaveButton from "../components/SaveButton";

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

  // Set the initial state of searchTerm as the URL param s
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
    if (searchTerm) {
      setUrl(`${API_ENDPOINT}${searchTerm}&isExact=true`);
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
        : <Videos 
            searchTerm={searchTerm}
            list={videos.data}
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

const Videos = ({list, searchTerm}) => {
  const classes = useStyles();

  const videosCount = list?.length ?? 0;

  const [count, setCount] = React.useState(1);
  const totalPage = videosCount;

  return(
    <div>
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
      {
        list.map((item) => (
          <Video 
            key={item.id}
            item={item}
            keyWord={searchTerm}  
          />
        ))
      }
    </div>
  );
}

export default SearchResult;

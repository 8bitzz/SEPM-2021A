import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';


import WhatshotIcon from '@material-ui/icons/Whatshot';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Video from '../components/Video';
import EduSearchBar from '../components/EduSearchBar';
import SaveButton from '../components/SaveButton';

import NavBar from '../components/NavBar';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: '#fff', 
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      // backgroundColor: "#233326", current

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
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2, 16, 2, 14),
    },
    functionBar: {
      paddingLeft: theme.spacing(5),
      justifyContent: 'space-between',
    },
    clipBar: {
      display: 'flex',
      alignItems: 'center',
    },
    countClip: {
      
    },
    countNote: {
      '& > *': {
        margin: theme.spacing(0),
      },
    },
  }),
);

const StyledButton = styled(Button)`
    && {
        // background-color: #233326; current
        background-color: #4ca790 ;
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

const vidSource = "http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com";
const vidTranscipt = "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nullafacilisi etiam dignissim diam. Pulvinar elementum integer enim neque Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nullafacilisi etiam dignissim diam. Pulvinar elementum integer enim nequeConsequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nullafacilisi etiam dignissim diam. Pulvinar elementum integer enim neque";



const SearchResult = () => {
  const classes = useStyles();

  const [count, setCount] = React.useState(1);
  const totalPage = 10; 

  const [searchTerm, setSearchTerm] = React.useState('Computer Science');
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar/>
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
                <ListItemIcon><WhatshotIcon/></ListItemIcon>
                <ListItemText>Newest</ListItemText>
            </ListItem>
            <Divider/>
            <ListItem button>
                <ListItemIcon><FavoriteIcon/></ListItemIcon>
                <ListItemText>Most viewed</ListItemText>
            </ListItem>
            <Divider/>
            <ListItem button>
                <ListItemIcon><ThumbUpIcon/></ListItemIcon>
                <ListItemText>Rating</ListItemText>
            </ListItem>
            <Divider/>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <EduSearchBar searchTerm={searchTerm} onSearch={handleSearch}/>
          </Grid>
          <Grid item>
            <StyledButton>Search</StyledButton>
          </Grid>
        </Grid> 
        
        <div >
          <Toolbar className={classes.functionBar}>
            <div>
              <SaveButton/>
              <StyledBadge badgeContent={1} max={9} >
                <IconButton><NoteAddOutlinedIcon/></IconButton>
              </StyledBadge>
              {/* <IconButton><NoteAddOutlinedIcon/></IconButton> */}
            </div>

            <div className={classes.clipBar} >
              <IconButton onClick={() => setCount(1)}><FirstPageIcon/></IconButton>
              <IconButton onClick={() => setCount(count > 1 ? count - 1 : count)}><NavigateBeforeOutlinedIcon/></IconButton>
              <Typography className={classes.countClip} > {count}/{totalPage}</Typography>
              <IconButton onClick={() => setCount(count < totalPage ? count + 1 : count)}><NavigateNextOutlinedIcon/></IconButton>
              <IconButton onClick={() => setCount(totalPage)}><LastPageIcon/></IconButton>
            </div>
          </Toolbar>
        </div>
        <Video source={vidSource} transcript={vidTranscipt}/>
      </main>
    </div>
  );
}

export default SearchResult;


import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Video from '../components/Video';
import EduSearchBar from '../components/EduSearchBar';

const drawerWidth = 250;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: '#fff',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: "#233326",
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
    
  }),
);

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const StyledButton = styled(Button)`
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

const vidSource = "http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com";
const vidTranscipt = "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nullafacilisi etiam dignissim diam. Pulvinar elementum integer enim neque Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nullafacilisi etiam dignissim diam. Pulvinar elementum integer enim nequeConsequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nullafacilisi etiam dignissim diam. Pulvinar elementum integer enim neque";

const SearchResult = () => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = React.useState('Computer Science');
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <LinkWrapper to='/'>
            <Typography variant="h6" noWrap>
              EduSearch
            </Typography>
          </LinkWrapper>
        </Toolbar>
      </AppBar> */}
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
        <p>Searching for: {searchTerm}</p>
        <Video source={vidSource} transcript={vidTranscipt}/>
      </main>
    </div>
  );
}

export default SearchResult;


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
import styled from 'styled-components';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
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
      padding: theme.spacing(3),
    },
    video: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(5),
        width: '100%',
    },
    transcript: {
        paddingTop: theme.spacing(5),
        paddingLeft: theme.spacing(5),
    }
  }),
);

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            EduSearch
          </Typography>
        </Toolbar>
      </AppBar>
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
            <Divider />
            <ListItem button>
                <ListItemIcon><FavoriteIcon/></ListItemIcon>
                <ListItemText>Most viewed</ListItemText>
            </ListItem>
            <Divider />
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <div className={classes.video}>
            <iframe id="player" type="text/html" width="100%" height='600px'
                src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
                frameborder="0">
            </iframe>
        </div>
        <div className={classes.transcript}>
            <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
            vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
            hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
            tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
            nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography>
        </div>
      </main>
    </div>
  );
}

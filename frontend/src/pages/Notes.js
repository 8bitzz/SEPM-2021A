import React from 'react';
import { Link, withRouter } from 'react-router-dom';
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
import NavBar from '../components/NavBar';

const drawerWidth = 250;
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
        display: "flex",
        backgroundColor: "#fff",
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
    title : {
        paddingTop: 20,
        paddingBottom: 60,
        
    },
    heading: {
        paddingTop: 20,
        paddingBottom: 20,
    }
  })
);

const Notes = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
                <NavBar />
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
                        <ListItem button onClick={event =>  window.location.href='/notes'}>
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
                <Typography className={classes.title} variant="h4">Notes</Typography>
                <Divider />

                




            </main>
        </div>
    );
}

export default Notes;

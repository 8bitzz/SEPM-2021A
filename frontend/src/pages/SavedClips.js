import React from 'react';
// import Slider from 'react-slick';

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
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import Button from '@material-ui/core/Button';
import NavBar from '../components/NavBar';
import { mergeClasses } from '@material-ui/styles';

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
        paddingTop: 10,
        paddingBottom: 20,
    },
    clipBar: {
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20,
    },
    introImg: {
        maxWidth: 100,
    }
  })
);

// constructor(props) {
//     super(props);
//     this.next = this.next.bind(this);
//     this.previous = this.previous.bind(this);
// };
// const next() = {
//     this.slider.slickNext();
// };
// previous() {
//     this.slider.slickPrev();
// }

const SavedClips = () => {
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
                <div style={{ textAlign: "center" }}><Typography className={classes.title} variant="h4">Saved Clips</Typography></div>
                <Divider />
                <div className={classes.clipBar}>
                <Typography className={classes.heading}><b>Computer Science</b></Typography>
                    
                    {/* <IconButton><NavigateBeforeOutlinedIcon /></IconButton> */}
                    <Grid container 
                        spacing={3} 
                        direction="row"
                        justify="space-between"
                        alignItems="stretch"
                    >
                        <Button><NavigateBeforeOutlinedIcon /></Button>
                    {/* <Grid item xs={1}><IconButton><NavigateBeforeOutlinedIcon /></IconButton></Grid> */}
                        <Grid item xs={4} zeroMinWidth >
                            <a  href="https://www.youtube.com/watch?v=wfLISAzXYns">
                                <img style={{width: "100%"}} src="https://i.ytimg.com/vi/wfLISAzXYns/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAEqL3mUkDt91Xz_6buj7r3MJtjBQ"   ></img>
                            </a>
                            <div>
                                <Typography >Safety guideline for COVID-19: Analysis of superspreading events</Typography>
                            </div>
                        </Grid>
                        <Button component="span"><NavigateNextOutlinedIcon /></Button>
                     {/* <Grid item xs={1}><IconButton><NavigateNextOutlinedIcon /></IconButton></Grid> */}
                    </Grid>
                    {/* <IconButton><NavigateNextOutlinedIcon /></IconButton> */}
                    </div>
                <Divider />

                <div className={classes.clipBar}>
                    <Typography className={classes.heading}><b>Engineering</b></Typography>
                    <Grid container 
                        spacing={2} 
                        direction="row"
                        justify="space-between"
                        alignItems="stretch"
                    >
                        <IconButton><NavigateBeforeOutlinedIcon /></IconButton>
                        <Grid item xs={4} zeroMinWidth>
                            <a href="https://www.youtube.com/watch?v=wfLISAzXYns">
                                <img style={{width: "100%"}} src="https://i.ytimg.com/vi/wfLISAzXYns/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAEqL3mUkDt91Xz_6buj7r3MJtjBQ"></img>
                            </a>
                            <div>
                                <Typography noWrap>Safety guideline for COVID-19: Analysis of superspreading events</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={4} zeroMinWidth>
                            <a href="https://www.youtube.com/watch?v=wfLISAzXYns">
                                <img style={{width: "100%"}} src="https://i.ytimg.com/vi/wfLISAzXYns/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAEqL3mUkDt91Xz_6buj7r3MJtjBQ"></img>
                            </a>
                            <div>
                                <Typography noWrap>Safety guideline for COVID-19: Analysis of superspreading events</Typography>
                            </div>
                        </Grid>
                        
                        <IconButton><NavigateNextOutlinedIcon /></IconButton>
                    </Grid>
                </div>
                <Divider />

                <div className={classes.clipBar}>
                <Typography className={classes.heading}><b>Humanities & Social Sciences</b></Typography>
                <Grid container 
                        spacing={2} 
                        direction="row"
                        justify="space-between"
                        alignItems="stretch"
                    >
                        <IconButton><NavigateBeforeOutlinedIcon /></IconButton>
                        <Grid item xs={3} zeroMinWidth>
                            <a href="https://www.youtube.com/watch?v=wfLISAzXYns">
                                <img style={{width: "100%"}} src="https://i.ytimg.com/vi/wfLISAzXYns/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAEqL3mUkDt91Xz_6buj7r3MJtjBQ"></img>
                            </a>
                            <div>
                                <Typography noWrap>Safety guideline for COVID-19: Analysis of superspreading events</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3} zeroMinWidth>
                            <a href="https://www.youtube.com/watch?v=wfLISAzXYns">
                                <img style={{width: "100%"}} src="https://i.ytimg.com/vi/wfLISAzXYns/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAEqL3mUkDt91Xz_6buj7r3MJtjBQ"></img>
                            </a>
                            <div>
                                <Typography noWrap>Safety guideline for COVID-19: Analysis of superspreading events</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3} zeroMinWidth>
                            <a href="https://www.youtube.com/watch?v=wfLISAzXYns">
                                <img style={{width: "100%"}} src="https://i.ytimg.com/vi/wfLISAzXYns/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAEqL3mUkDt91Xz_6buj7r3MJtjBQ"></img>
                            </a>
                            <div>
                                <Typography noWrap>Safety guideline for COVID-19: Analysis of superspreading events</Typography>
                            </div>
                        </Grid>
                        
                        <IconButton><NavigateNextOutlinedIcon /></IconButton>
                    </Grid>
                </div>



            </main>
        </div>
    );
}

export default SavedClips;

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
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
        title: {
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
        },
        img: {
            paddingTop: 20,
        },
    })
);





const SavedClips = () => {
    const classes = useStyles();
    const [data, setData] = React.useState([]);

    axios
        .get("http://localhost:7001/saved-video", { headers: { 'Authorization': `JWT ${localStorage.getItem("idtoken")}` } })
        .then(result => {
            setData(result.data);
        })
        .catch((error) =>
            console.log("No data")
            // {alert("Token sai roi!")}
        );

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
                        <ListItem button onClick={event => window.location.href = '/savedclips'}>
                            <ListItemIcon>
                                <FavoriteIcon />
                            </ListItemIcon>
                            <ListItemText>Saved Clips</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={event => window.location.href = '/notes'}>
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

                {/* Style 1 */}
                {/* <div className={classes.clipBar}>
                    <Grid container 
                        spacing={2} 
                        direction="row"
                        justify="space-between"
                        alignItems="stretch"
                    >
                        {
                            data.length > 0 && data.map(v => 
                                <Grid item xs={4} sm={4} zeroMinWidth>
                                    <a href={"https://www.youtube.com/watch?v=" + v.video.id}>
                                        <img style={{width: "100%"}} src={v.video.thumbnail}></img>
                                    </a>
                                    <div>
                                        <Typography noWrap>{v.video.title}</Typography>
                                    </div>
                                </Grid>
                            )
                        }
                        {
                            data.length == 0 && 
                            <div style={{ textAlign: "center" }}>
                                <Typography >No video</Typography> 
                            </div> 
                        }             
                    </Grid>                  
                </div> */}

                {/* Style 2 */}
                <div className={classes.clipBar}>
                    <Grid container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="stretch"
                    >
                        {
                            data.length > 0 && data.map(v =>

                                <Grid item xs={4} sm={4} zeroMinWidth>
                                    <Card border="dark" style={{ width: '18rem' }}>
                                        <CardActionArea href={"https://www.youtube.com/watch?v=" + v.video.id}>
                                            <CardMedia>
                                                <img style={{ width: "100%" }} src={v.video.thumbnail}></img>
                                            </CardMedia>
                                            <CardContent>
                                                <div>
                                                    <Typography noWrap><b>{v.video.title}</b></Typography>
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>

                            )
                        }
                    </Grid>
                    {
                        data.length == 0 &&
                        <div style={{ textAlign: "center" }}>
                            <img width="25%" src="http://simpleicon.com/wp-content/uploads/movie-1-256x256.png"></img>
                            
                            <Typography className={classes.img}><b>No Videos Found</b></Typography>
                        </div>
                    }

                </div>



            </main>
        </div>
    );
}

export default SavedClips;

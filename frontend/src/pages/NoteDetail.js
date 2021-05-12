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
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from "axios";



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
            paddingTop: 40,
            paddingBottom: 20,

        },
        note: {
            paddingTop: 20,
            paddingBottom: 20,
        },

    })
);

const NoteDetail = () => {
    const classes = useStyles();
    const [data, setData] = React.useState([]);

    axios
        .get("http://localhost:7001/note", { headers: { 'Authorization': `JWT ${localStorage.getItem("idtoken")}` } })
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
                <div style={{ textAlign: "center" }}><Typography className={classes.title} variant="h4">Notes</Typography></div>

                {
                    data.length > 0 && data.map(v =>
                        <div>
                            <Typography className={classes.title}><b>{v.video.title}</b></Typography>
                            <Divider />
                            {/* <Grid
                                cointainer
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                            >
                                <Grid item xs={1}>
                                    <Typography>{v.video_timeline}</Typography>
                                </Grid>
                                <Divider orientation="vertical" />
                                <Grid item>
                                    <Typography>{v.note}</Typography>
                                </Grid>
                            </Grid> */}

                            <Divider />
                            <div className={classes.note}>
                                <ListItem>
                                    <ListItemText><b>{v.video_timeline} s</b></ListItemText>
                                    <Divider orientation="vertical" />
                                    <ListItemText>{v.note}</ListItemText>
                                </ListItem>
                            </div>

                        </div>
                    )
                }
            </main>
        </div>
    );
}

export default NoteDetail;

import React from 'react';

import { createStyles, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NavBar from '../components/NavBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from "axios";

const logoNote = "https://cdn1.iconfinder.com/data/icons/galaxy-open-line-i/200/memo-512.png";

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
            paddingBottom: 5,
        },

    })
);

const Notes = () => {
    const classes = useStyles();
    const [data, setData] = React.useState({});

    axios
        .get(`${process.env.REACT_APP_URL}/note`, { headers: { 'Authorization': `JWT ${localStorage.getItem("idtoken")}` } })
        .then(result => {
            let data = result.data;
            let set = [];
            let count = {};
            data.forEach(v => {
                if (count[v.video._id]) {
                    count[v.video._id] = count[v.video._id] + 1;
                }
                else {
                    count[v.video._id] = 1;
                    set.push(v.video);
                }
            })
            console.log(count);
            set = set.map(v => {
                v.video_count = count[v._id];
                return v;
            })
            console.log(set);
            setData(set);
        })
        .catch((error) =>
            console.log("No data")
            // {alert("Token sai roi!")}
        );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar />

            <main className={classes.content}>
                <Toolbar />
                <div style={{ textAlign: "center" }}><Typography className={classes.title} variant="h4">Notes</Typography></div>
                {
                    data.length > 0 && data.map(v =>
                        <div className={classes.heading} >
                            <Card >
                                <CardActionArea onClick={event => window.location.href = `/notedetail?note_id=${v._id}`}>
                                    <CardContent>
                                        <Grid
                                            container spacing={1}
                                            direction="row"
                                            justify="flex-start"
                                            alignItems="center">
                                            <Grid item xs={2}>
                                                <CardMedia>
                                                    <a>
                                                        <img style={{ width: "90%" }} src={v.thumbnail}></img>
                                                    </a>
                                                </CardMedia>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <div>
                                                    <Typography noWrap><b>{v.title}</b></Typography>
                                                    <Typography variant="subtitle1">{v.video_count} notes</Typography>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    )
                }
                {
                    data.length == 0 &&
                    <div style={{ textAlign: "center" }}>
                        <img src="http://simpleicon.com/wp-content/uploads/note-2-256x256.png"></img>
                        <Typography ><b>No Notes Found</b></Typography>
                    </div>
                }





            </main>
        </div>
    );
}

export default Notes;

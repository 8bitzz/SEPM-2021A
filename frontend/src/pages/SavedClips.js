import React from 'react';

import { createStyles, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import NavBar from '../components/NavBar';
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useHistory } from "react-router-dom";

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
            marginLeft: 100,

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
    const [searchTerm, setSearchTerm] = React.useState("");
    const history = useHistory();

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        if(searchTerm === "") {
            return;
        }

        const params = new URLSearchParams();

        if (searchTerm) {
            // Update search param with new keyword
            params.delete("term");
            params.append("term", searchTerm);
            history.push({
                pathname: "/search",
                search: params.toString(),
            });
        }
    };

    axios
        .get(`${process.env.REACT_APP_URL}/saved-video`, { headers: { 'Authorization': `JWT ${localStorage.getItem("idtoken")}` } })
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
            <NavBar searchTerm={searchTerm} onSearch={handleSearch} onSubmit={handleSubmitSearch} />

            <main className={classes.content}>
                <Toolbar />
                <div style={{ textAlign: "center" }}><Typography className={classes.title} variant="h4">Saved Clips</Typography></div>

                
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

                                <Grid item xs={3} zeroMinWidth>
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

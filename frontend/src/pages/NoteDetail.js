import React from 'react';

import { createStyles, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import NavBar from '../components/NavBar';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";



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
            marginLeft: 10,
        },

    })
);

const NoteDetail = () => {
    const classes = useStyles();
    const [data, setData] = React.useState([]);

    const search = useLocation().search;
    const query = new URLSearchParams(search).get('note_id');

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
        .get(`${process.env.REACT_APP_URL}/note`, { headers: { 'Authorization': `JWT ${localStorage.getItem("idtoken")}` } })
        .then(result => {
            setData(result.data.filter(v => v.video._id === query));
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
                <div style={{ textAlign: "center" }}><Typography className={classes.title} variant="h4">Notes</Typography></div>


                <div>
                    <Typography className={classes.title}><b>{data[0] && data[0].video.title}</b></Typography>
                </div>

                <div className={classes.note}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Typography><b>Timeline</b></Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography><b>Note detail</b></Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography><b>Date created</b></Typography>
                        </Grid>
                    </Grid>
                </div>

                {
                    data.length > 0 && data.map(v =>
                        <div>
                            <Divider />

                            <Divider />
                            <div className={classes.note}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <Typography><b>{v.video_timeline} s</b></Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography>{v.note}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography>{new Date(v.create_date).toLocaleDateString()}</Typography>
                                    </Grid>
                                </Grid>
                            </div>


                        </div>
                    )
                }
            </main>
        </div>
    );
}

export default NoteDetail;

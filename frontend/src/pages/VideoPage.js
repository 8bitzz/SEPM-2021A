import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";
import { useHistory, useParams, useLocation } from "react-router-dom";

import VideoNoSearch from "../components/VideoNoSearch";
import NavBar from "../components/NavBar";

const drawerWidth = 250;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: "flex",
            backgroundColor: "#fff",
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "#4ca790",
        },
        toolBar: {
            justifyContent: "space-between",
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
            padding: theme.spacing(2, 14, 2, 14),
        },
        progress: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
        },
        error: {
            textAlign: "center",
            color: "red",
        },
        functionBar: {
            paddingTop: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            justifyContent: "space-between",
			alignItems: "center"
        },
        title: {
            paddingTop: theme.spacing(1),
            paddingLeft: theme.spacing(3),
            textAlign: "center",
        },
    })
);

const API_ENDPOINT = `${process.env.REACT_APP_URL}/app/search?term=`;

const videosReducer = (state, action) => {
    switch (action.type) {
        case "VIDEOS_FETCH_INIT":
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case "VIDEOS_FETCH_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.video,
            };
        case "VIDEOS_FETCH_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};

const VideoPage = () => {
    const classes = useStyles();
    const history = useHistory();
    let { videoId } = useParams();
    const search = useLocation().search;
    const startTime = new URLSearchParams(search).get("startTime");

    // Set the initial state of searchTerm as the URL params
    const [searchTerm, setSearchTerm] = React.useState("");

    // Use Reducer to handle states related to asynchronous data
    const [videos, dispatchVideos] = React.useReducer(videosReducer, {
        data: null,
        isLoading: false,
        isError: false,
    });

    // Introduce URL state to trigger the side-effect for fetching data if only user submit searchTerm
    const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}&isExact=true`);

    React.useEffect(() => {
        dispatchVideos({ type: "VIDEOS_FETCH_INIT" });
        let fetchURL = `${process.env.REACT_APP_URL}/video/${videoId}`;
        let headers = { 'Authorization': `JWT ${localStorage.getItem("idtoken")}` };
        if(videoId === "random"){
            fetchURL = `${process.env.REACT_APP_URL}/video/getRandomVideo`;
            headers = {};
        }
        axios
            .get(fetchURL, { headers })
            .then((result) => {
                console.log(result.data);
                dispatchVideos({
                    type: "VIDEOS_FETCH_SUCCESS",
                    payload: result.data,
                });
            })
            .catch(() => dispatchVideos({ type: "VIDEOS_FETCH_FAILURE" }));
    }, []); // Trigger when handleFetchVideos() is re-defined

    // Update the searchTerm on input changed
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchTerm === "") {
            return;
        }

        const params = new URLSearchParams();

        if (searchTerm) {
            // Update param on search API
            setUrl(`${API_ENDPOINT}${searchTerm}&isExact=true`);

            // Update search param with new keyword
            params.delete("term");
            params.append("term", searchTerm);
            history.push({
                pathname: "/search",
                search: params.toString(),
            });
        }
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar searchTerm={searchTerm} onSearch={handleSearch} onSubmit={handleSubmit} />

            <main className={classes.content}>
                <Toolbar />

                {videos.isError && (
                    <div className={classes.error}>
                        <Typography>Something went wrong ... </Typography>
                    </div>
                )}

                {videos.isLoading ? (
                    <div className={classes.progress}>
                        <CircularProgress />
                    </div>
                ) : (
                    <Videos videoObject={videos.data} startTime={startTime} key={videos._id}/>
                )}
            </main>
        </div>
    );
};

const Videos = ({ videoObject, startTime }) => {
    const classes = useStyles();
    console.log(videoObject?.video_id);
    return (
        <div>
            {videoObject ? (
                <div>
                    <VideoNoSearch key={videoObject._id} videoid={videoObject._id} video={videoObject} startTimeProp={startTime ? startTime : 0}/>
                </div>
            ) : (
                <div className={classes.error}>
                    <Typography>No video found with the provided id! </Typography>
                </div>
            )}
        </div>
    );
};

export default VideoPage;

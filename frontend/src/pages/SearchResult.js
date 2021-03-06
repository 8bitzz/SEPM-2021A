import React from "react";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button } from "@material-ui/core";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";

import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Video from "../components/Video";
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

// const API_ENDPOINT = 'http://localhost:7001/app/search?term=';
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
                data: action.payload.video_list_result,
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

const SearchResult = () => {
    const classes = useStyles();
    const history = useHistory();

    // Set the initial state of searchTerm as the URL params
    const search = useLocation().search;
    const query = new URLSearchParams(search).get("term");
    const [searchTerm, setSearchTerm] = React.useState(query || "");

    const fixedSearchTerm = query || "";

    // Use Reducer to handle states related to asynchronous data
    const [videos, dispatchVideos] = React.useReducer(videosReducer, {
        data: [],
        isLoading: false,
        isError: false,
    });

    // Introduce URL state to trigger the side-effect for fetching data if only user submit searchTerm
    const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}&isExact=true`);

    const handleFetchVideos = React.useCallback(() => {
        dispatchVideos({ type: "VIDEOS_FETCH_INIT" });

        axios
            .get(url)
            .then((result) => {
                dispatchVideos({
                    type: "VIDEOS_FETCH_SUCCESS",
                    payload: result.data,
                });
            })
            .catch(() => dispatchVideos({ type: "VIDEOS_FETCH_FAILURE" }));
    }, [url]); // Re-fetch data when the url is updated

    React.useEffect(() => {
        handleFetchVideos();
    }, [handleFetchVideos]); // Trigger when handleFetchVideos() is re-defined

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
                    <Videos searchTerm={fixedSearchTerm} videosList={videos.data} />
                )}
            </main>
        </div>
    );
};

const Videos = ({ videosList, searchTerm }) => {
    const classes = useStyles();
    const totalVideos = videosList?.length ?? 0;
    const [videoCount, setVideoCount] = React.useState(0);
    const [video, setVideo] = React.useState(videosList[0]);

    const handleNextButtonClicked = () => {
        if (videoCount + 1 >= totalVideos) {
            return;
        }

        var nextCount = videoCount + 1;
        const nextVideo = videosList[nextCount];
        setVideo(nextVideo);
        setVideoCount(nextCount);
    };

    const handlePreviousButtonClicked = () => {
        if (videoCount - 1 < 0) {
            return;
        }

        var previousCount = videoCount - 1;
        const previousVideo = videosList[previousCount];
        setVideo(previousVideo);
        setVideoCount(previousCount);
    };

    return (
        <div>
            {totalVideos > 0 ? (
                <div>
                    <div>
                        <Toolbar className={classes.functionBar}>
                            <StyledButton onClick={handlePreviousButtonClicked} size="large" disabled={videoCount <= 0}>
                                <NavigateBeforeOutlinedIcon />
                                Previous Video
                            </StyledButton>
                            <div className={classes.title}>
                                <Typography variant="h6">
                                    {videoCount + 1} / {totalVideos} videos found with keyword "{searchTerm}"
                                </Typography>
                            </div>
                            <StyledButton onClick={handleNextButtonClicked} size="large" disabled={videoCount >= totalVideos - 1}>
                                Next Video
                                <NavigateNextOutlinedIcon />
                            </StyledButton>
                        </Toolbar>
                        <Video key={video._id} videoid={video._id} video={video} keyWord={searchTerm} />
                    </div>
                </div>
            ) : (
                <div className={classes.error}>
                    <Typography>No videos found! Please try again with another keyword! </Typography>
                </div>
            )}
        </div>
    );
};

const StyledButton = styled(Button)`
    && {
        background-color: #f8f8f8;
        color: #5f6368;
        margin: 5px;
        padding: 7px 15px;
    }

    &&:hover {
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
        background-color: #7de38d;
        color: #222;
    }
`;

export default SearchResult;

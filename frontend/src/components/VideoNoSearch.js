import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory, useLocation } from "react-router-dom";

import axios from "axios";
import Highlighter from "react-highlight-words";
import ReactPlayer from "react-player/youtube";

import SaveVideoButton from "./SaveVideoButton";
import SaveNoteButton from "./SaveNoteButton";
import EduSearchButton from "./EduSearchButton";

const useStyles = makeStyles((theme) =>
    createStyles({
        transcript: {
            paddingTop: theme.spacing(1),
            paddingLeft: theme.spacing(3),
            textAlign: "center",
            marginBottom: theme.spacing(4),
        },
        keywordsBar: {
            paddingLeft: theme.spacing(3),
            justifyContent: "space-between",
            border: "1px solid black",
            borderRadius: "10px",
        },
        youtubevideo: {
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(3),
            position: "relative",
            // height: 0,
            paddingBottom: "47%",
            marginBottom: "10px",
        },
        functionBar: {
            paddingLeft: theme.spacing(3),
            justifyContent: "space-between",
        },
        clipBar: {
            display: "flex",
            alignItems: "center",
        },
        video: {
            width: "75%",
            height: "75%",
        },
    })
);

const VideoNoSearch = ({ videoid, video, startTimeProp }) => {
    const classes = useStyles();

    // Retreive transcripts list from the props and set INITiAL state to render the video
    const totalWord = video.transcriptList?.length ?? 0;
    const transcripts = video.transcriptList;

    const INIT_START_TIME = () => {
        if (startTimeProp) return startTimeProp;
        return 0;
    };

    const INIT_TRANSCRIPT = () => {
        return transcripts[0].text;
    };

    // Render the first transcript that contains keyword and start video there
    const [startTime, setStartTime] = React.useState(INIT_START_TIME);
    const [videoTranscript, setVideoTranscript] = React.useState(INIT_TRANSCRIPT);
    const videoUrl = `https://www.youtube.com/embed/${video.id}?t=${startTime}`;
    const control = true;
    const [playing, setPlaying] = React.useState(true);

    // Check current Youtube timeframe to render transcript accordingly
    const checkCurrentTime = (e) => {
        const playedSeconds = e.playedSeconds;

        transcripts?.forEach((transcript) => {
            if ((playedSeconds >= transcript.startTime) & (playedSeconds < transcript.endTime)) {
                setVideoTranscript(transcript.text);
            }
        });
    };

    // State to manage Save Note components
    const tokenid = localStorage.getItem("idtoken") ?? null;
    const [noteCount, setNoteCount] = React.useState(0);
    const [noteInput, setNoteInput] = React.useState(" ");
    const playerRef = React.useRef(null);
    const history = useHistory();
    const location = useLocation();

    const handleNoteInputChange = (event) => {
        setNoteInput(event.target.value);
    };

    const handleNoteCreate = (event) => {
        const timeframe = playerRef.current.getCurrentTime();
        const newCount = noteCount + 1;

        const data = {
            video: videoid,
            video_timeline: timeframe.toFixed(1),
            note: noteInput,
        };

        axios
            .post(`${process.env.REACT_APP_URL}/note`, data, { headers: { Authorization: `JWT ${tokenid}` } })
            .then((response) => {
                console.log(response.data.message);
                setNoteCount(newCount);
                alert("Note Created Successfully!");
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    
    const redirectRandomVideo = () => {
        if (location.pathname === "/video/random") {
            window.location.reload();
            return;
          }
          history.push("/video/random");
    }

    return (
        <>
            <div className={classes.youtubevideo}>
                <ReactPlayer
                    ref={playerRef}
                    url={videoUrl}
                    title={video.title}
                    frameBorder="0"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                    width="100%"
                    height="100%"
                    controls={control}
                    playing={playing}
                    onProgress={(e) => checkCurrentTime(e)}
                    muted={true}
                />
            </div>
            <div>
                <Toolbar className={classes.functionBar}>
                    {tokenid != null ? (
                        <div>
                            <SaveVideoButton tokenid={tokenid} key={videoid} videoid={videoid} searchTerm={""} />
                            <SaveNoteButton
                                tokenid={tokenid}
                                noteCount={noteCount}
                                noteInput={noteInput}
                                handleNoteInputChange={handleNoteInputChange}
                                handleNoteCreate={handleNoteCreate}
                            />
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <EduSearchButton handleClick={redirectRandomVideo} name={"New Random Video"} />
                </Toolbar>
            </div>
            <div className={classes.transcript}>
                <Typography variant="h4">
                    <Highlighter searchWords={[]} autoEscape={true} textToHighlight={videoTranscript} />
                </Typography>
            </div>
        </>
    );
};

export default VideoNoSearch;

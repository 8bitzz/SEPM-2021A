import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from "@material-ui/core/Toolbar";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";

import Highlighter from "react-highlight-words";
import ReactPlayer from 'react-player/youtube';

import SaveVideoButton from "./SaveVideoButton";
import SaveNoteButton from "./SaveNoteButton";

const useStyles = makeStyles((theme) =>
    createStyles({
        transcript: {
            paddingTop: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            textAlign: "center",
            marginBottom: theme.spacing(4)
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
            height: 0,
            paddingBottom: "47%",
            marginBottom: '10px',
        },
        functionBar: {
          paddingLeft: theme.spacing(3),
          justifyContent: "space-between",
        },
        clipBar: {
          display: "flex",
          alignItems: "center",
        },
    })
);

const Video = ({videoid, keyWord, video}) => {
    const classes = useStyles();

    // Retreive transcripts list from the props and set INITiAL state to render the video
    const totalWord = video.searchTranscript?.length ?? 0;
    const transcripts = video.transcriptList;
    const keywordTranscripts = video.searchTranscript;

    const INIT_START_TIME = () => {
      const firstTranscript = transcripts.find(transcript => {
        return transcript._id === keywordTranscripts[0];
      });

      return firstTranscript.startTime;
    }

    const INIT_TRANSCRIPT = () => {
      const firstTranscript = transcripts.find(transcript => {
        return transcript._id === keywordTranscripts[0];
      });

      return firstTranscript.text;
    }

    
    // Render the first transcript that contains keyword and start video there
    const [startTime, setStartTime] = React.useState(INIT_START_TIME);
    const [videoTranscript, setVideoTranscript] = React.useState(INIT_TRANSCRIPT);
    const videoUrl = `https://www.youtube.com/embed/${video.id}?t=${startTime}`;
    const control = true;
    const [playing, setPlaying] = React.useState(false);
    
    
    // Check current Youtube timeframe to render transcript accordingly
    const checkCurrentTime = (e) => {
      const playedSeconds = e.playedSeconds;

      transcripts?.forEach(transcript => {
        if (playedSeconds >= transcript.startTime & playedSeconds < transcript.endTime) {
          setVideoTranscript(transcript.text);
        }
      })

    }

    // Render next/previous transcript and update video starttime when users click next/previous button
    const [word, setWord] = React.useState(0);
    const handleNextButtonClicked = () => {
      if ((word + 1) >= totalWord) {
        return;
      } 
      var nextIndex = word + 1;
    
      const nextTranscript = transcripts.find(transcript => {
        return transcript._id === keywordTranscripts[nextIndex];
      });

      setVideoTranscript(nextTranscript.text);
      setStartTime(nextTranscript.startTime);
      setWord(nextIndex);
    }

    const handleBeforeButtonClicked = () => {
      if ((word - 1) < 0) {
        return;
      } 
      var previousIndex = word - 1;
      
      const prevTranscript = transcripts.find(transcript => {
        return transcript._id === keywordTranscripts[previousIndex];
      });

      setVideoTranscript(prevTranscript.text);
      setStartTime(prevTranscript.startTime);
      setWord(previousIndex);
    }

    // State to manage Save Note components
    const tokenid = localStorage.getItem("idtoken") ?? null;
    const [noteCount, setNoteCount] = React.useState(1);
    const [noteInput, setNoteInput] = React.useState(" ");
    

    const handleNoteInputChange = (event) => {
      setNoteInput(event.target.value);
    }

    const handleNoteCreate = (event) => {
      const timeframe = playerRef.current.getCurrentTime();
      const newCount = noteCount + 1;
      setNoteCount(newCount);
      const tokenid = localStorage.getItem("idtoken") ?? null;
      console.log(tokenid);
      console.log(videoid);
      console.log(timeframe);
      console.log(noteInput);
      console.log(noteCount);
    }

    const playerRef = React.useRef(null);
    const [pauseTime, setPauseTime] = React.useState(1);

    // const handlePauseButtonClick = () => {
    //   const timeframe = playerRef.current.getCurrentTime();
    //   setPauseTime(timeframe);
    // }

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
              width='100%'
              height='100%'
              controls={control}
              playing={playing}
              onProgress={(e) => checkCurrentTime(e)}
              // onPause={handlePauseButtonClick}
            />
        </div>
        <div>
          <Toolbar className={classes.functionBar}> 
            {
              tokenid != null 
              ? <div>
                  <SaveVideoButton 
                    tokenid={tokenid}
                    key={videoid} 
                    videoid={videoid}
                    searchTerm={keyWord}
                  />
                  <SaveNoteButton
                    tokenid={tokenid}
                    noteCount={noteCount}
                    timeframe={pauseTime}
                    noteInput={noteInput}
                    handleNoteInputChange={handleNoteInputChange}
                    handleNoteCreate={handleNoteCreate}
                  />
                </div>
              : <div></div>
            }
            <div className={classes.clipBar}>
              <IconButton>
                <FirstPageIcon />
              </IconButton>
              <IconButton
                onClick={handleBeforeButtonClicked}
                disabled={word <= 0}
              >
                <NavigateBeforeOutlinedIcon />
              </IconButton>
              <Typography >
                {" "}
                {word + 1}/{totalWord} 
              </Typography>
              <IconButton
                onClick={handleNextButtonClicked}
                disabled={word >= totalWord - 1}
              >
                <NavigateNextOutlinedIcon />
              </IconButton>
              <IconButton>
                <LastPageIcon />
              </IconButton>
            </div>
          </Toolbar>
        </div>
        <div className={classes.transcript}>
          <Typography variant="h4">
            <Highlighter
                searchWords={[keyWord]}
                autoEscape={true}
                textToHighlight={videoTranscript}
            />
          </Typography>
        </div>
        </>
    )
}

export default Video

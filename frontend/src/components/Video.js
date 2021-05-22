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
import ReactPlayer from 'react-player/youtube'

import SaveVideoButton from "./SaveVideoButton";
import SaveNoteButton from "./SaveNoteButton";
import { capitalize } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
    createStyles({
        videotitle: {
            paddingTop: theme.spacing(1),
            paddingLeft: theme.spacing(3),
            textAlign: "center",
        },
        transcript: {
            paddingTop: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            textAlign: "center",
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
            paddingBottom: "56%",
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

const Video = ({videoid, tokenid, keyWord, video}) => {
    const classes = useStyles();

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

    const control = true;
    const playing = false;

    const [word, setWord] = React.useState(0);
    const [startTime, setStartTime] = React.useState(INIT_START_TIME);
    const [videoTranscript, setVideoTranscript] = React.useState(INIT_TRANSCRIPT);
    const videoUrl = `https://www.youtube.com/embed/${video.id}?t=${startTime}`;

    const checkCurrentTime = (e) => {
      const playedSeconds = e.playedSeconds;

      transcripts?.forEach(transcript => {
        if (playedSeconds >= transcript.startTime & playedSeconds < transcript.endTime) {
          setVideoTranscript(transcript.text);
        }
      })

    }
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

    return (
        <>
        <div className={classes.videotitle}>
            <Typography variant="h6">{video.title}</Typography> 
        </div> 
        <div>
          <Toolbar className={classes.functionBar}>
            <div>
              <SaveVideoButton 
                key={videoid} 
                tokenid={tokenid}
                videoid={videoid}
                searchTerm={keyWord}
              />
              <SaveNoteButton/>
            </div>
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
                {word + 1} out of {totalWord}
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
        <div className={classes.youtubevideo}>
            <ReactPlayer
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
            />
        </div>

        {/* <div className={classes.transcript}>
          <Toolbar className={classes.keywordsBar}>
            <div>
            <Typography>
              {" "}
              {word + 1} of {totalWord} words
            </Typography>
            </div>
            <div>
              <p> "<b>{keyWord}</b>" </p>
            </div>
            <div>
            <IconButton
                onClick={handleBeforeButtonClicked}
                disabled={word <= 0}
              >
                <NavigateBeforeOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={handleNextButtonClicked}
                disabled={word >= totalWord - 1}
              >
                <NavigateNextOutlinedIcon />
              </IconButton>
            </div>
            
          </Toolbar>
        </div> */}

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

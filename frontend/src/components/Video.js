import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from "@material-ui/core/Toolbar";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";
import IconButton from "@material-ui/core/IconButton";

import Highlighter from "react-highlight-words";
import ReactPlayer from 'react-player/youtube'

const useStyles = makeStyles((theme) =>
    createStyles({
        transcript: {
            paddingTop: theme.spacing(2),
            paddingLeft: theme.spacing(5),
            textAlign: "center",
        },
        keywordsBar: {
            paddingLeft: theme.spacing(5),
            justifyContent: "space-between",
            border: "1px solid black",
            borderRadius: "10px",  
        },
        youtubevideo: {
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(5),
            position: "relative",
            height: 0,
            paddingBottom: "56%",
            marginBottom: '10px',
        },

    })
);

const Video = ({keyWord, video}) => {
    const classes = useStyles();

    const totalWord = video.searchTranscript?.length ?? 0;
    const transcriptList = video.transcriptList;
    const searchTranscriptList = video.searchTranscript;

    const INIT_START_TIME = () => {
      const firstTranscript = transcriptList.find(transcript => {
        return transcript._id === searchTranscriptList[0];
      });

      return firstTranscript.startTime;
    }
    const INIT_TRANSCRIPT = () => {
      const firstTranscript = transcriptList.find(transcript => {
        return transcript._id === searchTranscriptList[0];
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

      transcriptList?.forEach(transcript => {
        if (playedSeconds >= transcript.startTime & playedSeconds < transcript.endTime) {
          setVideoTranscript(transcript.text);
        }
      })

    }
    const handleNextButtonClicked = () => {
      if ((word + 1) >= totalWord) {
        return;
      } 
      var nextWord = word + 1;
    
      const nextTranscript = transcriptList.find(transcript => {
        return transcript._id === searchTranscriptList[nextWord];
      });

      setVideoTranscript(nextTranscript.text);
      setStartTime(nextTranscript.startTime);
      setWord(nextWord);
    }

    const handleBeforeButtonClicked = () => {
      if ((word - 1) < 0) {
        return;
      } 
      var previousWord = word - 1;
      
      const prevTranscript = transcriptList.find(transcript => {
        return transcript._id === searchTranscriptList[previousWord];
      });

      setVideoTranscript(prevTranscript.text);
      setStartTime(prevTranscript.startTime);
      setWord(previousWord);
    }

    return (
        <>  
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

        <div className={classes.transcript}>
          <Toolbar className={classes.keywordsBar}>
            <div>
            <Typography>
              {" "}
              {word + 1}/{totalWord}
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
        </div>

        <div className={classes.transcript}>
          <Typography variant="h5">
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

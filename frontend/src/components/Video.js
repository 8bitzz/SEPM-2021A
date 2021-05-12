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

const Video = ({keyWord, item}) => {
    const classes = useStyles();

    const [word, setWord] = React.useState(0);
    const totalWord = item.searchTranscript?.length ?? 0;
    const control = true;
    const baseUrl = 'https://youtube.com/embed/';
    const videoUrl = `${baseUrl}${item.id}`;
    
    const transcriptList = item.transcriptList;
    const searchTranscriptList = item.searchTranscript;

    const [videoTranscript, setVideoTranscript] = React.useState("");

    const checkCurrentTime = (e) => {
      const playedSeconds = e.playedSeconds;

      transcriptList?.forEach(transcript => {
        const startTime = transcript.startTime;
        const endTime = transcript.endTime;
        const text = transcript.text;

        if (playedSeconds >= startTime & playedSeconds < endTime) {
          setVideoTranscript(text);
        }
      })

    }
    const handleNextButtonClicked = () => {
      if ((word + 1) >= totalWord) {
        return;
      } 
      var newWord = word + 1;
      console.log(newWord);
      let transID = searchTranscriptList[newWord];
      
      console.log(transID);
      const result = transcriptList.find(transcript => {
        return transcript._id === transID;
      });
      console.log(result);
      const transText = result.text;
      setVideoTranscript(transText);
      setWord(newWord);
    }

    const handleBeforeButtonClicked = () => {
      console.log(word);
      if ((word - 1) < 0) {
        return;
      } 
      var newWord = word - 1;
      console.log(newWord);
      let transID = searchTranscriptList[newWord];
      
      console.log(transID);
      const result = transcriptList.find(transcript => {
        return transcript._id === transID;
      });
      console.log(result);
      const transText = result.text;
      setVideoTranscript(transText);

      setWord(newWord);
    }

    return (
        <>  
        <div className={classes.youtubevideo}>
            <ReactPlayer
              url={videoUrl}
              title={item.title}
              frameBorder="0"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
              width='100%'
              height='100%'
              controls={control}
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

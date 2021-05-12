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

    const [word, setWord] = React.useState(1);
    const totalWord = item.searchTranscript?.length ?? 0;
    
    const transcriptList = item.transcriptList;
    const baseUrl = 'https://youtube.com/embed/';
    const videoUrl = `${baseUrl}${item.id}`;

    const videoTrans = transcriptList?.map((transcript) => (
        <li key={transcript._id}>
            <Typography variant="h5">
              <Highlighter
                  searchWords={[keyWord]}
                  autoEscape={true}
                  textToHighlight={transcript.text}
              />
            </Typography>
        </li>
    )) ?? []; 

    // const opts = {
    //   position: "absolute",
    //   top: 0,
    //   left: 0,
    //   height: '590px',
    //   width: '100%',
    //   playerVars: {
    //     // https://developers.google.com/youtube/player_parameters
    //     autoplay: 1,
    //   },
    // };

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
              controls="true"
            />
        </div>

        <div className={classes.transcript}>
          <Toolbar className={classes.keywordsBar}>
            <div>
            <Typography>
                {" "}
                {word}/{totalWord}
              </Typography>
            </div>
            <div>
              <p> "<b>{keyWord}</b>" </p>
            </div>
            <div>
            <IconButton
                onClick={() => setWord(word > 1 ? word - 1 : word)}
              >
                <NavigateBeforeOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={() => setWord(word < totalWord? word + 1 : word)}
              >
                <NavigateNextOutlinedIcon />
              </IconButton>
            </div>
            
          </Toolbar>
        </div>

        <div className={classes.transcript}>
            <ul>
                {videoTrans}
            </ul>
        </div>
        </>
    )
}

export default Video

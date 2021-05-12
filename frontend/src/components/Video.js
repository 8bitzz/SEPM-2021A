import React from 'react'
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from "@material-ui/core/Toolbar";
import Badge from '@material-ui/core/Badge';
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import IconButton from "@material-ui/core/IconButton";

import SaveButton from "./SaveButton";
import Highlighter from "react-highlight-words";


const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 5,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      backgroundColor: '#4ca790',
      color: 'white',
    },
}))(Badge);

const useStyles = makeStyles((theme) =>
    createStyles({
        // video: {
        //     paddingTop: theme.spacing(1),
        //     paddingLeft: theme.spacing(5),
        //     width: '100%',
        // },
        functionBar: {
            paddingLeft: theme.spacing(5),
            justifyContent: "space-between",
        },
        clipBar: {
            display: "flex",
            alignItems: "center",
        },
        countClip: {},
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
            paddingTop: theme.spacing(1),
            paddingLeft: theme.spacing(5),
            position: "relative",
            paddingBottom: "56.25%" /* 16:9 */,
            height: 0
        },

    })
);

const Video = ({keyWord, item}) => {
    const classes = useStyles();

    const [count, setCount] = React.useState(1);
    const totalPage = 3;

    const [word, setWord] = React.useState(1);
    const totalWord = item.searchTranscript?.length || 0;
    
    const transcriptList = item.transcriptList;
    const baseUrl = 'https://youtube.com/embed/';
    const videoUrl = `${baseUrl}${item.id}`;
    const videoTitle = item.title;

    const videoTrans = transcriptList?.map((transcript) => (
        <li key={transcript._id}>
            <Highlighter
                searchWords={[keyWord]}
                autoEscape={true}
                textToHighlight={transcript.text}
            />
        </li>
    )) ?? []; 

    return (
        <>  
        <div>
          <Toolbar className={classes.functionBar}>
            <div>
              <SaveButton />
              <StyledBadge badgeContent={1} max={9} >
                <IconButton><NoteAddOutlinedIcon/></IconButton>
              </StyledBadge>
            </div>

            <div className={classes.clipBar}>
              <IconButton onClick={() => setCount(1)}>
                <FirstPageIcon />
              </IconButton>
              <IconButton
                onClick={() => setCount(count > 1 ? count - 1 : count)}
              >
                <NavigateBeforeOutlinedIcon />
              </IconButton>
              <Typography className={classes.countClip}>
                {" "}
                {count}/{totalPage}
              </Typography>
              <IconButton
                onClick={() => setCount(count < totalPage ? count + 1 : count)}
              >
                <NavigateNextOutlinedIcon />
              </IconButton>
              <IconButton onClick={() => setCount(totalPage)}>
                <LastPageIcon />
              </IconButton>
            </div>
          </Toolbar>
        </div>

        <div className={classes.youtubevideo}>
            <iframe 
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
                src={videoUrl}
                title={videoTitle}
                frameBorder="0"
            >
            </iframe>
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

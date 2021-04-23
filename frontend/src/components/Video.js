import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        video: {
            paddingTop: theme.spacing(2),
            paddingLeft: theme.spacing(5),
            width: '100%',
        },
        transcript: {
            paddingTop: theme.spacing(5),
            paddingLeft: theme.spacing(5),
        }
    })
);

const Video = ({source, transcript}) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.video}>
                <iframe id="player" type="text/html" width="100%" height='500px'
                    src={source}
                    frameborder="0">
                </iframe>
            </div>
            <div className={classes.transcript}>
                <Typography paragraph>
                 {transcript}
                </Typography>
            </div>
        </>
    )
}

export default Video

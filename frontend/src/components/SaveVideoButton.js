import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { createStyles, makeStyles } from "@material-ui/core/styles";

import axios from 'axios';

const useStyles = makeStyles((theme) => {
    createStyles({
        savedVideo: {
            color: '#4ca790'    
        }
    });
});

const SaveVideoButton = ({tokenid, videoid, searchTerm}) => {
    const classes = useStyles();
    const [favourite, setFavourite] = React.useState(false);

    const data = {
        "video": videoid,
        "search_term": searchTerm
    }

    const handleFavouriteButtonClicked = (event) => {
        axios
        .post(`${process.env.REACT_APP_URL}/saved-video`, data, { headers: { 'Authorization': `JWT ${tokenid}` } })
        .then(() => {
            console.log("Save video successfully");
            setFavourite(true);
        })
        .catch((error) => {
            console.log("Video can not be saved");
        });
    }

    return(
        <div>
            { !favourite 
            ? <IconButton onClick={handleFavouriteButtonClicked}><FavoriteBorderIcon/></IconButton>
            : <IconButton className={classes.savedVideo}><FavoriteIcon/></IconButton> 
            }
        </div>
    );
}

export default SaveVideoButton;
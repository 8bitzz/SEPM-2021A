import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import axios from 'axios';

const SaveVideoButton = ({tokenid, videoid, searchTerm}) => {
    const data = {
        "video": videoid,
        "search_term": searchTerm
    }

    const INIT_STATE = () => {
        axios
        .get(`${process.env.REACT_APP_URL}/saved-video/is-saved/${videoid}`, { headers: { 'Authorization': `JWT ${tokenid}` } })
        .then((response) => {
            console.log(response.data.message);
            setFavourite(true);
        })
        .catch((error) => {
            console.log(error.message);
        });
    }

    const [favourite, setFavourite] = React.useState(INIT_STATE);

    const handleFavouriteButtonClicked = (event) => {
        axios
        .post(`${process.env.REACT_APP_URL}/saved-video`, data, { headers: { 'Authorization': `JWT ${tokenid}` } })
        .then(() => {
            console.log("Save video successfully");
            setFavourite(true);
        })
        .catch((error) => {
            console.log("Video has already saved");
        });
    }

    return(
        <>
            { !favourite 
            ? <IconButton onClick={handleFavouriteButtonClicked}><FavoriteBorderIcon/></IconButton>
            : <IconButton><FavoriteIcon/></IconButton> 
            }
        </>
    );
}

export default SaveVideoButton;
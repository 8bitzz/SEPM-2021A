import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import { withStyles } from "@material-ui/core/styles";

import axios from 'axios';

const SaveNoteButton = ({tokenid, videoid, searchTerm}) => {
    
    return(
        <>
            <StyledBadge badgeContent={1} max={9} >
                <IconButton><NoteAddOutlinedIcon/></IconButton>
            </StyledBadge>
        </>
    );
}

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

export default SaveNoteButton;
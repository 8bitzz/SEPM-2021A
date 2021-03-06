import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

import axios from 'axios';
import styled from 'styled-components';

const SaveNoteButton = ({noteCount, noteInput, handleNoteInputChange, handleNoteCreate}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return(
        <> 
            { noteCount == 0 ?
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <>
                    <IconButton aria-describedby={id} {...bindTrigger(popupState)} onClick={handleClick}><NoteAddOutlinedIcon /></IconButton>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <Box p={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="note"
                                        label="Note"
                                        name="note"
                                        multiline
                                        rows={4}
                                        value={noteInput}
                                        onChange={handleNoteInputChange}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonWrap
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNoteCreate}
                                    >
                                        Create Note
                                    </ButtonWrap>
                                </Grid>
                            </Grid>
                        </Box>
                    </Popover>
                    </>
                )}
            </PopupState>
            : 
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <>
                    <StyledBadge badgeContent={noteCount}>
                        <IconButton aria-describedby={id} {...bindTrigger(popupState)} onClick={handleClick}><NoteAddOutlinedIcon /></IconButton>
                    </StyledBadge>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <Box p={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="note"
                                        label="Note"
                                        name="note"
                                        multiline
                                        rows={4}
                                        value={noteInput}
                                        onChange={handleNoteInputChange}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonWrap
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNoteCreate}
                                    >
                                        Create Note
                                    </ButtonWrap>
                                </Grid>
                            </Grid>
                        </Box>
                    </Popover>
                    </>
                )}
            </PopupState>
            }
        </>
    );
}

const ButtonWrap = styled(Button)`
    && {
        background-color: #7de38d;
        color: #222;
        margin-top: 20px;
        margin-bottom: 20px;
        text-transform: capitalize;
    }

    &&:disabled {
        background-color: #f8f8f8;
        color: #5f6368;
    }

    &&:hover {
        background-color: #233326;
        color: #fff;
    }
`;

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
import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    clickedButton: {
       color: '#4ca790'
       
    }
});

class SaveButton extends React.Component {
    state = {icon: true}
    handleClick = e => {
        const { icon } = this.state
        this.setState({ icon: !icon })   
    }
    render() {
        // const classes = useStyles();
        const { classes } = this.props;
        return (
            <a onClick={this.handleClick}>
                { this.state.icon
                    ? <IconButton><FavoriteBorderIcon/></IconButton>
                    : <IconButton className={classes.clickedButton}><FavoriteIcon/></IconButton>   
                }   
            </a>
        );
    }
}

export default withStyles(useStyles)(SaveButton);
import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

    class ClipNavigation extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            count: 0
          };
        }

        render() {
            return (
                <div>
                    <IconButton  onClick={() => this.setState({ count: this.state.count + 1 })}>
                        <NavigateNextOutlinedIcon/>
                    </IconButton >
                    <IconButton  onClick={() => this.setState({ count: this.state.count - 1 })}>
                        <NavigateBeforeOutlinedIcon/>
                    </IconButton >
                </div>
            );
        }
    }

    
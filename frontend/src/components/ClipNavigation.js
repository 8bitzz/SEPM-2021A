import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeOutlinedIcon from '@material-ui/icons/NavigateBeforeOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';


// class ClipNavigation extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         page: 0
//       };
//     }
  
//     render() {
//       return (
//         // <div>
//         //   <p>You clicked {this.state.count} times</p>
//         //   <button onClick={() => this.setState({ count: this.state.count + 1 })}>
//         //     Click me
//         //   </button>
//         // </div>
//         <div>
//             <IconButton><FirstPageIcon/></IconButton>
//               <IconButton onClick={() => this.setPage(this.state.page - 1)}><NavigateBeforeOutlinedIcon/></IconButton>
              
//               <p> {this.state.page} </p>
//               <IconButton onClick={() => this.setPage(this.state.page + 1)}><NavigateNextOutlinedIcon/></IconButton>
//               <IconButton><LastPageIcon/></IconButton> 
//         </div>
//       );
//     }
//   }

// const ClipNavigation = ({page, onClick}) => {
//     return {
//         <IconButton><FirstPageIcon/></IconButton>
//               <IconButton onClick={() => this.setPage(this.state.page - 1)}><NavigateBeforeOutlinedIcon/></IconButton>
              
//               <p> {this.state.page} </p>
//               <IconButton onClick={() => this.setPage(this.state.page + 1)}><NavigateNextOutlinedIcon/></IconButton>
//               <IconButton><LastPageIcon/></IconButton> 
//     }
// }
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
                    <IconButton  onClick={() => this.setCount({ count: this.state.count + 1 })}>
                        <NavigateNextOutlinedIcon/>
                    </IconButton >
                    <IconButton  onClick={() => this.setCount({ count: this.state.count - 1 })}>
                        <NavigateBeforeOutlinedIcon/>
                    </IconButton >
                </div>
            );
        }
    }

    
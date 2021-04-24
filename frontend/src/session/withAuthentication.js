import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../services/index';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          // setState authUser
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        },
      );
      this.onIdTokenChangedlistener = this.props.firebase.auth.onIdTokenChanged(
        authUser => {
          if(authUser){
            authUser.getIdToken(true).then(function (idToken) {
                localStorage.setItem("idtoken", idToken);
                localStorage.setItem("isSignedIn", true);
            }).catch(function (error) {
                console.log(error);
            });
          } else {
            localStorage.clear();
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
      this.onIdTokenChangedlistener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
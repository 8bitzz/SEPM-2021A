import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage'
import SearchResult from './pages/SearchResult';
import SignUpPage from './pages/Signup';
import SignInPage from './pages/Signin';
import Navigation from './components/Navigation';

import { withFirebase } from './services/index';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }
  
  render() {
    return (
      <Router>
          <Navigation authUser={this.state.authUser} />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/result" component={SearchResult} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
          </Switch>
      </Router>
    );
  }
  
}

export default withFirebase(App);

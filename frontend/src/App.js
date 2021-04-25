import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage'
import SearchResult from './pages/SearchResult';
import SignUpPage from './pages/Signup';
import SignInPage from './pages/Signin';
import TestFirebaseSendToken from "./components/TestFirebaseSendToken"

import { withAuthentication } from './session/index';

const App = () => {
  return(
    <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/search" component={SearchResult} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/testFirebaseSendToken" component={TestFirebaseSendToken} />
          </Switch>
      </Router>
  );
}

export default withAuthentication(App);

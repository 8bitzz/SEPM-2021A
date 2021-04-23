import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage'
import SearchResult from './pages/SearchResult';
import SignUpPage from './pages/Signup';
import SignInPage from './pages/Signin';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/result" component={SearchResult} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/signin" component={SignInPage} />
        </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage'
import SearchResult from './pages/SearchResult';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/result" component={SearchResult} />
          <Route path="/signup" component={Signup} />
        </Switch>
    </Router>
  );
}

export default App;

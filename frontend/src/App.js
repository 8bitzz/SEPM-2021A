import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage'
import SearchResult from './pages/SearchResult';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/result">
            <SearchResult />
          </Route>
          <Route path="/" exact>
            <Homepage />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Result from './pages/Result';
import Homepage from './pages/Homepage'

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>

          <Route path="/contact" exact>
            <Contact />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;

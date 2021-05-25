import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage'
import SearchResult from './pages/SearchResult';
import SignUpPage from './pages/Signup';
import SignInPage from './pages/Signin';
import Note from './pages/Notes';
import NoteDetail from './pages/NoteDetail';
import SavedClips from './pages/SavedClips';
import TestFirebaseSendToken from "./components/TestFirebaseSendToken"

import { withAuthentication } from './session/index';
import VideoPage from './pages/VideoPage';



const App = () => {
  return(
    <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/search" component={SearchResult} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/notes" component={Note} />
            <Route path="/notedetail" component={NoteDetail} />
            <Route path="/savedclips" component={SavedClips} />
            <Route path="/testFirebaseSendToken" component={TestFirebaseSendToken} />
            <Route path="/video/:videoId" component={VideoPage} />
          </Switch>
      </Router>
  );
}

export default withAuthentication(App);

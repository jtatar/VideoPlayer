import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import VideoPlayer from './Components/VideoPlayer/VideoPlayer';
import Chat from './Components/Chat/Chat';
import ControlPanel from './Components/ControlPanel/ControlPanel';

function App() {
  console.log(process.env.NODE_ENV);
  const requestUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://movieplayer-api.herokuapp.com';
  const twitchName = 'metexo';

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="wrapper">
        <Switch>
          <Route path="/videoplayer">
            <VideoPlayer requestUrl={requestUrl}></VideoPlayer>
            <Chat twitchName={twitchName}></Chat>
          </Route>
          <Route path="/controlpanel">
            <ControlPanel requestUrl={requestUrl}></ControlPanel>
          </Route>
          <Route path="/">
            <div className="mainSite">
              <Link to="/videoplayer">
                <button className="mainButton">Video Player</button>
              </Link>
              <Link to="/controlpanel">
                <button className="mainButton">Control Panel</button>
              </Link>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

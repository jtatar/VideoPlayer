import './App.css';

import VideoPlayer from './Components/VideoPlayer/VideoPlayer';
import Chat from './Components/Chat/Chat';

function App() {
  return (
    <div className="wrapper">
      <VideoPlayer></VideoPlayer>
      <Chat></Chat>
    </div>
  );
}

export default App;

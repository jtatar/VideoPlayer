import React from 'react';
import '../../../node_modules/video-react/dist/video-react.css';
import './Chat.css';

const Chat = () => {
  return (
    <div className="chatWrapper">
      <iframe
        src="https://www.twitch.tv/embed/metexo/chat?parent=localhost&darkpopout"
        height="100%"
        width="100%"
      ></iframe>
    </div>
  );
};

export default Chat;

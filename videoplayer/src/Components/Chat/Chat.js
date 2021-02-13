import React from 'react';
import '../../../node_modules/video-react/dist/video-react.css';

const Chat = () => {
  return (
    <div>
      <iframe
        src="https://www.twitch.tv/embed/metexo/chat?parent=localhost&darkpopout"
        height="100%"
        width="99%"
      ></iframe>
    </div>
  );
};

export default Chat;

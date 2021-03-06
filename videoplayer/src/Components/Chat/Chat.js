import React from 'react';
import './Chat.css';

const Chat = ({ twitchName }) => {
  const siteUrl = window.location.hostname.replace('www.', '');
  return (
    <div className="chatWrapper">
      <iframe
        src={`https://www.twitch.tv/embed/${twitchName}/chat?parent=${siteUrl}&darkpopout`}
        height="100%"
        width="100%"
      ></iframe>
    </div>
  );
};

export default Chat;

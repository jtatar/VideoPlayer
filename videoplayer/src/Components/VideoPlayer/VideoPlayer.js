import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Player } from 'video-react';

const VideoPlayer = () => {
  const [videoSrc, setvideoSrc] = useState('');

  useEffect(async () => {
    const response = await axios.get('localhost:3001/videoData');
  }, []);

  return (
    <div>
      <Player
        playsInline
        poster="/assets/poster.png"
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      />
    </div>
  );
};

export default VideoPlayer;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Player } from 'video-react';

const VideoPlayer = () => {
  const [videoSrc, setvideoSrc] = useState('');

  useEffect(async () => {
    const es = new EventSource('http://localhost:3001/api/updates');
    es.addEventListener('loadNewVideo', (event) => {
      console.log(event);
    });
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

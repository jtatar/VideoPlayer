import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Subjects } from '@jtatvideo/common';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ requestUrl }) => {
  const [videoSrc, setvideoSrc] = useState('');
  const [videoTime, setvideoTime] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);
  const myPlayer = useRef(null);

  useEffect(async () => {
    const es = new EventSource(`${requestUrl}/api/updates`);
    es.addEventListener(Subjects.LoadNewVideo, (e) => loadNewVideo(e));
    es.addEventListener(Subjects.PauseVideo, (e) => pauseVideo(e));
    es.addEventListener(Subjects.StartVideo, (e) => startVideo(e));
    es.addEventListener(Subjects.SeekVideo, (e) => seekVideo(e));

    const response = await axios.get(`${requestUrl}/api/video`);
    const { videoSrc, videoTime, isPlaying } = response.data;
    setvideoSrc(videoSrc);
    setvideoTime(videoTime);
    if (videoTime > 0) {
      console.log(myPlayer);
      myPlayer.current.seekTo(videoTime);
    }
    console.log(videoTime);
    setisPlaying(isPlaying);
  }, []);

  const loadNewVideo = (e) => {
    const { videoSrc, videoTime, isPlaying } = JSON.parse(e.data);
    setvideoSrc(videoSrc);
    setvideoTime(videoTime);
    setisPlaying(isPlaying);
    myPlayer.current.seekTo(0);
  };

  const pauseVideo = (e) => {
    const { videoTime } = JSON.parse(e.data);
    setisPlaying(false);
    setvideoTime(videoTime);
    myPlayer.current.seekTo(videoTime);
  };

  const startVideo = (e) => {
    setisPlaying(true);
    console.log(myPlayer.current);
  };

  const seekVideo = (e) => {
    const { videoTime } = JSON.parse(e.data);
    setvideoTime(videoTime);
    myPlayer.current.seekTo(videoTime);
  };

  return (
    <div>
      <ReactPlayer
        ref={myPlayer}
        url={videoSrc}
        muted={true}
        width="100%"
        height="100vh"
        playing={isPlaying}
        controls={true}
      />
    </div>
  );
};

export default VideoPlayer;

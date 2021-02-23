import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Subjects } from '@jtatvideo/common';
import ReactPlayer from 'react-player';
import VideoPlayIcon from '../../Images/video-play-button.png';
import './VideoPlayer.css';

const VideoPlayer = ({ requestUrl }) => {
  const [videoSrc, setvideoSrc] = useState('');
  const [videoTime, setvideoTime] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);
  const [userInteraction, setuserInteraction] = useState(false);
  const myPlayer = useRef(null);

  useEffect(async () => {
    const es = new EventSource(`${requestUrl}/api/updates`);
    es.addEventListener(Subjects.LoadNewVideo, (e) => loadNewVideo(e));
    es.addEventListener(Subjects.PauseVideo, (e) => pauseVideo(e));
    es.addEventListener(Subjects.StartVideo, (e) => startVideo(e));
    es.addEventListener(Subjects.SeekVideo, (e) => seekVideo(e));
  }, []);

  useEffect(async () => {
    try {
      const response = await axios.get(`${requestUrl}/api/video`);
      const { videoSrc, videoTime, isPlaying } = response.data;
      setvideoSrc(videoSrc);
      setvideoTime(videoTime);
      //Looking for better solution
      setTimeout(() => {
        if (videoTime > 0 && myPlayer.current) {
          myPlayer.current.seekTo(videoTime + 1);
          console.log(myPlayer.current);
        }
      }, 1000);
      setisPlaying(isPlaying);
    } catch (err) {
      console.log(err);
    }
  }, [userInteraction]);

  const loadNewVideo = (e) => {
    const { videoSrc, videoTime, isPlaying } = JSON.parse(e.data);
    setvideoSrc(videoSrc);
    setvideoTime(videoTime);
    setisPlaying(isPlaying);
  };

  const pauseVideo = (e) => {
    const { videoTime } = JSON.parse(e.data);
    setisPlaying(false);
    setvideoTime(videoTime);
    myPlayer.current.seekTo(videoTime);
  };

  const startVideo = (e) => {
    setisPlaying(true);
  };

  const seekVideo = (e) => {
    const { videoTime } = JSON.parse(e.data);
    setvideoTime(videoTime);
    myPlayer.current.seekTo(videoTime);
  };

  const showPlayer = () => {
    setuserInteraction(true);
  };

  return (
    <div className="videoWrapper">
      {userInteraction ? (
        <ReactPlayer
          ref={myPlayer}
          url={videoSrc}
          muted={false}
          volume={0.5}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls={true}
        />
      ) : (
        <input
          type="image"
          src={VideoPlayIcon}
          className="playButton"
          onClick={showPlayer}
        ></input>
      )}
    </div>
  );
};

export default VideoPlayer;

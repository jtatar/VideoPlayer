import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import './ControlPanel.css';

const ControlPanel = ({ requestUrl }) => {
  const [videoSrc, setvideoSrc] = useState('');
  const [playing, setPlaying] = useState(false);
  const [messageLog, setmessageLog] = useState(null);

  const setResponseText = (response) => {
    const { msg, err } = response.data;
    if (msg) {
      setmessageLog(<p className="message">{msg}</p>);
    } else {
      setmessageLog(<p className="error">{err}</p>);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    //Do request to api
    const response = await axios.post(`${requestUrl}/api/video`, {
      videoSrc: videoSrc,
    });
    setResponseText(response);
  };

  const onStart = async () => {
    const response = await axios.get(`${requestUrl}/api/video/start`);
    setResponseText(response);
    const { err } = response.data;
    if (!err) {
      setPlaying(true);
    }
  };

  const onPause = async () => {
    const response = await axios.get(`${requestUrl}/api/video/pause`);
    setResponseText(response);
    const { err } = response.data;
    if (!err) {
      setPlaying(false);
    }
  };

  const onSeek = async (time) => {
    console.log(time);
    const response = await axios.post(`${requestUrl}/api/video/seek`, {
      seekTime: time,
    });
    setResponseText(response);
  };

  return (
    <div className="controlPanelWrapper">
      <div className="controlPanel">
        <ReactPlayer
          url={videoSrc}
          controls={true}
          playing={playing}
          muted={true}
          onSeek={onSeek}
        />
        <form onSubmit={onSubmit} className="form">
          <label>Movie source</label>
          <input
            value={videoSrc}
            onChange={(e) => setvideoSrc(e.target.value)}
            className="formInput"
          />
          <button className="button">Change video</button>
        </form>
        <div className="controlButtons">
          <button onClick={onStart} className="button">
            Play
          </button>
          <button onClick={onPause} className="button">
            Pause
          </button>
        </div>
        <div className="logs">{messageLog}</div>
      </div>
    </div>
  );
};

export default ControlPanel;

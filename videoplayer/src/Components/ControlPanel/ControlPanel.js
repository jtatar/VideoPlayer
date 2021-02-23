import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import './ControlPanel.css';

const ControlPanel = ({ requestUrl }) => {
  const [videoSrc, setvideoSrc] = useState('');
  const [playing, setPlaying] = useState(false);
  const [messageLog, setmessageLog] = useState(null);

  const setResponseText = (response) => {
    const { msg } = response.data;
    setmessageLog(<p className="message">{msg}</p>);
  };

  const setErrorsText = (response) => {
    try {
      const { errors } = response.data;
      setmessageLog(
        errors.map((err) => (
          <p className="error" key={err.message}>
            {err.message}
          </p>
        ))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${requestUrl}/api/video`, {
        videoSrc: videoSrc,
      });
      setResponseText(response);
    } catch (err) {
      setErrorsText(err.response);
    }
  };

  const onStart = async () => {
    try {
      const response = await axios.get(`${requestUrl}/api/video/start`);
      setPlaying(true);
      setResponseText(response);
    } catch (err) {
      setErrorsText(err.response);
    }
  };

  const onPause = async () => {
    try {
      const response = await axios.get(`${requestUrl}/api/video/pause`);
      setResponseText(response);
      setPlaying(false);
    } catch (err) {
      setErrorsText(err.response);
    }
  };

  const onSeek = async (time) => {
    try {
      const response = await axios.post(`${requestUrl}/api/video/seek`, {
        seekTime: time,
      });
      setResponseText(response);
    } catch (err) {
      setResponseText(err.response);
    }
  };

  return (
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
  );
};

export default ControlPanel;

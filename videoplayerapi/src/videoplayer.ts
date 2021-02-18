import ReactPlayer from 'react-player';
import { Subjects } from '@jtatvideo/common';
import SSE from 'express-sse-ts';
import { NotFoundError } from './errors/not-found-error';
import { BadRequestError } from './errors/bad-request-error';

interface VideoEvent {
  videoSrc?: string;
  isPlaying?: boolean;
  videoTime?: number;
}

class VideoPlayer {
  private _videoSrc = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4';
  private _isPlaying = false;
  private _videoTime = 0;
  private intervalId: NodeJS.Timeout | undefined;
  private client?: SSE;

  get videoSrc() {
    return this._videoSrc;
  }
  set videoSrc(value: string) {
    this._videoSrc = value;
  }

  get isPlaying() {
    return this._isPlaying;
  }
  set isPlaying(value: boolean) {
    this._isPlaying = value;
  }

  get videoTime() {
    return this._videoTime;
  }
  set videoTime(value: number) {
    this._videoTime = value;
  }

  initializeClient(initializedClient: SSE) {
    this.client = initializedClient;
  }

  async loadNewVideo(src: string) {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
    const response = await ReactPlayer.canPlay(src);
    if (response) {
      this._videoSrc = src;
      this.videoTime = 0;
      this.isPlaying = false;

      this.emitEvent(Subjects.LoadNewVideo, {
        videoSrc: this.videoSrc,
        videoTime: this.videoTime,
        isPlaying: this.isPlaying,
      });
      return { msg: 'Changed video successfully' };
    } else {
      throw new NotFoundError();
    }
  }

  getVideo(): VideoEvent {
    return {
      videoSrc: this.videoSrc,
      videoTime: this.videoTime,
      isPlaying: this.isPlaying,
    };
  }

  pauseVideo() {
    if (this.isPlaying) {
      clearInterval(this.intervalId!);
      this.intervalId = undefined;
      this.isPlaying = false;
      this.emitEvent(Subjects.PauseVideo, {
        isPlaying: this.isPlaying,
        videoTime: this.videoTime,
      });
    }
    return { msg: `Video paused, time passed: ${this.videoTime.toFixed(1)}` };
  }

  startVideo() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.intervalId = setInterval(() => (this.videoTime += 0.1), 100);
      this.emitEvent(Subjects.StartVideo, { isPlaying: this.isPlaying });
      return { msg: 'Starting video' };
    } else {
      throw new BadRequestError('Video already started');
    }
  }

  seekVideo(time: number) {
    this.videoTime = time;
    this.emitEvent(Subjects.SeekVideo, { videoTime: this.videoTime });
    return { msg: `Seek time to ${time}` };
  }

  emitEvent(subject: Subjects, data: VideoEvent) {
    if (this.client) {
      this.client.send(JSON.stringify(data), subject);
    }
  }
}

export const videoPlayer = new VideoPlayer();

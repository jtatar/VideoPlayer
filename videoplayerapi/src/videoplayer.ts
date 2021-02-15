import { getVideoDurationInSeconds } from 'get-video-duration';

class VideoPlayer {
  private _videoSrc = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4';
  private _isPlaying = false;
  private _videoTime = 0;
  private _videoLength = 0;

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

  get videoLength() {
    return this._videoLength;
  }
  set videoLength(value: number) {
    this._videoLength = value;
  }

  async loadNewVideo(src: string) {
    try {
      const response = await getVideoDurationInSeconds(src);
      this._videoSrc = src;
      this.videoLength = response;
      return 'Changed video successfully';
    } catch (err) {
      console.log(err);
      return 'Video doesnt exist';
    }
  }

  pauseVideo(time: number) {
    this.isPlaying = false;
    this.videoTime = time;
  }

  startVideo() {
    this.isPlaying = true;
  }
}

export const videoPlayer = new VideoPlayer();

import express, { Request, Response } from 'express';
import { videoPlayer } from '../videoplayer';

const router = express.Router();

router.get('/api/video/pause', async (req: Request, res: Response) => {
  const response = videoPlayer.pauseVideo();
  res.send(response);
});

export { router as pauseVideoRouter };

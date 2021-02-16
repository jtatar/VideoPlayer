import express, { Request, Response } from 'express';
import { videoPlayer } from '../videoplayer';

const router = express.Router();

router.get('/api/video/start', async (req: Request, res: Response) => {
  const response = videoPlayer.startVideo();
  res.send(response);
});

export { router as startVideoRouter };

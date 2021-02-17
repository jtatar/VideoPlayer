import express, { Request, Response } from 'express';
import { videoPlayer } from '../videoplayer';

const router = express.Router();

router.post('/api/video/seek', async (req: Request, res: Response) => {
  const { seekTime } = req.body;
  const response = videoPlayer.seekVideo(seekTime);
  res.send(response);
});

export { router as seekVideoRouter };

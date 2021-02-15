import express, { Request, response, Response } from 'express';
import { body } from 'express-validator';
import { videoPlayer } from '../videoplayer';

const router = express.Router();

router.get('/api/video', async (req: Request, res: Response) => {
  res.send({ videoSrc: videoPlayer.videoSrc });
});

export { router as indexVideoRouter };

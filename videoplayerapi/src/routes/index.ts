import express, { Request, Response } from 'express';
import { videoPlayer } from '../videoplayer';

const router = express.Router();

router.get('/api/video', async (req: Request, res: Response) => {
  res.send(videoPlayer.getVideo());
});

export { router as indexVideoRouter };

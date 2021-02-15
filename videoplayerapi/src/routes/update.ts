import express, { Request, response, Response } from 'express';
import { videoPlayer } from '../videoplayer';

const router = express.Router();

router.get('/api/updates', async (req: Request, res: Response) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
});

export { router as indexVideoRouter };

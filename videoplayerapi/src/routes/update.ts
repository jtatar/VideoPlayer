import express, { NextFunction, Request, response, Response } from 'express';
import SSE from 'express-sse-ts';
import { videoPlayer } from '../videoplayer';

const router = express.Router();
const sse = new SSE();

router.get('/api/updates', sse.init, () => {
  videoPlayer.initializeClient(sse);
});

export { router as updatesVideoRouter };

import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { videoPlayer } from '../videoplayer';

const router = express.Router();

router.post(
  '/api/video',
  [body('videoSrc').not().isEmpty().withMessage('Cant be empty')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { videoSrc } = req.body;
    const response = await videoPlayer.loadNewVideo(videoSrc);
    res.send(response);
  }
);

export { router as setVideoRouter };

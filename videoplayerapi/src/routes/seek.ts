import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { videoPlayer } from '../videoplayer';

const router = express.Router();

router.post(
  '/api/video/seek',
  [
    body('seekTime')
      .not()
      .isEmpty()
      .withMessage('Cant be empty')
      .isNumeric()
      .withMessage('Must be a number'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { seekTime } = req.body;
    const response = videoPlayer.seekVideo(seekTime);
    res.send(response);
  }
);

export { router as seekVideoRouter };

import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { indexVideoRouter } from './routes';
import { setVideoRouter } from './routes/set';
import { updatesVideoRouter } from './routes/update';
import { startVideoRouter } from './routes/start';
import { pauseVideoRouter } from './routes/stop';
import { seekVideoRouter } from './routes/seek';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const frontUrl = process.env.FRONT_URL || 'http://localhost:3000';

const app = express();
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', `${frontUrl}`); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.set('trust proxy', true);
app.use(json());

app.use(startVideoRouter);
app.use(pauseVideoRouter);
app.use(seekVideoRouter);
app.use(updatesVideoRouter);
app.use(indexVideoRouter);
app.use(setVideoRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

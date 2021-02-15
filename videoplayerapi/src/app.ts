import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { indexVideoRouter } from './routes';
import { setVideoRouter } from './routes/set';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(indexVideoRouter);
app.use(setVideoRouter);

app.all('*', async (req, res) => {
  res.status(404).send({ message: 'Not Found' });
});

export { app };

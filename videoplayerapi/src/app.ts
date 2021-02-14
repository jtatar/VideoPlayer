import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.all('*', async (req, res) => {
  res.status(404).send({ message: 'Not Found' });
});

export { app };

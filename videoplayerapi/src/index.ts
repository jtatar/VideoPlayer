import { app } from './app';

const start = async () => {
  app.listen(process.env.PORT || 3001, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

start();

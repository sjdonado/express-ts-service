import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

import ApiError from '@utils/ApiError';
import ErrorSerializer from '@serializers/ErrorSerializer';
import { stream } from '@utils/logger';

const app = express();

app.use(morgan('tiny', { stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const status = 400;

  res.status(status).json(new ErrorSerializer(status, 'Not found'));
});

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const {
    status = 500,
    message = 'Something went wrong',
  } = err;

  res.status(status).json(new ErrorSerializer(status, message));
});

export default app;

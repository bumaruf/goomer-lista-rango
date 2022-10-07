import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { router } from './routes/index.routes';

import '@core/container';

import { AppError } from '@core/errors/AppError';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      ...(error?.errorCode ? { code: error.errorCode } : {}),
    });
  }

  console.error(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

export default app;

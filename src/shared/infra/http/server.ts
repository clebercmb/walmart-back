import 'reflect-metadata';
import 'dotenv/config';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import AppError from '@shared/errors/AppError';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

// app.use(
//   cors({
//     origin: 'http://localhost:3333',
//   }),
// );

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server',
  });
});

app.listen(3334, () => {
  console.log('🚀 Server started on port 3334!');
});

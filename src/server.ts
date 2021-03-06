import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import 'reflect-metadata';
import './database';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: 'error', message: err.message });
    }
    console.error(err);

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server' });
  },
);

const PORT = 3001;

app.listen(PORT || 3000, () => {
  console.log('🚀 Server started on port 3001');
});

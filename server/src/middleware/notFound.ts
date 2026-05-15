import type { RequestHandler } from 'express';
import { AppError } from '../types/api.types';

export const notFound: RequestHandler = (req, _res, next) => {
  next(new AppError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

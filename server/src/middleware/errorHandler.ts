import type { ErrorRequestHandler } from 'express';
import { AppError } from '../types/api.types';
import { env } from '../config/env';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, error: err.message });
    return;
  }

  console.error('[error]', err);

  res.status(500).json({
    success: false,
    error: env.isDev ? String(err) : 'Internal server error',
  });
};

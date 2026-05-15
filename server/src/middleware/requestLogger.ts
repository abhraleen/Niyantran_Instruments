import type { RequestHandler } from 'express';
import { env } from '../config/env';

export const requestLogger: RequestHandler = (req, res, next) => {
  if (!env.isDev) return next();

  const start = Date.now();

  res.on('finish', () => {
    const ms    = Date.now() - start;
    const color = res.statusCode < 400 ? '\x1b[32m' : '\x1b[31m';
    console.log(
      `${color}${req.method}\x1b[0m ${req.originalUrl} \x1b[2m${res.statusCode} — ${ms}ms\x1b[0m`,
    );
  });

  next();
};

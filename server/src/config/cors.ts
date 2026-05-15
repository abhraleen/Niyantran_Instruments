import type { CorsOptions } from 'cors';
import { env } from './env';

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an Origin header (same-origin, curl, Postman)
    if (!origin) return callback(null, true);

    if (env.FRONTEND_ORIGINS.includes(origin)) return callback(null, true);

    callback(new Error(`CORS: origin not allowed — ${origin}`));
  },
  methods:        ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials:    true,
  maxAge:         600, // preflight cache in seconds
};

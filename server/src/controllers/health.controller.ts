import type { RequestHandler } from 'express';
import { pool } from '../db';
import { env } from '../config/env';
import type { ApiResponse } from '../types';

interface HealthData {
  status:      'ok' | 'degraded';
  timestamp:   string;
  version:     string;
  environment: string;
  database:    'connected' | 'disconnected' | 'unconfigured';
}

export const healthCheck: RequestHandler<unknown, ApiResponse<HealthData>> = async (_req, res, next) => {
  try {
    let database: HealthData['database'] = 'unconfigured';

    if (env.DATABASE_URL) {
      try {
        await pool.query('SELECT 1');
        database = 'connected';
      } catch {
        database = 'disconnected';
      }
    }

    const data: HealthData = {
      status:      database === 'disconnected' ? 'degraded' : 'ok',
      timestamp:   new Date().toISOString(),
      version:     '1.0.0',
      environment: env.NODE_ENV,
      database,
    };

    res.status(data.status === 'ok' ? 200 : 207).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

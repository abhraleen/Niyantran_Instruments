import type { RequestHandler } from 'express';

/**
 * Admin controllers — stubbed until the admin dashboard is implemented.
 */

export const getDashboard: RequestHandler = (_req, res) => {
  res.status(501).json({ success: false, error: 'Not implemented' });
};

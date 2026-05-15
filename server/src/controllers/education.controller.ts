import type { RequestHandler } from 'express';

/**
 * Education controllers — stubbed until the enrollment system is implemented.
 */

export const createEnrollment: RequestHandler = (_req, res) => {
  res.status(501).json({ success: false, error: 'Not implemented' });
};

export const listEnrollments: RequestHandler = (_req, res) => {
  res.status(501).json({ success: false, error: 'Not implemented' });
};

export const getEnrollment: RequestHandler = (_req, res) => {
  res.status(501).json({ success: false, error: 'Not implemented' });
};

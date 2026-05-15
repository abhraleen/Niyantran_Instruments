import type { RequestHandler } from 'express';

/**
 * Inquiry controllers — stubbed until the inquiry system is implemented.
 * Each handler returns 501 Not Implemented so routes are registered and testable.
 */

export const createInquiry: RequestHandler = (_req, res) => {
  res.status(501).json({ success: false, error: 'Not implemented' });
};

export const listInquiries: RequestHandler = (_req, res) => {
  res.status(501).json({ success: false, error: 'Not implemented' });
};

export const getInquiry: RequestHandler = (_req, res) => {
  res.status(501).json({ success: false, error: 'Not implemented' });
};

export const updateInquiryStatus: RequestHandler = (_req, res) => {
  res.status(501).json({ success: false, error: 'Not implemented' });
};

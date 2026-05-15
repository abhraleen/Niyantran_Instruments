import type { RequestHandler } from 'express';
import { AppError } from '../types/api.types';

/**
 * Validates that required fields are present and non-empty in req.body.
 * Swap this out for a Zod schema validator when business logic is added.
 */
export function validateBody(requiredFields: string[]): RequestHandler {
  return (req, _res, next) => {
    const missing = requiredFields.filter(
      field => req.body[field] === undefined || req.body[field] === '',
    );

    if (missing.length > 0) {
      next(new AppError(400, `Missing required fields: ${missing.join(', ')}`));
      return;
    }

    next();
  };
}

import type { RequestHandler } from 'express';
import { inquiryService } from '../services/inquiry.service';
import type { InquiryPayload } from '../types/inquiry.types';

// ─── Validation ───────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateInquiry(body: Record<string, unknown>): string | null {
  const str = (v: unknown) => typeof v === 'string' && v.trim();

  if (!str(body.fullName))        return 'fullName is required';
  if (!str(body.email))           return 'email is required';
  if (!EMAIL_RE.test((body.email as string).trim()))
                                  return 'A valid email address is required';
  if (!['industry', 'education'].includes(body.inquiryType as string))
                                  return 'inquiryType must be "industry" or "education"';
  if (!str(body.areaOfInterest))  return 'areaOfInterest is required';
  if (!str(body.message))         return 'message is required';

  return null;
}

// ─── Handlers ─────────────────────────────────────────────────────────────────
export const createInquiry: RequestHandler = async (req, res, next) => {
  try {
    const error = validateInquiry(req.body as Record<string, unknown>);
    if (error) {
      res.status(400).json({ success: false, message: error });
      return;
    }

    const body = req.body as Record<string, string | undefined>;

    const payload: InquiryPayload = {
      inquiryType:    body.inquiryType as 'industry' | 'education',
      fullName:       body.fullName!.trim(),
      email:          body.email!.trim().toLowerCase(),
      phone:          body.phone?.trim()         || undefined,
      organization:   body.organization?.trim()  || undefined,
      qualification:  body.qualification?.trim() || undefined,
      areaOfInterest: body.areaOfInterest!.trim(),
      message:        body.message!.trim(),
    };

    await inquiryService.create(payload);

    res.status(201).json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (err) {
    next(err);
  }
};

export const listInquiries: RequestHandler = async (_req, res, next) => {
  try {
    const rows = await inquiryService.findAll();
    res.json({ success: true, data: rows, total: rows.length });
  } catch (err) {
    next(err);
  }
};

export const getInquiry: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ success: false, message: 'Invalid inquiry id' });
      return;
    }
    const row = await inquiryService.findById(id);
    if (!row) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }
    res.json({ success: true, data: row });
  } catch (err) {
    next(err);
  }
};

export const updateInquiryStatus: RequestHandler = (_req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

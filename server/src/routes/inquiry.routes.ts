import { Router } from 'express';
import {
  createInquiry,
  listInquiries,
  getInquiry,
  updateInquiryStatus,
} from '../controllers/inquiry.controller';
import { validateBody } from '../middleware/validateBody';

const router = Router();

// POST /api/inquiries
router.post(
  '/',
  validateBody(['name', 'email', 'message', 'mode']),
  createInquiry,
);

// GET /api/inquiries  — admin-protected in future
router.get('/', listInquiries);

// GET /api/inquiries/:id
router.get('/:id', getInquiry);

// PATCH /api/inquiries/:id/status
router.patch('/:id/status', updateInquiryStatus);

export default router;

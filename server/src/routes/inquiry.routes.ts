import { Router } from 'express';
import {
  createInquiry,
  listInquiries,
  getInquiry,
  updateInquiryStatus,
} from '../controllers/inquiry.controller';

const router = Router();

// POST /api/inquiries — validation handled entirely inside createInquiry
router.post('/', createInquiry);

// GET /api/inquiries  — admin-protected in future
router.get('/', listInquiries);

// GET /api/inquiries/:id
router.get('/:id', getInquiry);

// PATCH /api/inquiries/:id/status
router.patch('/:id/status', updateInquiryStatus);

export default router;

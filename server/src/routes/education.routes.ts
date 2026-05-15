import { Router } from 'express';
import {
  createEnrollment,
  listEnrollments,
  getEnrollment,
} from '../controllers/education.controller';
import { validateBody } from '../middleware/validateBody';

const router = Router();

// POST /api/education/enroll
router.post(
  '/enroll',
  validateBody(['name', 'email', 'program']),
  createEnrollment,
);

// GET /api/education/enrollments  — admin-protected in future
router.get('/enrollments', listEnrollments);

// GET /api/education/enrollments/:id
router.get('/enrollments/:id', getEnrollment);

export default router;

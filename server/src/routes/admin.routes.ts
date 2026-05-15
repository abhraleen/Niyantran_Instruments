import { Router } from 'express';
import { getDashboard } from '../controllers/admin.controller';

const router = Router();

// GET /api/admin/dashboard  — auth-protected in future
router.get('/dashboard', getDashboard);

export default router;

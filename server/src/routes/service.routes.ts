import { Router } from 'express';
import {
  listServices,
  listAllServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller';

const router = Router();

router.get('/',     listServices);      // public  — active only
router.get('/all',  listAllServices);   // admin   — all statuses
router.post('/',    createService);
router.patch('/:id', updateService);
router.delete('/:id', deleteService);

export default router;

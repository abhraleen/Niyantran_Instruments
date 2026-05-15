import { Router } from 'express';
import healthRouter    from './health.routes';
import inquiryRouter   from './inquiry.routes';
import adminRouter     from './admin.routes';
import educationRouter from './education.routes';

const api = Router();

api.use('/health',    healthRouter);
api.use('/inquiries', inquiryRouter);
api.use('/admin',     adminRouter);
api.use('/education', educationRouter);

export default api;

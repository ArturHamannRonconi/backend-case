import { Router } from 'express';

import usersRouter from './users-router.js';
import documentsRouter from './documents-router.js';

const router = Router();

router.get('/health-checker', (req, res) => res.json({
  Ip: req.ip,
  Access_on: new Date(),
  Status: res.statusCode,
  Message: 'Api running...',
}));

router.use('/users', usersRouter);
router.use('/documents', documentsRouter);

export default router;

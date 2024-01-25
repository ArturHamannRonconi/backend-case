import { Router } from 'express';

import { userRouter } from './users-routes.js';

const mainRouter = Router();

mainRouter.get('/health-checker', (req, res) => res.json({
  Ip: req.ip,
  Access_on: new Date(),
  Status: res.statusCode,
  Message: 'Api running...'
}));

mainRouter.use('users', userRouter);

export { mainRouter };
import { Router } from 'express';

import CreateUserController from '../../../modules/users/infra/controllers/create-user-controller.js';

const usersRouter = Router();

usersRouter.post('/', CreateUserController);

export default usersRouter;

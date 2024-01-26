import { Router } from 'express';

import LoginController from '../../../modules/users/infra/controllers/login-controller.js';
import CreateUserController from '../../../modules/users/infra/controllers/create-user-controller.js';

const usersRouter = Router();

usersRouter.post('/', CreateUserController);
usersRouter.post('/login', LoginController);

export default usersRouter;

import { Router } from 'express';

import Resource from '../../utils/resource.js';
import Permission from '../../utils/permission.js';
import AuthorizationMiddleware from '../middlewares/authorization-middleware.js';
import AuthenticationMiddleware from '../middlewares/authentication-middleware.js';
import LoginController from '../../../modules/users/infra/controllers/login-controller.js';
import CreateUserController from '../../../modules/users/infra/controllers/create-user-controller.js';
import ManageUserPermissionsController from '../../../modules/users/infra/controllers/manage-user-permissions-controller.js';

const usersRouter = Router();

usersRouter.post('/', CreateUserController);
usersRouter.post('/login', LoginController);
usersRouter.patch(
  '/permissions',
  AuthenticationMiddleware,
  AuthorizationMiddleware({
    action: Permission.UPDATE,
    resource: Resource.USERS,
  }),
  ManageUserPermissionsController,
);

export default usersRouter;

import { expect, jest } from '@jest/globals';

import Resource from '../../../../src/shared/utils/resource.js';
import Permission from '../../../../src/shared/utils/permission.js';
import UserModel from '../../../../src/modules/users/infra/database/user-model.js';
import CreateUserEntity from '../../../../src/modules/users/domain/create-user-entity.js';
import AuthorizationMiddleware from '../../../../src/shared/http/middlewares/authorization-middleware.js';

describe('authorization-middleware.spec', () => {
  let next;
  let request;
  let response;

  beforeAll(async () => {
    const user = await CreateUserEntity({
      email: 'valid@mail.com',
      password: 'SASsad123!@#',
      isAdmin: false,
    });

    jest
      .spyOn(UserModel, 'findOne')
      .mockResolvedValue(user);

    request = { userId: user.id };
    response = {};
    next = jest.fn();
  });

  it('should be authorize user to create', async () => {
    const action = Permission.CREATE;
    const resource = Resource.DOCUMENTS;

    const middleware = AuthorizationMiddleware({ resource, action });
    await middleware(request, response, next);

    expect(next).toHaveBeenCalled();
  });

  it('should be not found user', async () => {
    jest
      .spyOn(UserModel, 'findOne')
      .mockResolvedValue(null);

    const action = Permission.CREATE;
    const resource = Resource.DOCUMENTS;

    const middleware = AuthorizationMiddleware({ resource, action });
    const exec = async () => middleware(request, response, next);

    await expect(exec).rejects.toThrow();
  });

  it('should not be authorize user to delete', async () => {
    const action = Permission.DELETE;
    const resource = Resource.DOCUMENTS;

    const middleware = AuthorizationMiddleware({ resource, action });
    const exec = async () => middleware(request, response, next);

    await expect(exec).rejects.toThrow();
  });
});

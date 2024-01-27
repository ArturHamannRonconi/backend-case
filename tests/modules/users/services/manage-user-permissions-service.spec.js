import { jest } from '@jest/globals';

import UserRepositoryMock from '../infra/user-repository.mock.js';
import CreateUserEntity from '../../../../src/modules/users/domain/create-user-entity.js';
import ManageUserPermissionsService from '../../../../src/modules/users/services/manage-user-permissions-service.js';

describe('manage-user-permissions-service.spec', () => {
  let input;
  let user;
  let repository;

  beforeAll(async () => {
    const admin = await CreateUserEntity({
      isAdmin: true,
      email: 'admin@mail.com',
      password: 'ABCabc123!@#',
    });

    user = await CreateUserEntity({
      isAdmin: false,
      email: 'user@mail.com',
      password: 'ABCabc123!@#',
    });

    const permissions = {
      users: [
        'create',
        'read',
        'update',
        'delete',
      ],
      documents: [
        'create',
        'read',
        'update',
        'delete',
      ],
    };

    repository = UserRepositoryMock({
      findById: jest.fn()
        .mockResolvedValue(user),
    });

    input = { admin, userId: user.id, permissions };
  });

  it('should be manage user permissions', async () => {
    const spySave = jest.spyOn(repository, 'save');
    const result = await ManageUserPermissionsService(repository, input);

    expect(spySave).toHaveBeenCalled();
    expect(result.permissions).toEqual(input.permissions);
  });

  it('should be fail if admin user is not admin', async () => {
    input.admin = user;
    const exec = async () => ManageUserPermissionsService(repository, input);
    await expect(exec).rejects.toThrow();
  });

  it('should be fail if admin user is not admin', async () => {
    input.userId = input.admin.id;

    jest
      .spyOn(repository, 'findById')
      .mockResolvedValueOnce(input.admin);

    const exec = async () => ManageUserPermissionsService(repository, input);
    await expect(exec).rejects.toThrow();
  });

  it('should be fail if user is not found', async () => {
    jest
      .spyOn(repository, 'findById')
      .mockResolvedValueOnce(null);

    const exec = async () => ManageUserPermissionsService(repository, input);
    await expect(exec).rejects.toThrow();
  });

  it('should be fail if permissions is invalid', async () => {
    input.permissions.users.push('invalid-permission');
    const exec = async () => ManageUserPermissionsService(repository, input);
    await expect(exec).rejects.toThrow();
  });
});

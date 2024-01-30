import { jest } from '@jest/globals';
import CreateUserEntity from '../../../../src/modules/users/domain/create-user-entity.js';
import ReadAdminUsersPermissionsService from '../../../../src/modules/users/services/read-admin-users-permissions-service.js';
import UserRepositoryMock from '../infra/user-repository.mock.js';

describe('read-admin-users-permissions-service.spec', () => {
  let user;
  let input;
  let repository;

  beforeAll(async () => {
    const admin = await CreateUserEntity({
      isAdmin: true,
      email: 'valid@mail.com',
      password: 'BACasd312!@',
    });

    user = await CreateUserEntity({
      isAdmin: false,
      email: 'valid213@mail.com',
      password: 'BACasd312!@',
    });

    input = { user: admin };

    repository = UserRepositoryMock({
      findAll: jest.fn()
        .mockResolvedValue([user]),
    });
  });

  it('should be call findAll', async () => {
    const spyFindAll = jest.spyOn(repository, 'findAll');

    const result = await ReadAdminUsersPermissionsService(repository, input);

    expect(result.users).toHaveLength(1);
    expect(spyFindAll).toHaveBeenCalled();
    expect(result.users[0].email).toEqual(user.email);
  });

  it('should be fail if user is not admin', async () => {
    input.user = user;
    const exec = async () => ReadAdminUsersPermissionsService(repository, input);
    await expect(exec).rejects.toThrow();
  });
});

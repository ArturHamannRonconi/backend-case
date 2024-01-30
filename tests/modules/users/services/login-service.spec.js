import { jest } from '@jest/globals';

import UserRepositoryMock from '../infra/user-repository.mock.js';
import LoginService from '../../../../src/modules/users/services/login-service.js';
import CreateUserEntity from '../../../../src/modules/users/domain/create-user-entity.js';

describe('login-service.spec.spec', () => {
  let input;
  let repository;

  beforeAll(async () => {
    const user = await CreateUserEntity({
      isAdmin: true,
      email: 'valid@mail.com',
      password: 'ACSA321dsad!#@!',
    });

    repository = UserRepositoryMock({
      findByEmail: jest.fn()
        .mockResolvedValue(user),
    });

    input = {
      email: 'valid@mail.com',
      password: 'ACSA321dsad!#@!',
    };
  });

  it('should be success', async () => {
    const findByEmailSpy = jest.spyOn(repository, 'findByEmail');

    const { token } = await LoginService(repository, input);

    expect(token).toBeDefined();
    expect(findByEmailSpy).toHaveBeenCalledWith(input.email);
  });

  it('should be fail if email is invalid', async () => {
    input.email = 'invalid email';
    const exec = async () => LoginService(repository, input);
    await expect(exec).rejects.toThrow();
  });

  it('should be fail if email is incorrect', async () => {
    jest
      .spyOn(repository, 'findByEmail')
      .mockResolvedValueOnce(null);

    input.email = 'incorrect@mail.com';
    const exec = async () => LoginService(repository, input);
    await expect(exec).rejects.toThrow();
  });

  it('should be fail if password is invalid', async () => {
    input.password = 'invalid password';
    const exec = async () => LoginService(repository, input);
    await expect(exec).rejects.toThrow();
  });

  it('should be fail if password is incorrect', async () => {
    input.password = 'JDAOQWdodq3213@#!';
    const exec = async () => LoginService(repository, input);
    await expect(exec).rejects.toThrow();
  });
});

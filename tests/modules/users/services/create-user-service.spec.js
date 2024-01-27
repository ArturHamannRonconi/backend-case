import { expect, it, jest } from '@jest/globals';

import UserRepositoryMock from '../infra/user-repository.mock.js';
import CreateUserService from '../../../../src/modules/users/services/create-user-service.js';

describe('create-user-service.spec', () => {
  let input;
  let repository;

  beforeAll(() => {
    repository = UserRepositoryMock();

    input = {
      isAdmin: true,
      email: 'valid@mail.com',
      password: 'ACSA321dsad!#@!',
    };
  });

  it('should be success', async () => {
    const saveSpy = jest.spyOn(repository, 'save');
    const findByEmailSpy = jest.spyOn(repository, 'findByEmail');

    const userId = await CreateUserService(repository, input);

    expect(userId.id).toBeDefined();
    expect(saveSpy).toHaveBeenCalled();
    expect(findByEmailSpy).toHaveBeenCalledWith(input.email);
  });

  it('should be fail if user already exists', async () => {
    jest
      .spyOn(repository, 'findByEmail')
      .mockResolvedValueOnce(true);

    const exec = async () => CreateUserService(repository, input);
    await expect(exec).rejects.toThrow();
  });

  it('should be fail if email is invalid', async () => {
    input.email = 'invalid email';
    const exec = async () => CreateUserService(repository, input);
    await expect(exec).rejects.toThrow();
  });

  it('should be fail if password is invalid', async () => {
    input.password = 'invalid password';
    const exec = async () => CreateUserService(repository, input);
    await expect(exec).rejects.toThrow();
  });

  it('should be fail if isAdmin is invalid', async () => {
    input.isAdmin = 'invalid isAdmin';
    const exec = async () => CreateUserService(repository, input);
    await expect(exec).rejects.toThrow();
  });
});
import mongoose from 'mongoose';
import { jest } from '@jest/globals';

import '../../../../src/shared/config/database-connection.js';
import CreateUserEntity from '../../../../src/modules/users/domain/create-user-entity.js';
import UserModel from '../../../../src/modules/users/infra/database/user-model.js';
import UserRepository from '../../../../src/modules/users/infra/database/user-repository.js';

describe('user-repository.test', () => {
  let user;
  let repository;

  beforeAll(() => {
    repository = UserRepository();
  });

  beforeEach(async () => {
    const dto = {
      email: 'valid@mail.com',
      password: 'sdadDADSA21312@#!@',
      isAdmin: true,
    };

    user = await CreateUserEntity(dto);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should be create an new user', async () => {
    const spyCreate = jest.spyOn(UserModel, 'create');

    await repository.save(user);

    expect(spyCreate).toHaveBeenCalled();
  });

  it('should be replace one user', async () => {
    const spyReplaceOne = jest.spyOn(UserModel, 'replaceOne');

    await repository.save(user);

    user.password = 'new Password';
    await repository.save(user);

    expect(spyReplaceOne).toHaveBeenCalled();
  });

  it('should be find one user', async () => {
    const spyFindOne = jest.spyOn(UserModel, 'findOne');

    await repository.save(user);
    const userFromDb = await repository.findByEmail(user.email);

    expect(spyFindOne).toHaveBeenCalled();
    expect(userFromDb._id).toBeDefined();
  });

  it('should be find one user', async () => {
    const spyFindOne = jest.spyOn(UserModel, 'findOne');

    await repository.save(user);
    const userFromDb = await repository.findById(user.id);

    expect(spyFindOne).toHaveBeenCalled();
    expect(userFromDb._id).toBeDefined();
  });
});

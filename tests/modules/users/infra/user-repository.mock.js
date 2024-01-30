import { jest } from '@jest/globals';

function UserRepositoryMock(fns) {
  return {
    save: fns?.save ?? jest.fn(),
    findAll: fns?.findAll ?? jest.fn(),
    findById: fns?.findById ?? jest.fn(),
    findByEmail: fns?.findByEmail ?? jest.fn(),
    findManyByIds: fns?.findManyByIds ?? jest.fn(),
  };
}

export default UserRepositoryMock;

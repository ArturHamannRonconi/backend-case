import { jest } from '@jest/globals';

function UserRepositoryMock(fns) {
  return {
    save: fns?.save ?? jest.fn(),
    findById: fns?.findById ?? jest.fn(),
    findByEmail: fns?.findByEmail ?? jest.fn(),
  };
}

export default UserRepositoryMock;

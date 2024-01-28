import { jest } from '@jest/globals';

function DocumentRepositoryMock(fns) {
  return {
    save: fns?.save ?? jest.fn(),
    findByUserAccess: fns?.findByUserAccess ?? jest.fn(),
  };
}

export default DocumentRepositoryMock;

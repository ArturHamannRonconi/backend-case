import { jest } from '@jest/globals';

function DocumentRepositoryMock(fns) {
  return {
    save: fns?.save ?? jest.fn(),
  };
}

export default DocumentRepositoryMock;

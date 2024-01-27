import { jest } from '@jest/globals';

function UploadProviderMock(fns) {
  return {
    upload: fns?.save ?? jest.fn(),
    getUrl: fns?.getUrl ?? jest.fn(),
  };
}

export default UploadProviderMock;

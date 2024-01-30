import { jest } from '@jest/globals';

function UploadProviderMock(fns) {
  return {
    upload: fns?.upload ?? jest.fn(),
    update: fns?.update ?? jest.fn(),
    getUrl: fns?.getUrl ?? jest.fn(),
    softDelete: fns?.softDelete ?? jest.fn(),
    restoreDocument: fns?.restoreDocument ?? jest.fn(),
  };
}

export default UploadProviderMock;

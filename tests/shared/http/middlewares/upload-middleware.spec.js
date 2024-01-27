import UploadMiddleware from '../../../../src/shared/http/middlewares/upload-middleware.js';

describe('upload-middleware.spec', () => {
  it('should be call upload single', () => {
    const result = UploadMiddleware();
    expect(typeof result).toEqual('function');
  });
});

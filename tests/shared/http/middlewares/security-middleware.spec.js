import SecurityMiddleware from '../../../../src/shared/http/middlewares/security-middleware.js';

describe('security-middleware.spec', () => {
  it('should be call helmet', () => {
    const result = SecurityMiddleware();
    expect(typeof result).toEqual('function');
  });
});

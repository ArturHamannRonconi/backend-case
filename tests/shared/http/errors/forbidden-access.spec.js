import ForbiddenAccess from '../../../../src/shared/http/errors/forbidden-access.js';

describe('forbidden-access.spec', () => {
  it('should throw', () => {
    const fn = () => { throw ForbiddenAccess(); };
    expect(() => { fn(); }).toThrow();
  });

  it('should be message equal', () => {
    expect(ForbiddenAccess().message).toEqual('forbidden access!');
  });
});

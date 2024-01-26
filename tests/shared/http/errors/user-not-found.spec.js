import UserNotFound from '../../../../src/shared/http/errors/user-not-found.js';

describe('user-not-found.spec', () => {
  it('should throw', () => {
    const fn = () => { throw UserNotFound(); };
    expect(() => { fn(); }).toThrow();
  });

  it('should be message equal', () => {
    expect(UserNotFound().message).toEqual('user not found!');
  });
});

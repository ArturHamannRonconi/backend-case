import UserEmailAlreadyExists from '../../../../src/shared/http/errors/user-email-already-exists.js';

describe('user-email-already-exists.spec', () => {
  it('should throw', () => {
    const fn = () => { throw UserEmailAlreadyExists(); };
    expect(() => { fn(); }).toThrow();
  });

  it('should be message equal', () => {
    expect(UserEmailAlreadyExists().message).toEqual('user email already exists!');
  });
});

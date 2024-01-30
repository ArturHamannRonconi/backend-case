import InvalidPassword from '../../../../src/shared/http/errors/invalid-password.js';

describe('invalid-password.spec', () => {
  it('should throw', () => {
    const fn = () => { throw InvalidPassword(); };
    expect(() => { fn(); }).toThrow();
  });

  it('should be message equal', () => {
    expect(InvalidPassword().message).toEqual('the password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number and 1 special char');
  });
});

import PasswordValidator from '../../../../src/modules/users/domain/password-validator.js';

describe('password-validator.spec', () => {
  it('should be success', () => {
    const password = 'A378938123781rdwqihd!@#!#@!';
    const exec = () => PasswordValidator(password);

    expect(exec).not.toThrow();
  });

  it('should be fail if is not a string', () => {
    const password = 213;
    const exec = () => PasswordValidator(password);

    expect(exec).toThrow();
  });

  it('should be fail if invalid password', () => {
    const password = 'invalid password';
    const exec = () => PasswordValidator(password);

    expect(exec).toThrow();
  });
});

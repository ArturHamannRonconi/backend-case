import EmailValidator from '../../../../src/modules/users/domain/email-validator.js';

describe('email-validator.spec', () => {
  it('should be success', () => {
    const email = 'valid@mail.com';
    const exec = () => EmailValidator(email);

    expect(exec).not.toThrow();
  });

  it('should be fail if is not a string', () => {
    const email = 213;
    const exec = () => EmailValidator(email);

    expect(exec).toThrow();
  });

  it('should be fail if invalid email', () => {
    const email = 'invalid email';
    const exec = () => EmailValidator(email);

    expect(exec).toThrow();
  });
});

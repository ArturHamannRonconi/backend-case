import InvalidEmail from '../../../../src/shared/http/errors/invalid-email.js';

describe('invalid-email.spec', () => {
  it('should throw', () => {
    const fn = () => { throw InvalidEmail(); };
    expect(() => { fn(); }).toThrow();
  });

  it('should be message equal', () => {
    expect(InvalidEmail().message).toEqual('invalid email!');
  });
});

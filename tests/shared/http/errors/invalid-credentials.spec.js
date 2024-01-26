import InvalidCredentials from '../../../../src/shared/http/errors/invalid-credentials.js';

describe('invalid-credentials.spec', () => {
  it('should throw', () => {
    const fn = () => { throw InvalidCredentials(); };
    expect(() => { fn(); }).toThrow();
  });

  it('should be message equal', () => {
    expect(InvalidCredentials().message).toEqual('invalid credentials!');
  });
});

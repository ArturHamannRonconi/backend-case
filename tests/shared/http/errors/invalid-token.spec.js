import InvalidToken from '../../../../src/shared/http/errors/invalid-token.js';

describe('invalid-token.spec', () => {
  it('should throw', () => {
    const fn = () => { throw InvalidToken(); };
    expect(() => { fn(); }).toThrow();
  });

  it('should be message equal', () => {
    expect(InvalidToken().message).toEqual('invalid token!');
  });
});

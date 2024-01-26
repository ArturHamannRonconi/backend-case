import InvalidParam from '../../../../src/shared/http/errors/invalid-param.js';

describe('invalid-param.spec', () => {
  it('should throw', () => {
    const fn = () => { throw InvalidParam('param', 'string'); };
    expect(() => { fn(); }).toThrow();
  });

  it('should be message equal', () => {
    expect(InvalidParam('param', 'string').message).toEqual('invalid param param must be a string');
  });
});

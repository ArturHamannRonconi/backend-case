import InjuredFileIntegrity from '../../../../src/shared/http/errors/injured-file-integrity.js';

describe('injured-file-integrity.spec', () => {
  it('should throw', () => {
    const fn = () => { throw InjuredFileIntegrity(); };
    expect(() => { fn(); }).toThrow();
  });

  it('should be message equal', () => {
    expect(InjuredFileIntegrity().message).toEqual('injured file integrity!');
  });
});

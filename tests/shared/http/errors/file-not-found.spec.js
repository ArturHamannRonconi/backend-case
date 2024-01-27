import FileNotFound from '../../../../src/shared/http/errors/file-not-found.js';

describe('file-not-found.spec', () => {
  it('should throw', () => {
    const fn = () => { throw FileNotFound(); };
    expect(() => { fn(); }).toThrow();
  });

  it('should be message equal', () => {
    expect(FileNotFound().message).toEqual('file not found!');
  });
});

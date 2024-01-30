import UploadFail from '../../../../src/shared/http/errors/upload-fail.js';

describe('upload-fail.spec', () => {
  it('should throw', () => {
    const fn = () => { throw UploadFail(); };
    expect(() => { fn(); }).toThrow();
  });

  it('should be message equal', () => {
    expect(UploadFail().message).toEqual('upload fail!');
  });
});

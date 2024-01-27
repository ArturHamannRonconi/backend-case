import Param from '../../../src/shared/utils/param.js';

describe('param.spec', () => {
  it('should ARRAY be create array', () => {
    expect(Param.ARRAY).toEqual('array');
  });

  it('should STRING be read string', () => {
    expect(Param.STRING).toEqual('string');
  });

  it('should NUMBER be create number', () => {
    expect(Param.NUMBER).toEqual('number');
  });

  it('should OBJECT be delete object', () => {
    expect(Param.OBJECT).toEqual('object');
  });

  it('should BOOLEAN be delete boolean', () => {
    expect(Param.BOOLEAN).toEqual('boolean');
  });
});

import Param from '../../../src/shared/utils/param.js';

describe('param.spec', () => {
  it('should ARRAY be create array', () => {
    expect(Param.ARRAY).toBe('array');
  });

  it('should STRING be read string', () => {
    expect(Param.STRING).toBe('string');
  });

  it('should NUMBER be create number', () => {
    expect(Param.NUMBER).toBe('number');
  });

  it('should OBJECT be delete object', () => {
    expect(Param.OBJECT).toBe('object');
  });

  it('should BOOLEAN be delete boolean', () => {
    expect(Param.BOOLEAN).toBe('boolean');
  });
});

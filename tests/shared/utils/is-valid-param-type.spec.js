import Param from '../../../src/shared/utils/param.js';
import IsValidParamType from '../../../src/shared/utils/is-valid-param-type.js';

describe('is-valid-param-type.spec', () => {
  it('should be valid array', () => {
    const param = [1, 2, 3];
    const isValid = IsValidParamType(param, Param.ARRAY);
    expect(isValid).toBeTruthy();
  });

  it('should be valid string', () => {
    const param = 'some string';
    const isValid = IsValidParamType(param, Param.STRING);
    expect(isValid).toBeTruthy();
  });

  it('should be valid number', () => {
    const param = 123;
    const isValid = IsValidParamType(param, Param.NUMBER);
    expect(isValid).toBeTruthy();
  });

  it('should be valid object', () => {
    const param = { message: 'is object' };
    const isValid = IsValidParamType(param, Param.OBJECT);
    expect(isValid).toBeTruthy();
  });

  it('should be valid boolean', () => {
    const param = true;
    const isValid = IsValidParamType(param, Param.BOOLEAN);
    expect(isValid).toBeTruthy();
  });

  it('should be invalid array', () => {
    const param = undefined;
    const isValid = IsValidParamType(param, Param.ARRAY);
    expect(isValid).toBeFalsy();
  });

  it('should be invalid string', () => {
    const param = undefined;
    const isValid = IsValidParamType(param, Param.STRING);
    expect(isValid).toBeFalsy();
  });

  it('should be invalid number', () => {
    const param = undefined;
    const isValid = IsValidParamType(param, Param.NUMBER);
    expect(isValid).toBeFalsy();
  });

  it('should be invalid object', () => {
    const param = undefined;
    const isValid = IsValidParamType(param, Param.OBJECT);
    expect(isValid).toBeFalsy();
  });

  it('should be invalid boolean', () => {
    const param = undefined;
    const isValid = IsValidParamType(param, Param.BOOLEAN);
    expect(isValid).toBeFalsy();
  });
});

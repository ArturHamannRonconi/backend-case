function IsValidParamType(param, paramType) {
  switch (paramType) {
    case 'array': return Array.isArray(param);
    case 'string': return typeof param === 'string';
    case 'number': return typeof param === 'number';
    case 'object': return typeof param === 'object';
    case 'boolean': return typeof param === 'boolean';
    default: return false;
  }
}

export default IsValidParamType;

function InvalidParam(param, paramType) {
  return new Error(`invalid param ${param} must be a ${paramType}`);
}

export default InvalidParam;

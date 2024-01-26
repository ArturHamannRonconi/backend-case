import Param from '../../../shared/utils/param.js';
import InvalidParam from '../../../shared/http/errors/invalid-param.js';
import IsValidParamType from '../../../shared/utils/is-valid-param-type.js';
import InvalidPassword from '../../../shared/http/errors/invalid-password.js';

function PasswordValidator(password) {
  const isString = IsValidParamType(password, Param.STRING);
  if (!isString) throw InvalidParam('password', Param.STRING);

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/;
  const isValidPassword = passwordPattern.test(password);

  if (!isValidPassword) throw InvalidPassword();
}

export default PasswordValidator;

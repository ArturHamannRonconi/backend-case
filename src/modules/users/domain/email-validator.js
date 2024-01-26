import Param from '../../../shared/utils/param.js';
import InvalidParam from '../../../shared/http/errors/invalid-param.js';
import InvalidEmail from '../../../shared/http/errors/invalid-email.js';
import IsValidParamType from '../../../shared/utils/is-valid-param-type.js';

function EmailValidator(email) {
  const isString = IsValidParamType(email, Param.STRING);
  if (!isString) throw InvalidParam('email', Param.STRING);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailPattern.test(email);

  if (!isValidEmail) throw InvalidEmail();
}

export default EmailValidator;

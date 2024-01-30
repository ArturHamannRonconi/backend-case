import Param from '../../../shared/utils/param.js';
import InvalidParam from '../../../shared/http/errors/invalid-param.js';
import IsValidParamType from '../../../shared/utils/is-valid-param-type.js';

function IsAdminValidator(isAdmin) {
  const isBoolean = IsValidParamType(isAdmin, Param.BOOLEAN);
  if (!isBoolean) throw InvalidParam('isAdmin', Param.BOOLEAN);
}

export default IsAdminValidator;

import Param from '../../../shared/utils/param.js';
import Resource from '../../../shared/utils/resource.js';
import Permission from '../../../shared/utils/permission.js';
import InvalidParam from '../../../shared/http/errors/invalid-param.js';
import IsValidParamType from '../../../shared/utils/is-valid-param-type.js';

function PermissionsValidator(permissions) {
  const usersPermissions = permissions[Resource.USERS];
  const documentsPermissions = permissions[Resource.DOCUMENTS];

  const possiblePermissions = Object.values(Permission);

  const validations = [
    IsValidParamType(permissions, Param.OBJECT),
    IsValidParamType(usersPermissions, Param.ARRAY),
    IsValidParamType(documentsPermissions, Param.ARRAY),
    usersPermissions.every((permission) => IsValidParamType(permission, Param.STRING)),
    documentsPermissions.every((permission) => IsValidParamType(permission, Param.STRING)),
    usersPermissions.every((permission) => possiblePermissions.includes(permission)),
    documentsPermissions.every((permission) => possiblePermissions.includes(permission)),
  ];

  const isInvalidPermissions = validations.some((validation) => !validation);

  if (isInvalidPermissions) throw InvalidParam('permissions', Param.OBJECT);
}

export default PermissionsValidator;

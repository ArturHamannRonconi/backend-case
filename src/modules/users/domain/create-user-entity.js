import { uid } from 'uid';
import { hash } from 'bcrypt';

import EmailValidator from './email-validator.js';
import IsAdminValidator from './is-admin-validator.js';
import PasswordValidator from './password-validator.js';
import Permission from '../../../shared/utils/permission.js';

async function CreateUserEntity(dto) {
  EmailValidator(dto.email);
  IsAdminValidator(dto.isAdmin);
  PasswordValidator(dto.password);

  const passwordHashed = await hash(dto.password, 12);

  const permissions = [
    Permission.READ,
    Permission.CREATE,
    Permission.UPDATE,
  ];

  if (dto.isAdmin) permissions.push(Permission.DELETE);

  return {
    id: uid(16),
    email: dto.email,
    isAdmin: dto.isAdmin,
    password: passwordHashed,
    permissions: {
      users: permissions,
      documents: permissions,
    },
  };
}

export default CreateUserEntity;

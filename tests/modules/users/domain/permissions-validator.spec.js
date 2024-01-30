import PermissionsValidator from '../../../../src/modules/users/domain/permissions-validator.js';

describe('permissions-validator.spec', () => {
  let permissions;

  const exec = () => PermissionsValidator(permissions);

  beforeEach(() => {
    permissions = {
      documents: ['update', 'delete'],
      users: [
        'create',
        'update',
        'delete',
        'read',
      ],
    };
  });

  it('should be validate all permissions params', () => {
    expect(exec).not.toThrow();
  });

  it('should be throw', () => {
    permissions.documents[0] = 123;
    expect(exec).toThrow();
  });

  it('should be throw', () => {
    permissions.documents = 123;
    expect(exec).toThrow();
  });

  it('should be throw', () => {
    permissions = 123;
    expect(exec).toThrow();
  });
});

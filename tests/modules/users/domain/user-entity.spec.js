import Permission from '../../../../src/shared/utils/permission.js';
import CreateUserEntity from '../../../../src/modules/users/domain/user-entity.js';

describe('user-entity.spec', () => {
  let dto;

  beforeEach(() => {
    dto = {
      isAdmin: true,
      email: 'valid@mail.com',
      password: 'ABC213891dsaoihdas@!#!',
    };
  });

  it('should be create user as admin', async () => {
    const user = await CreateUserEntity(dto);

    const adminPermissions = [
      Permission.CREATE,
      Permission.READ,
      Permission.UPDATE,
      Permission.DELETE,
    ];

    expect(user.id).toBeDefined();
    expect(user.email).toEqual(dto.email);
    expect(user.password).not.toEqual(dto.password);
    expect(user.permissions).toEqual({
      users: adminPermissions,
      documents: adminPermissions,
    });
  });

  it('should be create user as not admin', async () => {
    dto.isAdmin = false;
    const user = await CreateUserEntity(dto);

    const adminPermissions = [
      Permission.CREATE,
      Permission.READ,
      Permission.UPDATE,
    ];

    expect(user.id).toBeDefined();
    expect(user.email).toEqual(dto.email);
    expect(user.password).not.toEqual(dto.password);
    expect(user.permissions).toEqual({
      users: adminPermissions,
      documents: adminPermissions,
    });
  });

  it('should be throw if email is invalid', async () => {
    dto.email = 'invalid email';
    const fn = async () => CreateUserEntity(dto);
    await expect(fn).rejects.toThrow();
  });

  it('should be throw if password is invalid', async () => {
    dto.password = 'invalid password';
    const fn = async () => CreateUserEntity(dto);
    await expect(fn).rejects.toThrow();
  });

  it('should be throw if isAdmin is invalid', async () => {
    dto.isAdmin = 'isAdmin invalid';
    const fn = async () => CreateUserEntity(dto);
    await expect(fn).rejects.toThrow();
  });
});

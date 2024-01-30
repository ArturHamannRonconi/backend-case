import Permission from '../../../src/shared/utils/permission.js';
import Resource from '../../../src/shared/utils/resource.js';
import DefineAuthorization from '../../../src/shared/utils/define-authorization.js';
import CreateUserEntity from '../../../src/modules/users/domain/create-user-entity.js';

describe('define-authorization.spec', () => {
  let dto;

  beforeAll(() => {
    dto = {
      email: 'valid@mail.com',
      password: 'CSAcsa213@!#',
    };
  });

  it('should be define a user authorization and verify if user can access with sucess', async () => {
    dto.isAdmin = true;
    const user = await CreateUserEntity(dto);

    const VerifyAuthorization = DefineAuthorization(user);
    const action = Permission.DELETE;
    const resource = Resource.DOCUMENTS;

    const canAccess = VerifyAuthorization(resource, action);
    expect(canAccess).toBeTruthy();
  });

  it('should be define a user authorization and verify if user can access with failure', async () => {
    dto.isAdmin = false;
    const user = await CreateUserEntity(dto);

    const VerifyAuthorization = DefineAuthorization(user);
    const action = Permission.DELETE;
    const resource = Resource.DOCUMENTS;

    const canAccess = VerifyAuthorization(resource, action);
    expect(canAccess).toBeFalsy();
  });
});

import Permission from '../../../../src/shared/utils/permission.js';
import CreateUserEntity from '../../../../src/modules/users/domain/create-user-entity.js';
import CreateChangeLogEntity from '../../../../src/modules/documents/domain/create-change-log-entity.js';

describe('create-change-log-entity.spec', async () => {
  it('should be create a change log', async () => {
    const user = await CreateUserEntity({
      isAdmin: true,
      email: 'valid@mail.com',
      password: 'ASDA123das!#',
    });

    const changeLog = CreateChangeLogEntity({
      user,
      action: Permission.UPDATE,
      description: 'some update',
    });

    expect(changeLog.id).toBeDefined();
  });
});

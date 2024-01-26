import IsAdminValidator from '../../../../src/modules/users/domain/is-admin-validator.js';

describe('is-admin-validator.spec', () => {
  it('should be success', () => {
    const isAdmin = true;
    const exec = () => IsAdminValidator(isAdmin);

    expect(exec).not.toThrow();
  });

  it('should be fail if is not a boolean', () => {
    const isAdmin = 213;
    const exec = () => IsAdminValidator(isAdmin);

    expect(exec).toThrow();
  });
});

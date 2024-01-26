import Permission from '../../../src/shared/utils/permission.js';

describe('permission.spec', () => {
  it('should CREATE be create permisions', () => {
    expect(Permission.CREATE).toBe('create');
  });

  it('should READ be read permisions', () => {
    expect(Permission.READ).toBe('read');
  });

  it('should CREATE be create permisions', () => {
    expect(Permission.CREATE).toBe('create');
  });

  it('should DELETE be delete permisions', () => {
    expect(Permission.DELETE).toBe('delete');
  });
});

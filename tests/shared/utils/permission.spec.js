import Permission from '../../../src/shared/utils/permission.js';

describe('permission.spec', () => {
  it('should CREATE be create permisions', () => {
    expect(Permission.CREATE).toEqual('create');
  });

  it('should READ be read permisions', () => {
    expect(Permission.READ).toEqual('read');
  });

  it('should CREATE be create permisions', () => {
    expect(Permission.CREATE).toEqual('create');
  });

  it('should DELETE be delete permisions', () => {
    expect(Permission.DELETE).toEqual('delete');
  });
});

import Resource from '../../../src/shared/utils/resource.js';

describe('resource.spec', () => {
  it('should USERS be create users', () => {
    expect(Resource.USERS).toEqual('users');
  });

  it('should DOCUMENTS be read documents', () => {
    expect(Resource.DOCUMENTS).toEqual('documents');
  });
});

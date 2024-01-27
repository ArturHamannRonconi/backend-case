import { uid } from 'uid';

import TokenGenerator from '../../../../src/modules/users/domain/token-generator.js';

describe('token-generator.spec', () => {
  let userId;

  beforeEach(() => {
    userId = uid(16);
  });

  it('should be generate access and refresh token', async () => {
    const token = await TokenGenerator(userId);
    expect(token).toBeDefined();
  });
});

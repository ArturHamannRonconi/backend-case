import { uid } from 'uid';

import TokensGenerator from '../../../../src/modules/users/domain/tokens-generator.js';

describe('tokens-generator.spec', () => {
  let userId;

  beforeEach(() => {
    userId = uid(16);
  });

  it('should be generate access and refresh token', async () => {
    const tokens = await TokensGenerator(userId);

    expect(tokens.access).toBeDefined();
    expect(tokens.refresh).toBeDefined();
  });
});

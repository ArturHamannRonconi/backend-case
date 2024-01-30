import { uid } from 'uid';
import { expect } from '@jest/globals';

import ReadUserProfileService from '../../../../src/modules/users/services/read-user-profile-service.js';

describe('read-user-profile-service.spec', () => {
  it('should be return id, email and permissions', async () => {
    const input = {
      user: {
        id: uid(16),
        email: 'valid@mail.com',
        permissions: {
          users: [
            'read',
            'create',
          ],
          documents: [
            'read',
            'create',
          ],
        },
      },
    };

    const result = await ReadUserProfileService(input);
    expect(result).toEqual(input.user);
  });
});

import { uid } from 'uid';
import { expect } from '@jest/globals';

import Notification from '../../../src/shared/utils/notification.js';
import NotificationProvider from '../../../src/shared/providers/notification-provider.js';

describe('notification-provider.test', () => {
  let provider;

  const user = {
    id: uid(16),
    email: 'vasafik431@giratex.com',
  };

  beforeAll(() => {
    provider = NotificationProvider();
  });

  it('should be sign', async () => {
    const result = await provider.sign(user);
    expect(result).toBeUndefined();
  });

  it('should be upload', async () => {
    const result = await provider.notify(user, Notification.UPLOAD);
    expect(result).toBeUndefined();
  });
});

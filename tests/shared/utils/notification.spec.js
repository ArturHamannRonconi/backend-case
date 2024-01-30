import Notification from '../../../src/shared/utils/notification.js';

describe('notification.spec', () => {
  it('should UPLOAD be create upload', () => {
    expect(Notification.UPLOAD).toEqual('upload');
  });
});

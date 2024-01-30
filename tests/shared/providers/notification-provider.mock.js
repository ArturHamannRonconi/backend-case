import { jest } from '@jest/globals';

function NotificationProviderMock(fns) {
  return {
    notify: fns?.notify ?? jest.fn(),
    sign: fns?.sign ?? jest.fn(),
  };
}

export default NotificationProviderMock;

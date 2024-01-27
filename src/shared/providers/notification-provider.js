import { Novu } from '@novu/node';

import { NOVU_API_KEY } from '../config/environment.js';

function NotificationProvider() {
  const novu = new Novu(NOVU_API_KEY);

  return {
    notify: async (user, trigger) => {
      await novu.trigger(trigger, {
        payload: {},
        to: {
          subscriberId: user.id,
          email: user.email,
          lastName: user.email.split('@')[0],
          firstName: user.email.split('@')[1],
        },
      });
    },

    sign: async (user) => {
      await novu.subscribers.identify(user.id);
    },
  };
}

export default NotificationProvider;

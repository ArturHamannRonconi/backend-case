import request from 'supertest';

import StatusCode from '../../../../../src/shared/utils/status-code.js';
import StartAppIntegration from '../../../../shared/http/start-app-integration.js';
import CloseAppIntegration from '../../../../shared/http/close-app-integration.js';

describe('manage-user-permissions-controller.test', () => {
  let app;
  let body;
  let token;
  let server;

  beforeAll(async () => {
    const integration = await StartAppIntegration();
    app = integration.app;
    token = integration.token;
    server = integration.server;

    body = {
      isAdmin: false,
      email: 'valid321412421@mail.com',
      password: 'ACSAdwas1231@#!',
    };

    const response = await request(app)
      .post('/api/v1/users')
      .send(body);

    body = {
      userId: response.body.userId,
      permissions: {
        users: ['delete', 'create'],
        documents: ['create', 'read', 'update'],
      },
    };
  });

  afterAll(async () => {
    await CloseAppIntegration(server);
  });

  it('POST /users/permissions', async () => {
    await request(app)
      .patch('/api/v1/users/permissions')
      .set('Authorization', `Bearer ${token}`)
      .send(body)
      .expect(StatusCode.OK);
  });
});

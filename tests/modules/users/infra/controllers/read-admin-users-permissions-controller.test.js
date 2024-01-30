import request from 'supertest';

import StatusCode from '../../../../../src/shared/utils/status-code.js';
import StartAppIntegration from '../../../../shared/http/start-app-integration.js';
import CloseAppIntegration from '../../../../shared/http/close-app-integration.js';

describe('read-admin-users-permissions-controller.test', () => {
  let app;
  let token;
  let server;

  beforeAll(async () => {
    const integration = await StartAppIntegration();
    app = integration.app;
    token = integration.token;
    server = integration.server;

    const body = {
      isAdmin: false,
      email: 'valid3212321@mail.com',
      password: 'ACSAdwas1231@#!',
    };

    await request(app)
      .post('/api/v1/users')
      .send(body);
  });

  afterAll(async () => {
    await CloseAppIntegration(server);
  });

  it('GET /users', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(StatusCode.OK);

    expect(response.body.users[0].id).toBeDefined();
    expect(response.body.users[0].email).toBeDefined();
    expect(response.body.users[0].password).toBeUndefined();
    expect(response.body.users[0].permissions).toBeDefined();
  });
});

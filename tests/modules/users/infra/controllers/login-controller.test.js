import request from 'supertest';

import { uid } from 'uid';

import StatusCode from '../../../../../src/shared/utils/status-code.js';
import StartAppIntegration from '../../../../shared/http/start-app-integration.js';
import CloseAppIntegration from '../../../../shared/http/close-app-integration.js';

describe('login-controller.test', () => {
  let app;
  let body;
  let server;

  beforeAll(async () => {
    const integration = await StartAppIntegration();
    app = integration.app;
    server = integration.server;

    body = {
      isAdmin: true,
      email: `valid${uid(16)}@mail.com`,
      password: 'ACSAdwas1231@#!',
    };
  });

  afterAll(async () => {
    await CloseAppIntegration(server);
  });

  it('POST /users/login', async () => {
    await request(app)
      .post('/api/v1/users')
      .send(body)
      .expect(StatusCode.CREATED);

    delete body.isAdmin;

    const response = await request(app)
      .post('/api/v1/users/login')
      .send(body)
      .expect(StatusCode.OK);

    expect(response.body.token).toBeDefined();
  });
});

import request from 'supertest';

import StatusCode from '../../../../../src/shared/utils/status-code.js';
import CloseAppIntegration from '../../../../shared/http/close-app-integration.js';
import StartAppIntegration from '../../../../shared/http/start-app-integration.js';

describe('create-user-controller.test', () => {
  let app;
  let body;
  let server;

  beforeAll(async () => {
    const integration = await StartAppIntegration();
    app = integration.app;
    server = integration.server;
  });

  afterAll(async () => {
    await CloseAppIntegration(server);
  });

  beforeEach(() => {
    body = {
      isAdmin: true,
      email: 'valid@mail.com',
      password: 'ACSAdwas1231@#!',
    };
  });

  it('POST /users', async () => {
    await request(app)
      .post('/api/v1/users')
      .send(body)
      .expect(StatusCode.CREATED);
  });
});

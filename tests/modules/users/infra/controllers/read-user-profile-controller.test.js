import request from 'supertest';

import StatusCode from '../../../../../src/shared/utils/status-code.js';
import StartAppIntegration from '../../../../shared/http/start-app-integration.js';
import CloseAppIntegration from '../../../../shared/http/close-app-integration.js';

describe('read-user-profile-controller.test', () => {
  let app;
  let token;
  let server;

  beforeAll(async () => {
    const integration = await StartAppIntegration();
    app = integration.app;
    token = integration.token;
    server = integration.server;
  });

  afterAll(async () => {
    await CloseAppIntegration(server);
  });

  it('GET /users/profile', async () => {
    const response = await request(app)
      .get('/api/v1/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(StatusCode.OK);

    expect(response.body.id).toBeDefined();
    expect(response.body.email).toBeDefined();
    expect(response.body.permissions).toBeDefined();
  });
});

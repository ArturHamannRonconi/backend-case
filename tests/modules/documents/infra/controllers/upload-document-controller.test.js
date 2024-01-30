import request from 'supertest';
import { join } from 'path';

import StatusCode from '../../../../../src/shared/utils/status-code.js';
import StartAppIntegration from '../../../../shared/http/start-app-integration.js';
import CloseAppIntegration from '../../../../shared/http/close-app-integration.js';

describe('create-user-controller.test', () => {
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

  it('POST /documents', async () => {
    const hash = '5d22e00f0fd0ca4c8c567d01b3e621679e52729c71087d190be046a67f1a6368';
    const path = join(process.cwd(), 'tests', 'modules', 'documents', 'infra', 'controllers', 'ARTUR HAMANN RONCONI.docx');

    await request(app)
      .post('/api/v1/documents')
      .set('Authorization', `Bearer ${token}`)
      .set('fileHeaderHash', hash)
      .attach('document', path)
      .expect(StatusCode.CREATED);
  });
});

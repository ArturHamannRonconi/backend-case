import request from 'supertest';

import '../../../src/shared/config/database-connection.js';
import app from '../../../src/app.js';

async function StartAppIntegration() {
  const body = {
    isAdmin: true,
    email: 'valid321@mail.com',
    password: 'ACSAdwas1231@#!',
  };

  await request(app)
    .post('/api/v1/users')
    .send(body);

  delete body.isAdmin;
  const response = await request(app)
    .post('/api/v1/users/login')
    .send(body);

  const server = app.listen(3001);
  return { server, app, token: response.body.token };
}

export default StartAppIntegration;

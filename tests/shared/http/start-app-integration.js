import '../../../src/shared/config/database-connection.js';
import app from '../../../src/app.js';

function StartAppIntegration() {
  const server = app.listen(3001);
  return server;
}

export default StartAppIntegration;

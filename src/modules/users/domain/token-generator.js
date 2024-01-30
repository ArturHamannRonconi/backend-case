import pkg from 'jsonwebtoken';

import { TOKEN_EXPIRATION, TOKEN_SECRET } from '../../../shared/config/environment.js';

async function TokenGenerator(userId) {
  const payload = { id: userId };
  const { sign } = pkg;

  const token = sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION });

  return token;
}

export default TokenGenerator;

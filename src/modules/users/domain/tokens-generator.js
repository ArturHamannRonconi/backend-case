import pkg from 'jsonwebtoken';

import {
  REFRESH_TOKEN_EXPIRATION, REFRESH_TOKEN_SECRET, TOKEN_EXPIRATION, TOKEN_SECRET,
} from '../../../shared/config/environment.js';

async function TokensGenerator(userId) {
  const payload = { id: userId };
  const { sign } = pkg;

  const access = sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION });
  const refresh = sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });

  return { access, refresh };
}

export default TokensGenerator;

import pkg from 'jsonwebtoken';

import InvalidToken from '../errors/invalid-token.js';

import { TOKEN_SECRET } from '../../config/environment.js';

async function AuthenticationMiddleware(req, _, next) {
  try {
    const authentication = req.header('Authorization');
    if (!authentication) throw InvalidToken();

    const [tokenType, token] = authentication.split(' ');

    if (tokenType !== 'Bearer') throw InvalidToken();

    const { verify } = pkg;

    const payload = verify(token, TOKEN_SECRET);

    req.userId = payload.id;

    next();
  } catch (error) {
    throw InvalidToken();
  }
}

export default AuthenticationMiddleware;

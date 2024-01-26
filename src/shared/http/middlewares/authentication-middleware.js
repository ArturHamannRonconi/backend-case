import pkg from 'jsonwebtoken';

import InvalidToken from '../errors/invalid-token.js';

import { TOKEN_SECRET } from '../../config/environment.js';

async function AuthenticationMiddleware(req, res, next) {
  try {
    const authentication = req.header('Authentication');
    if (!authentication) throw InvalidToken();

    const [tokenType, token] = authentication.split(' ');

    if (tokenType !== 'Bearer') throw InvalidToken();

    const { verify } = pkg;

    const payload = verify(token, TOKEN_SECRET);

    res.userId = payload.id;

    next();
  } catch (error) {
    throw InvalidToken();
  }
}

export default AuthenticationMiddleware;

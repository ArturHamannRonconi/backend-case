import { error } from 'console';

import { ENVIRONMENT } from '../../config/environment.js';

function ErrorMiddleware(err, _, res, next) {
  if (ENVIRONMENT !== 'test') error(err.message);

  res.status(400);
  res.json({ error: err.message });

  next();
}

export default ErrorMiddleware;

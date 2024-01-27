import { error } from 'console';

function ErrorMiddleware(err, _, res, next) {
  error(err.message);

  res.status(400);
  res.json({ error: err.message });

  next();
}

export default ErrorMiddleware;

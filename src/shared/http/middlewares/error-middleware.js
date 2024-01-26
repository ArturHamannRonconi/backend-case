function ErrorMiddleware(err, _, res, next) {
  res.status(400);
  res.json({ error: err.message });

  next();
}

export default ErrorMiddleware;

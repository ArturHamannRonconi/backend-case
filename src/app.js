import express from 'express';

import router from './shared/http/routes/router.js';
import JsonMiddleware from './shared/http/middlewares/json-middleware.js';
import ErrorMiddleware from './shared/http/middlewares/error-middleware.js';
import SecurityMiddleware from './shared/http/middlewares/security-middleware.js';

const app = express();

app.use(JsonMiddleware());
app.use(SecurityMiddleware());

app.use('/api/v1', router);
app.use(ErrorMiddleware);

export default app;

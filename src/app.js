import express from 'express';

import router from './shared/http/routes/router.js';
import ErrorMiddleware from './shared/http/middlewares/error-middleware.js';

const app = express();

app.use(express.json());
app.use('/api/v1', router);
app.use(ErrorMiddleware);

export default app;

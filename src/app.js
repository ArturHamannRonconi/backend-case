import express from 'express';

import { mainRouter } from './routes/main.js';

const app = express();

app.use('/api/v1', mainRouter);

export { app };

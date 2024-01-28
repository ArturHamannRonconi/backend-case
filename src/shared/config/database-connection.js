import mongoose from 'mongoose';

import {
  MONGO_DATABASE_NAME, MONGO_HOST, MONGO_PASSWORD, MONGO_PORT, MONGO_USER,
} from './environment.js';

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE_NAME}?authSource=admin`);

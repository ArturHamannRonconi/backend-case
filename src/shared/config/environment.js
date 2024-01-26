import { config } from 'dotenv';

config();

export const {
  PORT, MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE_NAME,
  MONGO_HOST, MONGO_PORT,
} = process.env;

import { config } from 'dotenv';

config();

export const {
  PORT,
  TOKEN_SECRET,
  TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION,
  MONGO_USER, MONGO_HOST, MONGO_PORT,
  MONGO_PASSWORD, MONGO_DATABASE_NAME,
} = process.env;
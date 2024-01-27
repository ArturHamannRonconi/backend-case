import { config } from 'dotenv';

config();

export const {
  PORT,
  AWS_REGION,
  ENVIRONMENT,
  BUCKET_NAME,
  NOVU_API_KEY,
  TOKEN_SECRET,
  TOKEN_EXPIRATION,
  AWS_SECRET_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY_ID,
  MONGO_USER, MONGO_HOST, MONGO_PORT,
  MONGO_PASSWORD, MONGO_DATABASE_NAME,
} = process.env;

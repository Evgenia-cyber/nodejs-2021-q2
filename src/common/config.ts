import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env ?? 4000;

const {
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
} = process.env;

export { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE };

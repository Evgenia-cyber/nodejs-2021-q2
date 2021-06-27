import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from './config';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const dbConfig: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  // synchronize: true,
  synchronize: false,
  logging: true,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  migrationsRun: true,
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: '/src/migrations',
  },
};

export default dbConfig;

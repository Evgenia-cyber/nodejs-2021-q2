import { ConnectionOptions } from 'typeorm';
import {
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
} from './config';
import { User } from '../entities/User';
import { Board } from '../entities/Board';
import { Task } from '../entities/Task';

const dbConfig: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST || 'postgres',
  port: Number(POSTGRES_PORT) || 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  database: POSTGRES_DB || 'postgres',
  entities: [User, Board, Task],
  synchronize: true,
};

export { dbConfig };

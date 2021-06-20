import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import {
  catchAndLogErrors,
  logInfo,
  logError,
  pageNotFound,
  serverIsRunning
} from './middlewares';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', serverIsRunning);

app.use(logInfo);

app.get('/ping', (_req, res) => res.send('pong'));

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use('/*', pageNotFound);

app.use(catchAndLogErrors);

process.on('uncaughtException', (err: Error, origin: string) => {
  logError(`Uncaught exception: ${err}. Exception origin: ${origin}`);
});

// throw Error('Oops!');

process.on('unhandledRejection', (reason, promise) => {
  logError(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

// Promise.reject(Error('Oops!'));

export default app;

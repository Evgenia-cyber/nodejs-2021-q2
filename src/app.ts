import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import { catchAndLogErrors, logInfo, logError } from './middlewares';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logInfo);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use(catchAndLogErrors);

process.on('uncaughtException', (err: string, origin: string) => {
  logError(`Caught exception: ${err}. Exception origin: ${origin}`);
});

// throw Error('Oops!');

process.on('unhandledRejection', (reason, promise) => {
  logError(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

// Promise.reject(Error('Oops!'));

export default app;

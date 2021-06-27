import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import { router as loginRouter } from './resources/login/login.router';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import {
  catchAndLogErrors,
  logInfo,
  logError,
  pageNotFound,
  serverIsRunning,
  validate,
} from './middlewares';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', serverIsRunning);

app.use(logInfo);

app.use('/login', loginRouter);
app.use(validate);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use('/*', pageNotFound);

app.use(catchAndLogErrors);

process.on('uncaughtException', (err: Error, origin: string) => {
  logError(`Uncaught exception: ${err}. Exception origin: ${origin}`);
});

/*
// Test for uncaughtException
setTimeout(()=>{
  throw new Error ('ooooops')
}, 2000);
*/

process.on('unhandledRejection', (reason, promise) => {
  logError(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

/*
 // Test for unhandledRejection
setTimeout(() => {
  Promise.reject(new Error('Oops!'))
}, 1500);
*/

export default app;

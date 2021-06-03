import express, { Request, Response } from 'express';
import { User } from './user.model';
import { usersService } from './user.service';
import { tasksService } from '../tasks/task.service';
import { StatusCode, Messages } from '../../common/statusCodes';

const router = express.Router();

/** get all users */
router.route('/').get(async (_req: Request, res: Response) => {
  const users = await usersService.getAll();
  await res.status(StatusCode.OK).json(users.map(User.toResponse));
});

/** create user */
router.route('/').post(async (req, res) => {
  const { body } = req;
  const { name, login, password } = body;
  if (!name || !login || !password) {
    await res
      .status(StatusCode.BAD_REQUEST)
      .json({ error: Messages.BAD_REQUEST });
  }
  const newUser = await usersService.create(body);
  await res.status(StatusCode.CREATED).json(User.toResponse(newUser));
});

/** get user by id */
router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);
  if (user) {
    await res.status(StatusCode.OK).json(User.toResponse(user));
  } else {
    await res.status(StatusCode.NOT_FOUND).json({ error: Messages.NOT_FOUND });
  }
});

/** update user */
router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { name, login, password } = body;
  if (!name || !login || !password) {
    await res
      .status(StatusCode.BAD_REQUEST)
      .json({ error: Messages.BAD_REQUEST });
  }
  const user = await usersService.update(id, body);
  if (user) {
    await res.status(StatusCode.OK).json(User.toResponse(user));
  } else {
    await res.status(StatusCode.NOT_FOUND).json({ error: Messages.NOT_FOUND });
  }
});

/** delete user */
router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const isTasksUpdated = await tasksService.updateTasksWhenUserDeleted(id);
  const isUserDeleted = await usersService.del(id);
  if (isTasksUpdated && isUserDeleted) {
    await res.status(StatusCode.DELETED).json();
  } else {
    await res.status(StatusCode.NOT_FOUND).json({ error: Messages.NOT_FOUND });
  }
});

export { router };

import express, { Request, Response } from 'express';
import { wrapper, CustomError } from '../../middlewares';
import { User } from './user.model';
import { usersService } from './user.service';
import { tasksService } from '../tasks/task.service';
import { StatusCode, Messages } from '../../types/statusCodes';
import { IRequestParamsUser } from './user.types';

const router = express.Router();

/** get all users */
router.route('/').get(
  wrapper(async (_req: Request, res: Response) => {
    const users = await usersService.getAll();
    await res.status(StatusCode.OK).json(users.map(User.toResponse));
  })
);

/** create user */
router.route('/').post(
  wrapper(async (req: Request, res: Response) => {
    const { body } = req;
    const { name, login, password } = body;
    if (!name || !login || !password) {
      throw new CustomError(StatusCode.BAD_REQUEST, Messages.BAD_REQUEST);
    }
    const newUser = await usersService.create(body);
    await res.status(StatusCode.CREATED).json(User.toResponse(newUser));
  })
);

/** get user by id */
router.route('/:userId').get(
  wrapper(async (req: Request<IRequestParamsUser>, res: Response) => {
    const { userId } = req.params;
    const user = await usersService.getById(userId);
    if (user) {
      await res.status(StatusCode.OK).json(User.toResponse(user));
    } else {
      throw new CustomError(
        StatusCode.NOT_FOUND,
        `User with id ${userId} ${Messages.NOT_FOUND}`
      );
    }
  })
);

/** update user */
router.route('/:userId').put(
  wrapper(async (req: Request<IRequestParamsUser>, res: Response) => {
    const { userId } = req.params;
    const { body } = req;
    const { name, login, password } = body;
    if (!name || !login || !password) {
      throw new CustomError(StatusCode.BAD_REQUEST, Messages.BAD_REQUEST);
    }
    const user = await usersService.update(userId, body);
    if (user) {
      await res.status(StatusCode.OK).json(User.toResponse(user));
    } else {
      throw new CustomError(
        StatusCode.NOT_FOUND,
        `User with id ${userId} ${Messages.NOT_FOUND}`
      );
    }
  })
);

/** delete user */
router.route('/:userId').delete(
  wrapper(async (req: Request<IRequestParamsUser>, res: Response) => {
    const { userId } = req.params;
    const isTasksUpdated = await tasksService.updateTasksWhenUserDeleted(
      userId
    );
    const isUserDeleted = await usersService.del(userId);
    if (isTasksUpdated && isUserDeleted) {
      await res.status(StatusCode.DELETED).json();
    } else {
      throw new CustomError(
        StatusCode.NOT_FOUND,
        `User with id ${userId} ${Messages.NOT_FOUND}`
      );
    }
  })
);

export { router };

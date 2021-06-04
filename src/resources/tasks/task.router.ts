import express, { Request, Response } from 'express';
import { IRequestParamsTask } from './task.types';
import { tasksService } from './task.service';
import { StatusCode, Messages } from '../../types/statusCodes';
import { CustomError, wrapper } from '../../middlewares';

const router = express.Router({ mergeParams: true });

router.route('/').get(
  wrapper(async (_req: Request, res: Response) => {
    const tasks = await tasksService.getAll();
    await res.status(StatusCode.OK).json(tasks);
  })
);

router.route('/').post(
  wrapper(async (req: Request<IRequestParamsTask>, res: Response) => {
    const { body } = req;
    const { boardId } = req.params;
    const { title, description } = body;
    if (!title || !description) {
      throw new CustomError(StatusCode.BAD_REQUEST, Messages.BAD_REQUEST);
    }
    const newTask = await tasksService.create(boardId, body);
    await res.status(StatusCode.CREATED).json(newTask);
  })
);

router.route('/:taskId').get(
  wrapper(async (req: Request<IRequestParamsTask>, res: Response) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.getById(boardId, taskId);
    if (task) {
      await res.status(StatusCode.OK).json(task);
    } else {
      throw new CustomError(
        StatusCode.NOT_FOUND,
        `Task with id ${taskId} for board with id ${boardId} ${Messages.NOT_FOUND}`
      );
    }
  })
);

router.route('/:taskId').put(
  wrapper(async (req: Request<IRequestParamsTask>, res: Response) => {
    const { boardId, taskId } = req.params;
    const { body } = req;
    const { title, description } = body;
    if (!title || !description) {
      throw new CustomError(StatusCode.BAD_REQUEST, Messages.BAD_REQUEST);
    }
    const task = await tasksService.update(boardId, taskId, body);
    if (task) {
      await res.status(StatusCode.OK).json(task);
    } else {
      throw new CustomError(
        StatusCode.NOT_FOUND,
        `Task with id ${taskId} for board with id ${boardId} ${Messages.NOT_FOUND}`
      );
    }
  })
);

router.route('/:taskId').delete(
  wrapper(async (req: Request<IRequestParamsTask>, res: Response) => {
    const { boardId, taskId } = req.params;
    const isDeleted = await tasksService.del(boardId, taskId);
    if (isDeleted) {
      await res.status(StatusCode.DELETED).json();
    } else {
      throw new CustomError(
        StatusCode.NOT_FOUND,
        `Task with id ${taskId} for board with id ${boardId} ${Messages.NOT_FOUND}`
      );
    }
  })
);

export { router };

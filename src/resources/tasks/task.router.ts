import express, { Request } from 'express';
import { tasksService } from './task.service';
import { StatusCode, Messages } from '../../common/statusCodes';

interface IRequestParams {
  boardId: string;
  taskId: string;
}

const router = express.Router({ mergeParams: true });

router.route('/').get(async (_req, res) => {
  const tasks = await tasksService.getAll();
  await res.status(StatusCode.OK).json(tasks);
});

router.route('/').post(async (req: Request<IRequestParams>, res) => {
  const { body } = req;
  const { boardId } = req.params;
  const { title, description } = body;
  if (!title || !description) {
    await res
      .status(StatusCode.BAD_REQUEST)
      .json({ error: Messages.BAD_REQUEST });
  }
  const newTask = await tasksService.create(boardId, body);
  await res.status(StatusCode.CREATED).json(newTask);
});

router.route('/:taskId').get(async (req: Request<IRequestParams>, res) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.getById(boardId, taskId);
  if (task) {
    await res.status(StatusCode.OK).json(task);
  } else {
    await res.status(StatusCode.NOT_FOUND).json({ error: Messages.NOT_FOUND });
  }
});

router.route('/:taskId').put(async (req: Request<IRequestParams>, res) => {
  const { boardId, taskId } = req.params;
  const { body } = req;
  const { title, description } = body;
  if (!title || !description) {
    await res
      .status(StatusCode.BAD_REQUEST)
      .json({ error: Messages.BAD_REQUEST });
  }
  const task = await tasksService.update(boardId, taskId, body);
  if (task) {
    await res.status(StatusCode.OK).json(task);
  } else {
    await res.status(StatusCode.NOT_FOUND).json({ error: Messages.NOT_FOUND });
  }
});

router.route('/:taskId').delete(async (req: Request<IRequestParams>, res) => {
  const { boardId, taskId } = req.params;
  const isDeleted = await tasksService.del(boardId, taskId);
  if (isDeleted) {
    await res.status(StatusCode.DELETED).json();
  } else {
    await res.status(StatusCode.NOT_FOUND).json({ error: Messages.NOT_FOUND });
  }
});

export { router };

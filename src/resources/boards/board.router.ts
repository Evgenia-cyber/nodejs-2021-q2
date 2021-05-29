import express from 'express';
import { boardsService } from './board.service';
import { tasksService } from '../tasks/task.service';
import { StatusCode, Messages } from '../../common/statusCodes';

const router = express.Router();

router.route('/').get(async (_req, res) => {
  const boards = await boardsService.getAll();
  await res.status(StatusCode.OK).json(boards);
});

router.route('/').post(async (req, res) => {
  const { body } = req;
  const { title, columns } = body;
  if (!title || !columns) {
    await res
      .status(StatusCode.BAD_REQUEST)
      .json({ error: Messages.BAD_REQUEST });
  }
  const newBoard = await boardsService.create(body);
  await res.status(StatusCode.CREATED).json(newBoard);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getById(id);
  if (board) {
    await res.status(StatusCode.OK).json(board);
  } else {
    await res.status(StatusCode.NOT_FOUND).json({ error: Messages.NOT_FOUND });
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { title, columns } = body;
  if (!title || !columns) {
    await res
      .status(StatusCode.BAD_REQUEST)
      .json({ error: Messages.BAD_REQUEST });
  }
  const board = await boardsService.update(id, body);
  if (board) {
    await res.status(StatusCode.OK).json(board);
  } else {
    await res.status(StatusCode.NOT_FOUND).json({ error: Messages.NOT_FOUND });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const isTasksDeleted = await tasksService.deleteTasksWhenBoardDeleted(id);
  const isBoardDeleted = await boardsService.del(id);
  if (isTasksDeleted && isBoardDeleted) {
    await res.status(StatusCode.DELETED).json();
  } else {
    await res.status(StatusCode.NOT_FOUND).json({ error: Messages.NOT_FOUND });
  }
});

export { router };

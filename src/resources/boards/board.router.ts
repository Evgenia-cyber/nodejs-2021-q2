import express from 'express';
import { boardsService } from './board.service';
import { tasksService } from '../tasks/task.service';
import { StatusCode, Messages } from '../../types/statusCodes';

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

router.route('/:boardId').get(async (req, res) => {
  const { boardId } = req.params;
  const board = await boardsService.getById(boardId);
  if (board) {
    await res.status(StatusCode.OK).json(board);
  } else {
    await res.status(StatusCode.NOT_FOUND).json({ error: Messages.NOT_FOUND });
  }
});

router.route('/:boardId').put(async (req, res) => {
  const { boardId } = req.params;
  const { body } = req;
  const { title, columns } = body;
  if (!title || !columns) {
    await res
      .status(StatusCode.BAD_REQUEST)
      .json({ error: Messages.BAD_REQUEST });
  }
  const board = await boardsService.update(boardId, body);
  if (board) {
    await res.status(StatusCode.OK).json(board);
  } else {
    await res.status(StatusCode.NOT_FOUND).json({ error: Messages.NOT_FOUND });
  }
});

router.route('/:boardId').delete(async (req, res) => {
  const { boardId } = req.params;
  const isTasksDeleted = await tasksService.deleteTasksWhenBoardDeleted(
    boardId
  );
  const isBoardDeleted = await boardsService.del(boardId);
  if (isTasksDeleted && isBoardDeleted) {
    await res.status(StatusCode.DELETED).json();
  } else {
    await res.status(StatusCode.NOT_FOUND).json({ error: Messages.NOT_FOUND });
  }
});

export { router };

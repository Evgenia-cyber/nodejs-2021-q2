import express, { Request, Response } from 'express';
import { boardsService } from './board.service';
import { tasksService } from '../tasks/task.service';
import { StatusCode, Messages } from '../../types/statusCodes';
import { CustomError, wrapper } from '../../middlewares';

const router = express.Router();

router.route('/').get(
  wrapper(async (_req: Request, res: Response) => {
    const boards = await boardsService.getAll();
    await res.status(StatusCode.OK).json(boards);
  })
);

router.route('/').post(
  wrapper(async (req: Request, res: Response) => {
    const { body } = req;
    const { title, columns } = body;
    if (!title || !columns) {
      throw new CustomError(StatusCode.BAD_REQUEST, Messages.BAD_REQUEST);
    }
    const newBoard = await boardsService.create(body);
    await res.status(StatusCode.CREATED).json(newBoard);
  })
);

router.route('/:boardId').get(
  wrapper(async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const board = await boardsService.getById(boardId);
    if (board) {
      await res.status(StatusCode.OK).json(board);
    } else {
      throw new CustomError(
        StatusCode.NOT_FOUND,
        `Board with id ${boardId} ${Messages.NOT_FOUND}`
      );
    }
  })
);

router.route('/:boardId').put(
  wrapper(async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const { body } = req;
    const { title, columns } = body;
    if (!title || !columns) {
      throw new CustomError(StatusCode.BAD_REQUEST, Messages.BAD_REQUEST);
    }
    const board = await boardsService.update(boardId, body);
    if (board) {
      await res.status(StatusCode.OK).json(board);
    } else {
      throw new CustomError(
        StatusCode.NOT_FOUND,
        `Board with id ${boardId} ${Messages.NOT_FOUND}`
      );
    }
  })
);

router.route('/:boardId').delete(
  wrapper(async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const isTasksDeleted = await tasksService.deleteTasksWhenBoardDeleted(
      boardId
    );
    const isBoardDeleted = await boardsService.del(boardId);
    if (isTasksDeleted && isBoardDeleted) {
      await res.status(StatusCode.DELETED).json();
    } else {
      throw new CustomError(
        StatusCode.NOT_FOUND,
        `Board with id ${boardId} ${Messages.NOT_FOUND}`
      );
    }
  })
);

export { router };

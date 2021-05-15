const router = require('express').Router();
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  await res.status(200).json(boards);
});

router.route('/').post(async (req, res) => {
  const { body } = req;
  const newBoard = await boardsService.create(body);
  if (newBoard) {
    await res.status(201).json(newBoard);
  } else {
    await res.status(400).json({ error: 'Bad request' });
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getById(id);
  if (board) {
    await res.status(200).json(board);
  } else {
    await res.status(404).json({ error: 'Board not found' });
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const board = await boardsService.update(id, body);
  if (board) {
    await res.status(200).json(board);
  } else {
    await res.status(400).json({ error: 'Bad request' });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const isTasksDeleted = await tasksService.deleteTasksWhenBoardDeleted(id);
  const isBoardDeleted = await boardsService.del(id);
  if (isTasksDeleted && isBoardDeleted) {
    await res.status(204).json();
  } else {
    await res.status(404).json({ error: 'Board not found' });
  }
});

module.exports = router;

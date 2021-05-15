const router = require('express').Router();
const tasksService = require('./task.service');

// router.route('/').get(async (req, res) => {
router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  await res.status(200).json(tasks);
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { body } = req;
  const { boardId } = req.params;
  const newTask = await tasksService.create(boardId, body);
  if (newTask) {
    await res.status(201).json(newTask);
  } else {
    await res.status(400).json({ error: 'Bad request' });
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.getById(boardId, taskId);
  if (task) {
    await res.status(200).json(task);
  } else {
    await res.status(404).json({ error: 'Task not found' });
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { boardId, taskId } = req.params;
  const { body } = req;
  const task = await tasksService.update(boardId, taskId, body);
  if (task) {
    await res.status(200).json(task);
  } else {
    await res.status(400).json({ error: 'Bad request' });
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;
  const isDeleted = await tasksService.del(boardId, taskId);
  if (isDeleted) {
    await res.status(204).json();
  } else {
    await res.status(404).json({ error: 'Task not found' });
  }
});

module.exports = router;

const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  await res.status(200).json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const { body } = req;
  const newUser = await usersService.create(body);
  if (newUser) {
    // exclude secret fields like "password"
    await res.status(201).json(User.toResponse(newUser));
  } else {
    await res.status(400).json({ error: 'Bad request' });
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);
  if (user) {
    // exclude secret fields like "password"
    await res
      .status(200)
      // .json({ message: `Successful operation`, body: User.toResponse(user) });
      .json(User.toResponse(user));
  } else {
    await res.status(404).json({ error: 'User not found' });
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const user = await usersService.update(id, body);
  if (user) {
    // exclude secret fields like "password"
    await res.status(200).json(User.toResponse(user));
  } else {
    await res.status(400).json({ error: 'Bad request' });
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await tasksService.updateTasksWhenUserDeleted(id);
  const isDeleted = await usersService.del(id);
  if (isDeleted) {
    await res.status(204).json();
  } else {
    await res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;

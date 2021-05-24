const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const create = (boardId, body) => tasksRepo.create(boardId, body);
const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);
const update = (boardId, taskId, body) =>
  tasksRepo.update(boardId, taskId, body);
const del = (boardId, taskId) => tasksRepo.del(boardId, taskId);
const deleteTasksWhenBoardDeleted = (boardId) =>
  tasksRepo.deleteTasksWhenBoardDeleted(boardId);
const updateTasksWhenUserDeleted = (taskId) =>
  tasksRepo.updateTasksWhenUserDeleted(taskId);

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  deleteTasksWhenBoardDeleted,
  updateTasksWhenUserDeleted,
};

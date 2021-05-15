let { TASKS: tasks } = require('../data/data.js');
const Task = require('./task.model.js');

const getAll = async () => tasks;

const create = async (boardId, body) => {
  const { title, order, description, userId, columnId } = body;
  if (!title || !description) {
    return null;
  }
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  tasks.push(newTask);
  return newTask;
};

const getById = async (boardId, taskId) =>
  tasks.find((task) => task.boardId === boardId && task.id === taskId);

const update = async (boardId, taskId, body) => {
  const { title, order, description, userId, columnId } = body;
  if (!title || !description) {
    return null;
  }
  const index = tasks.findIndex(
    (task) => task.boardId === boardId && task.id === taskId
  );
  if (index < 0) {
    return null;
  }
  tasks[index] = {
    id: tasks[index].id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  };
  return tasks[index];
};

const del = async (boardId, taskId) => {
  const index = tasks.findIndex(
    (task) => task.boardId === boardId && task.id === taskId
  );
  if (index < 0) {
    return null;
  }
  tasks.splice(index, 1);
  return true;
};

const deleteTasksWhenBoardDeleted = async (boardId) => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
};

const updateTasksWhenUserDeleted = async (userId) => {
  // tasks.forEach((task) => {
  //   if (task.userId === userId) {
  //     // eslint-disable-next-line no-param-reassign
  //     task.userId = null;
  //   }
  // });
  tasks = tasks.map((task) => {
    // const copyTask = { ...task };
    const copyTask = task;
    if (copyTask.userId === userId) {
      copyTask.userId = null;
    }
    return copyTask;
  });
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  del,
  deleteTasksWhenBoardDeleted,
  updateTasksWhenUserDeleted,
};

/**
 * @module taskRepository
 */

/**
 * A task's data from request body
 * @typedef {Object} TaskDataFromRequestBody
 * @param {string} task.title - The task's title.
 * @param {number} task.order - The task's order.
 * @param {string} task.description - The task's description.
 * @param {string|null} task.userId - The task's user id.
 */

let { TASKS: tasks } = require('../data/data.js');
const Task = require('./task.model.js');

/**
 * Get all tasks
 * @returns {Promise<Task[]>} Promise object represents an array of all tasks or an empty array
 */
const getAll = async () => tasks;

/**
 * Create new task
 * @param {string} boardId - The board's id - ID of the board this task belongs to
 * @param {TaskDataFromRequestBody} body - Information about the task
 * @returns {Promise<Task|null>} Promise object represents new task or null
 */
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

/**
 * Get task by board's and task's ids
 * @param {string} boardId - The board's id - ID of the board this task belongs to
 * @param {string} taskId - The task's id
 * @returns {Promise<Task|undefined>} Promise object represents task or undefined
 */
const getById = async (boardId, taskId) =>
  tasks.find((task) => task.boardId === boardId && task.id === taskId);

/**
 * Update task by board's and task's ids
 * @param {string} boardId - The board's id - ID of the board this task belongs to
 * @param {string} taskId - The task's id
 * @param {TaskDataFromRequestBody} body - New information about the task
 * @returns {Promise<Task|null>} Promise object represents updated task or null
 */
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

/**
 * Delete task by board's and task's ids
 * @param {string} boardId - The board's id - ID of the board this task belongs to
 * @param {string} taskId - The task's id
 * @returns {Promise<null|true>} Promise object represents null or true
 */
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

/**
 * Delete tasks by board's id, when this board deleted
 * @param {string} boardId - The board's id - ID of the board this tasks belongs to
 * @returns {Promise<true>} Promise object represents true
 */
const deleteTasksWhenBoardDeleted = async (boardId) => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
  return true;
};

/**
 * Update tasks by user's id - when this user deleted, all his tasks would be updated to put userId = null
 * @param {string} userId - The user's id - ID of the user this tasks belongs to
 * @returns {Promise<true>} Promise object represents true
 */
const updateTasksWhenUserDeleted = async (userId) => {
  tasks = tasks.map((task) => {
    const copyTask = task;
    if (copyTask.userId === userId) {
      copyTask.userId = null;
    }
    return copyTask;
  });
  return true;
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

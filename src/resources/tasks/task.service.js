/**
 * @module taskService
 */

/**
 * A task's data from request body
 * @typedef {Object} TaskDataFromRequestBody
 * @param {string} task.title - The task's title.
 * @param {number} task.order - The task's order.
 * @param {string} task.description - The task's description.
 * @param {string|null} task.userId - The task's user id.
 */

const tasksRepo = require('./task.memory.repository');

/**
 * Get all tasks
 * @returns {function(): Promise<Task[]>} - Returns a function that returns a Promise object that is an array of all tasks or an empty array
 */
const getAll = () => tasksRepo.getAll();

/**
 * Create new task
 * @param {TaskDataFromRequestBody} body - A task's data from request body
 * @returns {function(): Promise<Taks|null>} - Returns a function that returns a Promise object that is a new task or null
 */
const create = (boardId, body) => tasksRepo.create(boardId, body);

/**
 *  Get task by board's and task's ids
 * @param {string} boardId - The board's id - ID of the board this task belongs to
 * @param {string} taskId - The task's id
 * @returns {function(): Promise<Task|undefined>} - Returns a function that returns a Promise object that is a task or undefined
 */
const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

/**
 * Update task by board's and task's ids
 * @param {string} boardId - The board's id - ID of the board this task belongs to
 * @param {string} taskId - The task's id
 * @param {TaskDataFromRequestBody} body - New task's data from request body
 * @returns {function(): Promise<Task|null>} - Returns a function that returns a Promise object that is a updated task or null
 */
const update = (boardId, taskId, body) =>
  tasksRepo.update(boardId, taskId, body);

/**
 * Delete task by board's and task's ids
 * @param {string} boardId - The board's id - ID of the board this task belongs to
 * @param {string} taskId - The task's id
 * @returns {function(): Promise<null|true>} Returns a function that returns a Promise object that is null or true
 */
const del = (boardId, taskId) => tasksRepo.del(boardId, taskId);

/**
 * Delete tasks by board's id, when this board deleted
 * @param {string} boardId - The board's id - ID of the board this tasks belongs to
 * @returns {function():Promise<true>} Returns a function that returns a Promise object that is true
 */
const deleteTasksWhenBoardDeleted = (boardId) =>
  tasksRepo.deleteTasksWhenBoardDeleted(boardId);

/**
 * Update tasks by user's id - when this user deleted, all his tasks would be updated to put userId = null
 * @param {string} userId - The user's id - ID of the user this tasks belongs to
 * @returns {function():Promise<true>} Returns a function that returns a Promise object that is true
 */
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

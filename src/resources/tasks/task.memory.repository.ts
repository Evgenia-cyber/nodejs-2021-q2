import { TASKS } from '../data/data';
import { Task } from './task.model';
import { ITaskDataFromRequestBody } from './task.types';

/**
 * @module taskRepository
 */

/**
 * A task's data from request body
 * @typedef {Object} TaskDataFromRequestBody
 * @property {string} task.title - The task's title.
 * @property {number} task.order - The task's order.
 * @property {string} task.description - The task's description.
 * @property {string|null} task.userId - The task's user id.
 * @property {string|null} task.columnId - The task's column id.
 */

let tasks = TASKS;

/**
 * Get all tasks
 * @returns {Promise<Task[]>} Promise object represents an array of all tasks or an empty array
 */
const getAll = async () => tasks;

/**
 * Create new task
 * @param {string} boardId - The board's id - ID of the board this task belongs to
 * @param {TaskDataFromRequestBody} body - Information about the task
 * @returns {Promise<Task>} Promise object represents new task
 */
const create = async (boardId: string, body: ITaskDataFromRequestBody) => {
  const { title, order, description, userId, columnId } = body;
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
const getById = async (boardId: string, taskId: string) =>
  tasks.find((task) => task.boardId === boardId && task.id === taskId);

/**
 * Update task by board's and task's ids
 * @param {string} boardId - The board's id - ID of the board this task belongs to
 * @param {string} taskId - The task's id
 * @param {TaskDataFromRequestBody} body - New information about the task
 * @returns {Promise<Task|undefined>} Promise object represents updated task or undefined
 */
const update = async (
  boardId: string,
  taskId: string,
  body: ITaskDataFromRequestBody
) => {
  const { title, order, description, userId, columnId } = body;
  const index = tasks.findIndex(
    (task) => task.boardId === boardId && task.id === taskId
  );
  if (index !== -1) {
    let task = tasks[index];
    if (task && task.id) {
      task = { ...task, title, order, description, userId, boardId, columnId };
      tasks.splice(index, 1, task);
      return task;
    }
  }
  return undefined;
};

/**
 * Delete task by board's and task's ids
 * @param {string} boardId - The board's id - ID of the board this task belongs to
 * @param {string} taskId - The task's id
 * @returns {Promise<null|true>} Promise object represents null or true
 */
const del = async (boardId: string, taskId: string) => {
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
const deleteTasksWhenBoardDeleted = async (boardId: string) => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
  return true;
};

/**
 * Update tasks by user's id - when this user deleted, all his tasks would be updated to put userId = null
 * @param {string} userId - The user's id - ID of the user this tasks belongs to
 * @returns {Promise<true>} Promise object represents true
 */
const updateTasksWhenUserDeleted = async (userId: string) => {
  tasks = tasks.map((task) => {
    const copyTask = task;
    if (copyTask.userId === userId) {
      copyTask.userId = null;
    }
    return copyTask;
  });
  return true;
};

export {
  getAll,
  create,
  getById,
  update,
  del,
  deleteTasksWhenBoardDeleted,
  updateTasksWhenUserDeleted,
};

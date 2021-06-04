import { TASKS } from '../data/data';
import { Task } from './task.model';
import { ITask, ITaskDataFromRequestBody } from './task.types';

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
const getAll = async (): Promise<ITask[] | []> => tasks;

/**
 * Create new task
 * @param {string} boardId - The board's id - ID of the board this task belongs to
 * @param {TaskDataFromRequestBody} body - Information about the task
 * @returns {Promise<Task>} Promise object represents new task
 */
const create = async (
  boardId: string,
  body: ITaskDataFromRequestBody
): Promise<ITask> => {
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
 * @returns {Promise<Task|null>} Promise object represents task or null
 */
const getById = async (
  boardId: string,
  taskId: string
): Promise<ITask | null> => {
  const taskById = tasks.find(
    (task) => task.boardId === boardId && task.id === taskId
  );
  if (!taskById) return null;
  return taskById;
};

/**
 * Update task by board's and task's ids
 * @param {string} boardId - The board's id - ID of the board this task belongs to
 * @param {string} taskId - The task's id
 * @param {TaskDataFromRequestBody} body - New information about the task
 * @returns {Promise<Task|null>} Promise object represents updated task or null
 */
const update = async (
  boardId: string,
  taskId: string,
  body: ITaskDataFromRequestBody
): Promise<ITask | null> => {
  const { title, order, description, userId, columnId } = body;
  const index = tasks.findIndex(
    (task) => task.boardId === boardId && task.id === taskId
  );
  if (index !== -1) {
    let updatedTask = tasks[index];
    if (updatedTask && updatedTask.id) {
      updatedTask = {
        ...updatedTask,
        title,
        order,
        description,
        userId,
        boardId,
        columnId,
      };
      tasks[index] = updatedTask;
      return updatedTask;
    }
  }
  return null;
};

/**
 * Delete task by board's and task's ids
 * @param {string} boardId - The board's id - ID of the board this task belongs to
 * @param {string} taskId - The task's id
 * @returns {Promise<null|true>} Promise object represents null or true
 */
const del = async (boardId: string, taskId: string): Promise<null | true> => {
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
const deleteTasksWhenBoardDeleted = async (boardId: string): Promise<true> => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
  return true;
};

/**
 * Update tasks by user's id - when this user deleted, all his tasks would be updated to put userId = null
 * @param {string|undefined} userId - The user's id - ID of the user this tasks belongs to
 * @returns {Promise<true>} Promise object represents true
 */
const updateTasksWhenUserDeleted = async (
  userId: string | undefined
): Promise<true> => {
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

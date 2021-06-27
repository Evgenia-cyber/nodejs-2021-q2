import {
  getAll as getAllTasks,
  create as createTask,
  getById as getTaskById,
  update as updateTask,
  del as delTask,
  deleteTasksWhenBoardDeleted as deleteTasks,
  updateTasksWhenUserDeleted as updateTasks,
} from './task.memory.repository';
import { ITask, ITaskDataFromRequestBody } from './task.types';

/**
 * @module taskService
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

/**
 * Get all tasks
 * @returns { Promise<Task[]>} - Returns a Promise object that is an array of all tasks or an empty array
 */
const getAll = (): Promise<ITask[] | []> => getAllTasks();

/**
 * Create new task
 * @param {TaskDataFromRequestBody} body - A task's data from request body
 * @returns { Promise<Taks>} - Returns a Promise object that is a new task
 */
const create = (
  boardId: string | undefined,
  body: ITaskDataFromRequestBody
): Promise<ITask> => createTask(boardId, body);

/**
 *  Get task by board's and task's ids
 * @param {string|undefined} boardId - The board's id - ID of the board this task belongs to
 * @param {string|undefined} taskId - The task's id
 * @returns { Promise<Task|null>} - Returns a Promise object that is a task or null
 */
const getById = (
  boardId: string | undefined,
  taskId: string | undefined
): Promise<ITask | null> => getTaskById(boardId, taskId);

/**
 * Update task by board's and task's ids
 * @param {string|undefined} boardId - The board's id - ID of the board this task belongs to
 * @param {string|undefined} taskId - The task's id
 * @param {TaskDataFromRequestBody} body - New task's data from request body
 * @returns { Promise<Task|undefined>} - Returns a Promise object that is a updated task or undefined
 */
const update = (
  boardId: string | undefined,
  taskId: string | undefined,
  body: ITaskDataFromRequestBody
): Promise<ITask | null> => updateTask(boardId, taskId, body);

/**
 * Delete task by board's and task's ids
 * @param {string|undefined} boardId - The board's id - ID of the board this task belongs to
 * @param {string|undefined} taskId - The task's id
 * @returns { Promise<null|true>} Returns a Promise object that is null or true
 */
const del = (
  boardId: string | undefined,
  taskId: string | undefined
): Promise<null | true> => delTask(boardId, taskId);

/**
 * Delete tasks by board's id, when this board deleted
 * @param {string|undefined} boardId - The board's id - ID of the board this tasks belongs to
 * @returns {Promise<true>} Returns a Promise object that is true
 */
const deleteTasksWhenBoardDeleted = (
  boardId: string | undefined
): Promise<true> => deleteTasks(boardId);

/**
 * Update tasks by user's id - when this user deleted, all his tasks would be updated to put userId = null
 * @param {string|undefined} userId - The user's id - ID of the user this tasks belongs to
 * @returns {Promise<true|null>} Returns a Promise object that is true
 */
const updateTasksWhenUserDeleted = (
  taskId: string | undefined
): Promise<true | null> => updateTasks(taskId);

export const tasksService = {
  getAll,
  getById,
  create,
  update,
  del,
  deleteTasksWhenBoardDeleted,
  updateTasksWhenUserDeleted,
};

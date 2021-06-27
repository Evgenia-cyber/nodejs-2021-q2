import { getRepository } from 'typeorm';
import { Task } from '../../entities/Task';
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

/**
 * Get all tasks
 * @returns {Promise<Task[]>} Promise object represents an array of all tasks or an empty array
 */
const getAll = async (): Promise<ITask[] | []> => {
  const taskRepository = getRepository(Task);
  return taskRepository.find();
};

/**
 * Create new task
 * @param {string|undefined} boardId - The board's id - ID of the board this task belongs to
 * @param {TaskDataFromRequestBody} body - Information about the task
 * @returns {Promise<Task>} Promise object represents new task
 */
const create = async (
  boardId: string | undefined,
  body: ITaskDataFromRequestBody
): Promise<ITask> => {
  const taskRepository = getRepository(Task);
  const task = new Task();
  return taskRepository.save({
    ...task,
    ...body,
    boardId,
  });
};

/**
 * Get task by board's and task's ids
 * @param {string|undefined} boardId - The board's id - ID of the board this task belongs to
 * @param {string|undefined} taskId - The task's id
 * @returns {Promise<Task|null>} Promise object represents task or null
 */
const getById = async (
  boardId: string | undefined,
  taskId: string | undefined
): Promise<ITask | null> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne({ where: { boardId, id: taskId } });
  if (!task) return null;
  return task;
};

/**
 * Update task by board's and task's ids
 * @param {string|undefined} boardId - The board's id - ID of the board this task belongs to
 * @param {string|undefined} taskId - The task's id
 * @param {TaskDataFromRequestBody} body - New information about the task
 * @returns {Promise<Task|null>} Promise object represents updated task or null
 */
const update = async (
  boardId: string | undefined,
  taskId: string | undefined,
  body: ITaskDataFromRequestBody
): Promise<ITask | null> => {
  const taskRepository = getRepository(Task);
  const task = await getById(boardId, taskId);
  if (!task) return null;
  return taskRepository.save({
    ...task,
    ...body,
  });
};

/**
 * Delete task by board's and task's ids
 * @param {string|undefined} boardId - The board's id - ID of the board this task belongs to
 * @param {string|undefined} taskId - The task's id
 * @returns {Promise<null|true>} Promise object represents null or true
 */
const del = async (
  boardId: string | undefined,
  taskId: string | undefined
): Promise<null | true> => {
  const taskRepository = getRepository(Task);
  const task = await getById(boardId, taskId);
  if (!task) return null;
  taskRepository.delete(task);
  return true;
};

/**
 * Delete tasks by board's id, when this board deleted
 * @param {string|undefined} boardId - The board's id - ID of the board this tasks belongs to
 * @returns {Promise<true>} Promise object represents true
 */
const deleteTasksWhenBoardDeleted = async (
  boardId: string | undefined
): Promise<true> => {
  const taskRepository = getRepository(Task);
  taskRepository.delete({ boardId });
  return true;
};

/**
 * Update tasks by user's id - when this user deleted, all his tasks would be updated to put userId = null
 * @param {string|undefined} userId - The user's id - ID of the user this tasks belongs to
 * @returns {Promise<true>} Promise object represents true
 */
const updateTasksWhenUserDeleted = async (
  userId: string | undefined
): Promise<true | null> => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository
    .createQueryBuilder('task')
    .where('task.userId like :userId', { userId: `%${userId}%` })
    .getMany();
  if (!tasks) return null;
  const updatedTasks = tasks.map((task) => {
    const copyTask = task;
    copyTask.userId = null;
    return copyTask;
  });
  const res = await taskRepository.save(updatedTasks);
  if (!res) return null;
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

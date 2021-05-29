import { v4 as uuidv4 } from 'uuid';
import { ITaskDataFromRequest } from './task.types';

/**
 * @class Task
 * @classdesc Class representing a task.
 * @property {string} this.id - The task's id.
 * @property {string} this.title - The task's title.
 * @property {number} this.order- The task's order.
 * @property {string|null} this.userId - The task's user id.
 *@property {string|null} this.boardId - The task's board id.
 *@property {string|null} this.columnId - The task's column id.
 *
 * @param {Object} task - Information about the task.
 * @param {string} task.title - The task's title. Default value: 'default title'
 * @param {number} task.order - The task's order. Default value: 0
 * @param {string} task.description - The task's description. Default value: 'default description'
 * @param {string|null} task.userId - The task's user id. Default value: null
 * @param {string|null} task.boardId - The task's board id. Default value: null
 * @param {string|null} task.columnId - The task's column id. Default value: null
 * @this Task
 */
class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    title = 'default title',
    order = 0,
    description = 'default description',
    userId = null,
    boardId = null,
    columnId = null,
  }: ITaskDataFromRequest) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export { Task };

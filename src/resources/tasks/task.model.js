const { v4: uuidv4 } = require('uuid');

/** Class representing a user. */
class Task {
  /**
   * Create a task's instance.
   * @param {Object} task - Information about the task. Default value: {}
   * @param {string} [task.id] - The task's id. Calculated automatically.
   * @param {string} task.title - The task's title. Default value: 'default title'
   * @param {number} task.order - The task's order. Default value: 0
   * @param {string} task.description - The task's description. Default value: 'default description'
   * @param {string|null} task.userId - The task's user id. Default value: null
   * @param {string|null} task.boardId - The task's board id. Default value: null
   * @param {string|null} task.columnId - The task's column id. Default value: null
   */
  constructor({
    id = uuidv4(),
    title = 'default title',
    order = 0,
    description = 'default description',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;

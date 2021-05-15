// const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    // id = uuid(),
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

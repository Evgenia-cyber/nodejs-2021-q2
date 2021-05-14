// const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');

class Board {
  constructor({
    // id = uuid(),
    id = uuidv4(),
    title = 'default title',
    columns = [],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;

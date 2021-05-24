const { v4: uuidv4 } = require('uuid');

class Column {
  constructor({ id = uuidv4(), title = 'default title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;

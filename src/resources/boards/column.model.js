const { v4: uuidv4 } = require('uuid');

/** Class representing a column. */
class Column {
  /**
   * Create a column's instance.
   * @param {Object} column - Information about the column. Default value: {}
   * @param {string} [column.id] - The column's id. Calculated automatically.
   * @param {string} column.title - The column's title. Default value: 'default title'
   * @param {number} column.order - The column's order. Default value: 0
   */
  constructor({ id = uuidv4(), title = 'default title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;

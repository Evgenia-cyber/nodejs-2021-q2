const { v4: uuidv4 } = require('uuid');

/** Class representing a board. */
class Board {
  /**
   * Create a board's instance.
   * @param {Object} board - Information about the board. Default value: {}
   * @param {string} [board.id] - The board's id. Calculated automatically.
   * @param {string} board.title - The board's title. Default value: 'default title'
   * @param {Array<Column>} board.columns - The board's columns. Default value: []
   */
  constructor({ id = uuidv4(), title = 'default title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;

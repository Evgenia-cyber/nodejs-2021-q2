import { v4 as uuidv4 } from 'uuid';
import { IBoard, IBoardDataFromRequestBody } from './board.types';
import { IColumn } from '../columns/column.types';

/**
 * @class Board
 * @classdesc Class representing a board.
 * @property {string} this.id - The column's id.
 * @property {string} this.title - The column's title.
 * @property {Array<Column>} this.columns- The array of columns for this board.
 *
 * @param {Object} column - Information about the column.
 * @param {Object} board - Information about the board.
 * @param {string} board.title - The board's title. Default value: 'default title'
 * @param {Array<Column>} board.columns - The board's columns. Default value: []
 * @this Board
 */
class Board implements IBoard {
  id: string;

  title: string;

  columns: Array<IColumn>;

  constructor({
    title = 'default title',
    columns = [],
  }: IBoardDataFromRequestBody) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }
}

export { Board };

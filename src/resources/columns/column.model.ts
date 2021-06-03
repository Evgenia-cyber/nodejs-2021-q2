import { v4 as uuidv4 } from 'uuid';
import { IColumn, IColumnDataFromRequestBody } from './column.types';

/**
 * @class Column
 * @classdesc Class representing a board's column.
 * @property {string} this.id - The column's id.
 * @property {string} this.title - The column's title.
 * @property {string} this.order - The column's order.
 *
 * @param {Object} column - Information about the column.
 * @param {string} column.title - The column's title. Default value: 'default title'
 * @param {number} column.order - The column's order. Default value: 0
 * @this Column
 */

class Column implements IColumn {
  id: string;

  title: string;

  order: number;

  constructor({
    title = 'default title',
    order = 0,
  }: IColumnDataFromRequestBody) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
  }
}

export { Column };

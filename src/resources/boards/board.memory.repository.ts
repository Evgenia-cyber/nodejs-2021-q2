import { BOARDS } from '../data/data';
import { Board } from './board.model';
import { Column } from './column.model';
import { IBoard, IBoardDataFromRequestBody } from './board.types';

/**
 * @module boardRepository
 */

/**
 * A board's data from request body
 * @typedef {Object} BoardDataFromRequestBody
 * @property {string} title - The board's title.
 * @property {Array<Column>} columns - The board's columns.
 */

/**
 * Get all boards
 * @returns {Promise<Board[]>} Promise object represents an array of all boards or an empty array
 */
const getAll = async (): Promise<IBoard[] | []> => BOARDS;

/**
 * Create new board
 * @param {BoardDataFromRequestBody} body - Information about the board
 * @returns {Promise<Board>} Promise object represents new board
 */
const create = async (body: IBoardDataFromRequestBody): Promise<IBoard> => {
  const { title, columns } = body;
  const boardColumns = columns.map(
    (column) => new Column({ title: column.title, order: column.order })
  );
  const newBoard = new Board({ title, columns: boardColumns });
  BOARDS.push(newBoard);
  return newBoard;
};

/**
 * Get board by board's id
 * @param {string} id - The board's id.
 * @returns {Promise<Board|undefined>} Promise object represents board or undefined
 */
const getById = async (id: string): Promise<IBoard | undefined> =>
  BOARDS.find((board) => board.id === id);

/**
 * Update board by board's id
 * @param {string} id - The board's id.
 * @param {BoardDataFromRequestBody} body - New information about the board
 * @returns {Promise<Board|undefined>} Promise object represents updated board or undefined
 */
const update = async (
  id: string,
  body: IBoardDataFromRequestBody
): Promise<IBoard | undefined> => {
  const { title, columns } = body;
  const index = BOARDS.findIndex((board) => board.id === id);
  if (index !== -1) {
    let board = BOARDS[index];
    if (board && board.id) {
      board = { ...board, title, columns };
      BOARDS.splice(index, 1, board);
      return board;
    }
  }
  return undefined;
};

/**
 * Delete board by board's id
 * @param {string} id - The board's id.
 * @returns {Promise<null|true>} Promise object represents null or true
 */
const del = async (id: string): Promise<null | true> => {
  const index = BOARDS.findIndex((board) => board.id === id);
  if (index < 0) {
    return null;
  }
  BOARDS.splice(index, 1);
  return true;
};

export { getAll, create, getById, update, del };

import {
  getAll as getAllBoards,
  create as createBoard,
  getById as getBoardById,
  update as updateBoard,
  del as delBoard,
} from './board.memory.repository';
import { IBoard, IBoardDataFromRequestBody } from './board.types';

/**
 * @module boardService
 */

/**
 * A board's data from request body
 * @typedef {Object} BoardDataFromRequestBody
 * @property {string} title - The board's title.
 * @property {Array<Column>} columns - The board's columns.
 */

/**
 * Get all boards
 * @returns { Promise<Board[]>} - Returns a Promise object that is an array of all boards or an empty array
 */
const getAll = (): Promise<IBoard[] | []> => getAllBoards();

/**
 * Create new board
 * @param {BoardDataFromRequestBody} body - A board's data from request body
 * @returns { Promise<Board>} - Returns a Promise object that is a new board
 */
const create = (body: IBoardDataFromRequestBody): Promise<IBoard> =>
  createBoard(body);

/**
 * Get board by board's id
 * @param {string} id - The board's id
 * @returns { Promise<Board|null>} - Returns a Promise object that is a board or null
 */
const getById = (id: string): Promise<IBoard | null> => getBoardById(id);

/**
 * Update board by board's id
 * @param {string} id - The board's id.
 * @param {BoardDataFromRequestBody} body - New board's data from request body
 * @returns { Promise<Board|null>} - Returns a Promise object that is a updated board or null
 */
const update = (
  id: string,
  body: IBoardDataFromRequestBody
): Promise<IBoard | null> => updateBoard(id, body);

/**
 * Delete board by board's id
 * @param {string} id - The board's id.
 * @returns { Promise<null|true>} Returns a Promise object that is null or true
 */
const del = (id: string): Promise<null | true> => delBoard(id);

export const boardsService = { getAll, getById, create, update, del };

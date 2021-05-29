import {
  getAll as getAllBoards,
  create as createBoard,
  getById as getBoardById,
  update as updateBoard,
  del as delBoard,
} from './board.memory.repository';
import { IBoardDataFromRequestBody } from './board.types';

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
 * @returns {function(): Promise<Board[]>} - Returns a function that returns a Promise object that is an array of all boards or an empty array
 */
const getAll = () => getAllBoards();

/**
 * Create new board
 * @param {BoardDataFromRequestBody} body - A board's data from request body
 * @returns {function(): Promise<Board>} - Returns a function that returns a Promise object that is a new board
 */
const create = (body: IBoardDataFromRequestBody) => createBoard(body);

/**
 * Get board by board's id
 * @param {string} id - The board's id
 * @returns {function(): Promise<Board|undefined>} - Returns a function that returns a Promise object that is a board or undefined
 */
const getById = (id: string) => getBoardById(id);

/**
 * Update board by board's id
 * @param {string} id - The board's id.
 * @param {BoardDataFromRequestBody} body - New board's data from request body
 * @returns {function(): Promise<Board|undefined>} - Returns a function that returns a Promise object that is a updated board or undefined
 */
const update = (id: string, body: IBoardDataFromRequestBody) =>
  updateBoard(id, body);

/**
 * Delete board by board's id
 * @param {string} id - The board's id.
 * @returns {function(): Promise<null|true>} Returns a function that returns a Promise object that is null or true
 */
const del = (id: string) => delBoard(id);

export const boardsService = { getAll, getById, create, update, del };

/**
 * @module boardRepository
 */

/**
 * A board's data from request body
 * @typedef {Object} BoardDataFromRequestBody
 * @property {string} title - The board's title.
 * @property {Array<Column>} columns - The board's columns.
 */

const { BOARDS } = require('../data/data.js');
const Board = require('./board.model');
const Column = require('./column.model');

/**
 * Get all boards
 * @returns {Promise<Board[]>} Promise object represents an array of all boards or an empty array
 */
const getAll = async () => BOARDS;

/**
 * Create new board
 * @param {BoardDataFromRequestBody} body - Information about the board
 * @returns {Promise<Board|null>} Promise object represents new board or null
 */
const create = async (body) => {
  const { title, columns } = body;
  if (!title || !columns) {
    return null;
  }
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
const getById = async (id) => BOARDS.find((board) => board.id === id);

/**
 * Update board by board's id
 * @param {string} id - The board's id.
 * @param {BoardDataFromRequestBody} body - New information about the board
 * @returns {Promise<Board|null>} Promise object represents updated board or null
 */
const update = async (id, body) => {
  const { title, columns } = body;
  if (!title || !columns) {
    return null;
  }
  const index = BOARDS.findIndex((board) => board.id === id);
  if (index < 0) {
    return null;
  }
  BOARDS[index] = { id: BOARDS[index].id, title, columns };
  return BOARDS[index];
};

/**
 * Delete board by board's id
 * @param {string} id - The board's id.
 * @returns {Promise<null|true>} Promise object represents null or true
 */
const del = async (id) => {
  const index = BOARDS.findIndex((board) => board.id === id);
  if (index < 0) {
    return null;
  }
  BOARDS.splice(index, 1);
  return true;
};

module.exports = { getAll, create, getById, update, del };

/**
 * @module boardService
 */

/**
 * A board's data from request body
 * @typedef {Object} BoardDataFromRequestBody
 * @property {string} title - The board's title.
 * @property {Array<Column>} columns - The board's columns.
 */

const boardsRepo = require('./board.memory.repository');

/**
 * Get all boards
 * @returns {function(): Promise<Board[]>} - Returns a function that returns a Promise object that is an array of all boards or an empty array
 */
const getAll = () => boardsRepo.getAll();

/**
 * Create new board
 * @param {BoardDataFromRequestBody} body - A board's data from request body
 * @returns {function(): Promise<Board|null>} - Returns a function that returns a Promise object that is a new board or null
 */
const create = (body) => boardsRepo.create(body);

/**
 * Get board by board's id
 * @param {string} id - The board's id
 * @returns {function(): Promise<Board|undefined>} - Returns a function that returns a Promise object that is a board or undefined
 */
const getById = (id) => boardsRepo.getById(id);

/**
 * Update board by board's id
 * @param {string} id - The board's id.
 * @param {BoardDataFromRequestBody} body - New board's data from request body
 * @returns {function(): Promise<Board|null>} - Returns a function that returns a Promise object that is a updated board or null
 */
const update = (id, body) => boardsRepo.update(id, body);

/**
 * Delete board by board's id
 * @param {string} id - The board's id.
 * @returns {function(): Promise<null|true>} Returns a function that returns a Promise object that is null or true
 */
const del = (id) => boardsRepo.del(id);

module.exports = { getAll, getById, create, update, del };

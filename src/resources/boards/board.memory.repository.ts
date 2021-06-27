import { getRepository } from 'typeorm';
import { Board } from '../../entities/Board';
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
const getAll = async (): Promise<IBoard[] | []> => {
  const boardRepository = getRepository(Board);
  return boardRepository.find({ relations: ['columns'] });
};

/**
 * Create new board
 * @param {BoardDataFromRequestBody} body - Information about the board
 * @returns {Promise<Board>} Promise object represents new board
 */
const create = async (body: IBoardDataFromRequestBody): Promise<IBoard> => {
  const boardRepository = getRepository(Board);
  return boardRepository.save(body);
};

/**
 * Get board by board's id
 * @param {string|undefined} id - The board's id.
 * @returns {Promise<Board|null>} Promise object represents board or null
 */
const getById = async (id: string | undefined): Promise<IBoard | null> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne({
    where: { id },
    relations: ['columns'],
  });
  if (!board) return null;
  return board;
};

/**
 * Update board by board's id
 * @param {string|undefined} id - The board's id.
 * @param {BoardDataFromRequestBody} body - New information about the board
 * @returns {Promise<Board|null>} Promise object represents updated board or null
 */
const update = async (
  id: string | undefined,
  body: IBoardDataFromRequestBody
): Promise<IBoard | null> => {
  const boardRepository = getRepository(Board);
  const board = await getById(id);
  if (!board) return null;
  return boardRepository.save({
    ...board,
    ...body,
  });
};

/**
 * Delete board by board's id
 * @param {string|undefined} id - The board's id.
 * @returns {Promise<null|true>} Promise object represents null or true
 */
const del = async (id: string | undefined): Promise<null | true> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.delete({
    id,
  });
  if (!board) return null;
  return true;
};

export { getAll, create, getById, update, del };

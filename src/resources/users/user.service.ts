import {
  getAll as getAllUsers,
  create as createUser,
  getById as getUserById,
  update as updateUser,
  del as delUser,
  getUserByLogin as getByLogin,
} from './user.memory.repository';
import { IUser, IUserDataFromRequestBody } from './user.types';

/**
 * @module userService
 */

/**
 * A user's data from request body
 * @typedef {Object} UserDataFromRequestBody
 * @property {string} name - The user's name.
 * @property {string} login - The user's login.
 * @property {string} password - The user's password.
 */

/**
 * Get all users
 * @returns { Promise<User[]>} - Returns a Promise object that is an array of all users or an empty array
 */
const getAll = (): Promise<IUser[] | []> => getAllUsers();

/**
 * Create new user
 * @param {UserDataFromRequestBody} body - A user's data from request body
 * @returns { Promise<User>} - Returns a Promise object that is a new user
 */
const create = (body: IUserDataFromRequestBody): Promise<IUser> =>
  createUser(body);

/**
 * Get user by user's id
 * @param {string|undefined} id - The user's id
 * @returns {Promise<User|null>} - Returns a Promise object that is a user or null
 */
const getById = (id: string | undefined) => getUserById(id);

/**
 * Update user by user's id
 * @param {string|undefined} id - The user's id.
 * @param {UserDataFromRequestBody} body - New user's data from request body
 * @returns {Promise<User|null>} - Returns a Promise object that is a updated user or null
 */
const update = (id: string | undefined, body: IUserDataFromRequestBody) =>
  updateUser(id, body);

/**
 * Delete user by user's id
 * @param {string|undefined} id - The user's id.
 * @returns { Promise<null|true>} Returns a  Promise object that is null or true
 */
const del = (id: string | undefined) => delUser(id);

/**
 * Get user by user's id
 * @param {string|undefined} id - The user's id
 * @returns {Promise<User|null>} - Returns a Promise object that is a user or null
 */
const getUserByLogin = (login: string | undefined) => getByLogin(login);

export const usersService = {
  getAll,
  getById,
  create,
  update,
  del,
  getUserByLogin,
};

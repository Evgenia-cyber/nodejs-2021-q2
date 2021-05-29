import {
  getAll as getAllUsers,
  create as createUser,
  getById as getUserById,
  update as updateUser,
  del as delUser,
} from './user.memory.repository';
import { IUserDataFromRequestBody } from './user.types';

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
 * @returns {function(): Promise<User[]>} - Returns a function that returns a Promise object that is an array of all users or an empty array
 */
const getAll = () => getAllUsers();

/**
 * Create new user
 * @param {UserDataFromRequestBody} body - A user's data from request body
 * @returns {function(): Promise<User>} - Returns a function that returns a Promise object that is a new user
 */
const create = (body: IUserDataFromRequestBody) => createUser(body);

/**
 * Get user by user's id
 * @param {string} id - The user's id
 * @returns {function(): Promise<User|undefined>} - Returns a function that returns a Promise object that is a user or undefined
 */
const getById = (id: string) => getUserById(id);

/**
 * Update user by user's id
 * @param {string} id - The user's id.
 * @param {UserDataFromRequestBody} body - New user's data from request body
 * @returns {function(): Promise<User|undefined>} - Returns a function that returns a Promise object that is a updated user or undefined
 */
const update = (id: string, body: IUserDataFromRequestBody) =>
  updateUser(id, body);

/**
 * Delete user by user's id
 * @param {string} id - The user's id.
 * @returns {function(): Promise<null|true>} Returns a function that returns a Promise object that is null or true
 */
const del = (id: string) => delUser(id);

export const usersService = { getAll, getById, create, update, del };

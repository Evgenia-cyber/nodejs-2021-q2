import { USERS } from '../data/data';
import { User } from './user.model';
import { IUserDataFromRequestBody, IUser } from './user.types';

/**
 * @module userRepository
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
 *
 * @returns {Promise<User[]>} Promise object represents an array of all users or an empty array
 */
const getAll = async (): Promise<IUser[] | []> => USERS;

/**
 * Create new user
 *
 * @param {UserDataFromRequestBody} body - Information about the user
 * @returns {Promise<User>} Promise object represents new user
 */
const create = async (body: IUserDataFromRequestBody): Promise<IUser> => {
  const { name, login, password } = body;
  const newUser = new User({ name, login, password });
  USERS.push(newUser);
  return newUser;
};

/**
 * Get user by user's id
 *
 * @param {string} id - The user's id.
 * @returns {Promise<User|null>} Promise object represents user or null
 */
const getById = async (id: string): Promise<IUser | null> => {
  const userById = USERS.find((user) => user.id === id);
  if (!userById) return null;
  return userById;
};

/**
 * Update user by user's id
 *
 * @param {string} id - The user's id.
 * @param {UserDataFromRequestBody} body - New information about the user
 * @returns {Promise<User|null>} Promise object represents updated user or null
 */
const update = async (
  id: string,
  body: IUserDataFromRequestBody
): Promise<IUser | null> => {
  const { name, login, password } = body;
  const index = USERS.findIndex((user) => user.id === id);
  if (index !== -1) {
    let updatedUser = USERS[index];
    if (updatedUser && updatedUser.id) {
      updatedUser = { ...updatedUser, name, login, password };
      USERS[index] = updatedUser;
      return updatedUser;
    }
  }
  return null;
};

/**
 * Delete user by user's id
 *
 * @param {string} id - The user's id.
 * @returns {Promise<null|true>} Promise object represents null or true
 */
const del = async (id: string): Promise<null | true> => {
  const index = USERS.findIndex((user) => user.id === id);
  if (index < 0) {
    return null;
  }
  USERS.splice(index, 1);
  return true;
};

export { getAll, create, getById, update, del };

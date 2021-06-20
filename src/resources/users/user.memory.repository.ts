import { getRepository } from 'typeorm';
import { User } from '../../entities/User';
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
const getAll = async (): Promise<IUser[] | []> => {
  const userRepository = getRepository(User);
  return userRepository.find();
};

/**
 * Create new user
 *
 * @param {UserDataFromRequestBody} body - Information about the user
 * @returns {Promise<User>} Promise object represents new user
 */
const create = async (body: IUserDataFromRequestBody): Promise<IUser> => {
  const userRepository = getRepository(User);
  const user = new User();
  return userRepository.save({
    ...user,
    ...body,
  });
};

/**
 * Get user by user's id
 *
 * @param {string|undefined} id - The user's id.
 * @returns {Promise<User|null>} Promise object represents user or null
 */
const getById = async (id: string | undefined): Promise<IUser | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id });
  if (!user) return null;
  return user;
};

/**
 * Update user by user's id
 *
 * @param {string|undefined} id - The user's id.
 * @param {UserDataFromRequestBody} body - New information about the user
 * @returns {Promise<User|null>} Promise object represents updated user or null
 */
const update = async (
  id: string | undefined,
  body: IUserDataFromRequestBody
): Promise<IUser | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id });
  if (!user) return null;
  return userRepository.save({
    ...user,
    ...body,
  });
};

/**
 * Delete user by user's id
 *
 * @param {string|undefined} id - The user's id.
 * @returns {Promise<null|true>} Promise object represents null or true
 */
const del = async (id: string | undefined): Promise<null | true> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id });
  if (!user) return null;
  userRepository.delete({
    id,
  });
  return true;
};

export { getAll, create, getById, update, del };

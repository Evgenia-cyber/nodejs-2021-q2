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

const { USERS } = require('../data/data.js');
const User = require('./user.model.js');

/**
 * Get all users
 * @returns {Promise<User[]>} Promise object represents an array of all users or an empty array
 */
const getAll = async () => USERS;

/**
 * Create new user
 * @param {UserDataFromRequestBody} body - Information about the user
 * @returns {Promise<User|null>} Promise object represents new user or null
 */
const create = async (body) => {
  const { name, login, password } = body;
  if (!name || !login || !password) {
    return null;
  }
  const newUser = new User({ name, login, password });
  USERS.push(newUser);
  return newUser;
};

/**
 * Get user by user's id
 * @param {string} id - The user's id.
 * @returns {Promise<User|undefined>} Promise object represents user or undefined
 */
const getById = async (id) => USERS.find((user) => user.id === id);

/**
 * Update user by user's id
 * @param {string} id - The user's id.
 * @param {UserDataFromRequestBody} body - New information about the user
 * @returns {Promise<User|null>} Promise object represents updated user or null
 */
const update = async (id, body) => {
  const { name, login, password } = body;
  if (!name || !login || !password) {
    return null;
  }
  const index = USERS.findIndex((user) => user.id === id);
  if (index < 0) {
    return null;
  }
  USERS[index] = { id: USERS[index].id, name, login, password };
  return USERS[index];
};

/**
 * Delete user by user's id
 * @param {string} id - The user's id.
 * @returns {Promise<null|true>} Promise object represents null or true
 */
const del = async (id) => {
  const index = USERS.findIndex((user) => user.id === id);
  if (index < 0) {
    return null;
  }
  USERS.splice(index, 1);
  return true;
};

module.exports = { getAll, create, getById, update, del };

const { USERS } = require('../data/data.js');
const User = require('./user.model.js');

/**
 * A user's data from request body
 * @typedef {Object} BodyUser
 * @property {string} name - The user's name.
 * @property {string} login - The user's login.
 * @property {string} password - The user's password.
 */

/**
 * Get all users
 * @returns {Promise<User[]>} Promise object represents an array of all users or an empty array
 */
const getAll = async () => USERS;

/**
 * Create new user
 * @param {BodyUser} body - information about the user
 * @returns {Promise<User>} Promise object represents new user or null
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
 * @returns {Promise<User>} Promise object represents user or undefined
 */
const getById = async (id) => USERS.find((user) => user.id === id);

/**
 * Update user by user's id
 * @param {string} id - The user's id.
 * @param {BodyUser} body - new information about the user
 * @returns {Promise<User>} Promise object represents updated user or null
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
 * @returns {Promise} Promise object represents null or true
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

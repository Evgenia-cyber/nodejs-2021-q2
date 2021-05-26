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

const usersRepo = require('./user.memory.repository');

/**
 * Get all users
 * @returns {function(): Promise<User[]>} - Returns a function that returns a Promise object that is an array of all users or an empty array
 */
const getAll = () => usersRepo.getAll();

/**
 * Create new user
 * @param {UserDataFromRequestBody} body - A user's data from request body
 * @returns {function(): Promise<User|null>} - Returns a function that returns a Promise object that is a new user or null
 */
const create = (body) => usersRepo.create(body);

/**
 * Get user by user's id
 * @param {string} id - The user's id
 * @returns {function(): Promise<User|undefined>} - Returns a function that returns a Promise object that is a user or undefined
 */
const getById = (id) => usersRepo.getById(id);

/**
 * Update user by user's id
 * @param {string} id - The user's id.
 * @param {UserDataFromRequestBody} body - New user's data from request body
 * @returns {function(): Promise<User|null>} - Returns a function that returns a Promise object that is a updated user or null
 */
const update = (id, body) => usersRepo.update(id, body);

/**
 * Delete user by user's id
 * @param {string} id - The user's id.
 * @returns {function(): Promise<null|true>} Returns a function that returns a Promise object that is null or true
 */
const del = (id) => usersRepo.del(id);

module.exports = { getAll, getById, create, update, del };

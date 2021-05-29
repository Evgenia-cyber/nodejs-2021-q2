import { v4 as uuidv4 } from 'uuid';
import {
  IUserForResponse,
  IUserDataFromRequestBody,
  IUser,
} from './user.types';

/**
 * A user's data from request body
 * @typedef {Object} UserDataFromRequestBody
 * @property {string} name - The user's name.
 * @property {string} login - The user's login.
 * @property {string} password - The user's password.
 */

/**
 * @class User
 * @classdesc Class representing a user.
 * @property {string} this.id - The user's id.
 * @property {string} this.name - The user's name.
 * @property {string} this.login - The user's login.
 * @property {string} this.password - The user's password.
 * 
 * @param {UserDataFromRequestBody} user - Information about the user from request body
 * @this User
 */

class User {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor(user: IUserDataFromRequestBody) {
    const { name, login, password } = user;
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Modifie the user object by removing the password field
   *
   * @param {User} user - The user object
   * @returns {Object} object with fields id, name, login
   */
  static toResponse(user: IUser): IUserForResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export { User };

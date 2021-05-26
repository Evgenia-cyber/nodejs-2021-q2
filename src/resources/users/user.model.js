const { v4: uuidv4 } = require('uuid');

/** Class representing a user. */
class User {
  /**
   * Create a user's instance.
   * @param {Object} user={}
   * @param {string} [user.id] - The user's id. Calculated automatically.
   * @param {string} user.name=USER - The user's name.
   * @param {string} user.login=user - The user's login.
   * @param {string} user.password=P@55w0rd - The user's password.
   */
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Modifie the user object by removing the password field
   * @param {User} user - The user object
   * @return {Object} object with fields id, name, login
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;

const { USERS } = require('../data/data.js');
const User = require('./user.model.js');
// const {
//   updateTasksWhenUserDeleted,
// } = require('../tasks/task.memory.repository');

const getAll = async () => USERS;

const create = async (body) => {
  const { name, login, password } = body;
  if (!name || !login || !password) {
    return null;
  }
  const newUser = new User({ name, login, password });
  USERS.push(newUser);
  return newUser;
};

const getById = async (id) => USERS.find((user) => user.id === id);

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

const del = async (id) => {
  const index = USERS.findIndex((user) => user.id === id);
  if (index < 0) {
    return null;
  }
  // await updateTasksWhenUserDeleted(id);
  USERS.splice(index, 1);
  return true;
};

module.exports = { getAll, create, getById, update, del };

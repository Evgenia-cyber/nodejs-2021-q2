const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const create = (body) => usersRepo.create(body);
const getById = (id) => usersRepo.getById(id);
const update = (id, body) => usersRepo.update(id, body);
const del = (id) => usersRepo.del(id);

module.exports = { getAll, getById, create, update, del };

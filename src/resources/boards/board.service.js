const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const create = (body) => boardsRepo.create(body);
const getById = (id) => boardsRepo.getById(id);
const update = (id, body) => boardsRepo.update(id, body);
const del = (id) => boardsRepo.del(id);

module.exports = { getAll, getById, create, update, del };

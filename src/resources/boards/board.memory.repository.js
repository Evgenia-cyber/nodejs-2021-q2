const { BOARDS } = require('../data/data.js');
const Board = require('./board.model');
const Column = require('./column.model');

const getAll = async () => BOARDS;

const create = async (body) => {
  const { title, columns } = body;
  if (!title || !columns) {
    return null;
  }
  const boardColumns = columns.map(
    (column) => new Column({ title: column.title, order: column.order })
  );
  const newBoard = new Board({ title, columns: boardColumns });
  BOARDS.push(newBoard);
  return newBoard;
};

const getById = async (id) => BOARDS.find((board) => board.id === id);

const update = async (id, body) => {
  const { title, columns } = body;
  if (!title || !columns) {
    return null;
  }
  const index = BOARDS.findIndex((board) => board.id === id);
  if (index < 0) {
    return null;
  }
  BOARDS[index] = { id: BOARDS[index].id, title, columns };
  return BOARDS[index];
};

const del = async (id) => {
  const index = BOARDS.findIndex((board) => board.id === id);
  if (index < 0) {
    return null;
  }
  BOARDS.splice(index, 1);
  return true;
};

module.exports = { getAll, create, getById, update, del };

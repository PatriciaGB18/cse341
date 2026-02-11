const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

let _db;

// Função para inicializar o banco (o que o server.js chama)
const initDb = async (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    _db = mongoose.connection;
    callback(null, _db);
  } catch (err) {
    callback(err);
  }
};

// Função para obter a instância do banco se necessário
const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
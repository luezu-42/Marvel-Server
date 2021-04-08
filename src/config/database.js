const Sequelize = require('sequelize');

const database = new Sequelize(
  'postgres://qfdmxoko:Bn3MXYFT8lqzQMHd6bOqzM0X6drg5SB6@motty.db.elephantsql.com:5432/qfdmxoko',
  { dialect: 'postgres' }
);

module.exports = database;

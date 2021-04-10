const Sequelize = require('sequelize');

require('dotenv').config();

const database = new Sequelize(process.env.POST, { dialect: 'postgres' });

module.exports = database;

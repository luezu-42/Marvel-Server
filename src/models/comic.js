const Sequelize = require('sequelize');
const database = require('../config/database');
const User = require('./user');

const Comic = database.define('comic', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  digitalId: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
  },
  title: {
    type: Sequelize.STRING,
  },
  thumbnail: {
    type: Sequelize.STRING,
  },
});
Comic.belongsTo(User, { foreignKey: 'userId' });

module.exports = Comic;

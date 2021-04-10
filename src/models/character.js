const Sequelize = require('sequelize');
const database = require('../config/database');
const User = require('./user');

const Character = database.define('character', {
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
  name: {
    type: Sequelize.STRING,
  },
  thumbnail: {
    type: Sequelize.STRING,
  },
});

Character.belongsTo(User, { foreignKey: 'userId' });

module.exports = Character;

const database = require('../config/database');

const connectDb = async () => {
  try {
    await database.sync();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

module.exports = connectDb;

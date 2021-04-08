const database = require('../config/database');

const connectDb = async () => {
  try {
    const resultado = await database.sync();
    // eslint-disable-next-line no-console
    console.log(resultado);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

module.exports = connectDb;

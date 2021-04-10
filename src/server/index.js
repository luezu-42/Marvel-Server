const app = require('./app');
require('dotenv').config();

const port = process.env.PORT;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('server on');
});

module.exports = app;

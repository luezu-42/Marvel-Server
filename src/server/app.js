const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const user = require('../routes/user');
const comic = require('../routes/comic');
const character = require('../routes/character');

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors({ origin: '*' }));
require('../database/index')();

app.use('/comic', comic);
app.use('/character', character);
app.use('/', user);

module.exports = app;

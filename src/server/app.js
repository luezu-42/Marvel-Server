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

app.use(cors());
require('../database/index')();

app.use('/comic', comic);
app.use('/character', character);
app.use('/', user);

module.exports = app;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const user = require('../routes/user');
const favorite = require('../routes/favorites');

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({ origin: '*' }));
require('../database/index')();

app.use('/favorites', favorite);
app.use('/', user);

module.exports = app;

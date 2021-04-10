const expresss = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = expresss.Router();
const jwtDecode = require('jwt-decode');

const Comic = require('../models/comic');
const Character = require('../models/character');
const auth = require('../config/middleware');

app.get('/comics', auth, async (req, res) => {
  const token = req.headers['x-access-token'];

  const decode = jwtDecode(token);

  const allComics = Comic.findAll({
    where: {
      userId: decode.id,
    },
  });

  return res.status(200).json({
    allComics,
  });
});

app.get('/character', auth, async (req, res) => {
  const token = req.headers['x-access-token'];

  const decode = jwtDecode(token);

  const allCharacters = Character.findAll({
    where: {
      userId: decode.id,
    },
  });

  return res.status(200).json({
    allCharacters,
  });
});

module.exports = app;

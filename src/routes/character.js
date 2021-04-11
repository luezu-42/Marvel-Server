const expresss = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = expresss.Router();
const jwtDecode = require('jwt-decode');

const Character = require('../models/character');
const auth = require('../config/middleware');

app.get('/', auth, async (req, res) => {
  const token = req.headers['x-access-token'];

  const decode = jwtDecode(token);

  const allCharacters = await Character.findAll({
    where: {
      userId: decode.id,
    },
  });

  return res.status(200).json(allCharacters);
});

// eslint-disable-next-line no-unused-vars
app.post('/', auth, async (req, res) => {
  const token = req.headers['x-access-token'];

  const decode = jwtDecode(token);
  const { digitalId, name, thumbnail } = req.body;

  const response = await Character.findAll({
    where: {
      digitalId,
    },
  });

  if (response[0]) {
    return res.status(400).json({
      msg: 'Have a comic with this id',
    });
  }
  try {
    await Character.create({
      digitalId,
      name,
      thumbnail,
      userId: decode.id,
    });
    return res.status(200).json({
      msg: 'Favorite with success',
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal error',
    });
  }
});

app.delete('/', auth, async (req, res) => {
  const token = req.headers['x-access-token'];

  const decode = jwtDecode(token);

  try {
    await Character.destoy({
      where: {
        digitalId: req.body.digitalId,
        userId: decode.id,
      },
    });
    return res.status(200).json({
      msg: 'Comic removed of favorites with success',
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal error',
    });
  }
});
module.exports = app;

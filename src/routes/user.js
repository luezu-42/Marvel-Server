const expresss = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = expresss.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const {
  userLogin,
  userRegister,
} = require('../models/validateModel/user.schema');
const User = require('../models/user');
const auth = require('../config/middleware');

app.post('/register', async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;

  const { error } = await userRegister.validate({
    name,
    email,
    password,
    repeatPassword,
  });

  if (error) {
    return res.status(400).json({ msg: error.message });
  }

  const emailValidate = await User.findAll({
    where: {
      email,
    },
  });

  if (emailValidate[0]) {
    return res.status(400).json({ msg: 'Email already exist!' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await User.create({
      name,
      email,
      password: hash,
    });

    return res.status(200).json({ msg: 'User created!' });
    // eslint-disable-next-line no-shadow
  } catch (error) {
    return res.status(500).json({ msg: 'Server not avaible now' });
  }
});

// eslint-disable-next-line consistent-return
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { error } = await userLogin.validate({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ msg: error.message });
  }

  const emailValidate = await User.findAll({
    where: {
      email,
    },
  });

  if (!emailValidate[0]) {
    return res.status(400).json({ msg: 'Email doest exist' });
  }

  jwt.sign(
    {
      id: emailValidate[0].userId,
      email: emailValidate[0].email,
    },
    process.env.JWTS,
    { expiresIn: '5h' },
    (err, token) => {
      if (err) {
        res.status(400).json({ msg: 'Internal error' });
      } else {
        res.status(200).json({ token });
      }
    }
  );
});

app.delete('/delete', auth, async (req, res) => {
  const token = req.headers['x-access-token'];

  const decode = jwtDecode(token);

  try {
    await User.destroy({
      where: {
        userId: decode.id,
      },
    });
    return res.status(200).json({ msg: 'User deleted' });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});

app.patch('/update', auth, async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;
  const token = req.headers['x-access-token'];

  const decode = jwtDecode(token);

  const { error } = await userRegister.validate({
    name,
    email,
    password,
    repeatPassword,
  });

  if (error) {
    return res.status(400).json({ msg: error.message });
  }

  try {
    const updateUser = await User.findByPk(decode.id);

    updateUser.name = name;
    updateUser.email = email;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    updateUser.password = hash;
    await updateUser.save();
    return res.status(200).json({ msg: 'User deleted!' });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});
module.exports = app;

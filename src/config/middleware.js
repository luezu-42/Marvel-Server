const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.status(401).json({ auth: false, message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWTS, (err, decoded) => {
    if (err) {
      res
        .status(500)
        .json({ auth: false, message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyJWT;

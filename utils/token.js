const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const key = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports.createToken = (user) => jwt.sign({ _id: user._id }, key);

module.exports.verifyToken = (token) => jwt.verify(token, key);

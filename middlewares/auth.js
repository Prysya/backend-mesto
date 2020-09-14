const { verifyToken } = require('../utils/token');
const { UnauthorizedError } = require('../errors/index');
const messages = require('../utils/messages');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError(messages.auth.notAuthorised);
  }

  let payload;

  try {
    payload = verifyToken(token);
  } catch (err) {
    return next(new UnauthorizedError(messages.auth.notAuthorised));
  }

  req.user = payload;

  return next();
};

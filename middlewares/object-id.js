const { ObjectId } = require('mongodb');
const messages = require('../utils/messages');
const { BadRequestError } = require('../errors/index');

module.exports.verifyCardId = (req, res, next) => (ObjectId.isValid(req.params.id)
  ? next()
  : next(new BadRequestError(messages.card.idIsNotValid)));

module.exports.verifyUserId = (req, res, next) => (ObjectId.isValid(req.params.id)
  ? next()
  : next(new BadRequestError(messages.user.idIsNotValid)));

const { Joi } = require('celebrate');
const validator = require('validator');
const messages = require('../utils/messages');

const checkUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new Error(messages.validation.urlIsNotValid);
  }
  return value;
};

module.exports.linkSchema = Joi.string()
  .custom(checkUrl, 'Валидация URL')
  .required()
  .uri();

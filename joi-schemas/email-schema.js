const { Joi } = require('celebrate');

module.exports.emailSchema = Joi.string().email();

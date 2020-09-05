const { Joi } = require('celebrate');

module.exports.linkSchema = Joi.string().required().uri();

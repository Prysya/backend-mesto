const { Joi } = require('celebrate');

module.exports.textSchema = Joi.string().required().min(2).max(30);

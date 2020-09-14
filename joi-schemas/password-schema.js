const { Joi } = require('celebrate');

module.exports.passwordSchema = Joi.string().required().min(8);

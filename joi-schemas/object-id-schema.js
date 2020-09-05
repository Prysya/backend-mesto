const { Joi } = require('celebrate');

module.exports.objectId = Joi.string().alphanum().length(24);

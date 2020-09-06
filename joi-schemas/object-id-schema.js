const { Joi } = require('celebrate');

module.exports.objectId = Joi.string().length(24).hex();

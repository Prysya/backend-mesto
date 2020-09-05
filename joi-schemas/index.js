const { Joi } = require('celebrate');
const { emailSchema } = require('./email-schema');
const { linkSchema } = require('./link-schema');
const { objectId } = require('./object-id-schema');
const { passwordSchema } = require('./password-schema');
const { textSchema } = require('./text-schema');

const registrationSchema = Joi.object().keys({
  name: textSchema,
  about: textSchema,
  email: emailSchema,
  avatar: linkSchema,
  password: passwordSchema,
});

const loginSchema = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
});

const objectIdSchema = Joi.object().keys({
  id: objectId,
});

const userAvatarSchema = Joi.object().keys({
  avatar: linkSchema,
});

const userInfoSchema = Joi.object().keys({
  name: textSchema,
  about: textSchema,
});

const cardSchema = Joi.object().keys({
  name: textSchema,
  link: linkSchema,
});

module.exports = {
  registrationSchema,
  loginSchema,
  objectIdSchema,
  userAvatarSchema,
  userInfoSchema,
  cardSchema,
};

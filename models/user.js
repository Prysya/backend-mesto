const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
const { UnauthorizedError } = require('../errors/index');
const messages = require('../utils/messages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Длинна поля "Имя" должна быть от 2 до 30 символов'],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(name) {
        return !validator.isEmpty(name, { ignore_whitespace: true });
      },
      message: 'Длинна поля "Имя" должна быть от 2 до 30 символов',
    },
  },
  about: {
    type: String,
    required: [true, 'Длинна поля "О себе" должна быть от 2 до 30 символов'],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(about) {
        return !validator.isEmpty(about, { ignore_whitespace: true });
      },
      message: 'Длинна поля "О себе" должна быть от 2 до 30 символов',
    },
  },
  avatar: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Ссылка невалидна',
    },
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Почта невалидна',
    },
    required: [true, 'Необходимо указать email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Длинна пароля должна быть не менее 8 символов'],
    minlength: 8,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(messages.auth.wrongEmailOrPassword);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(messages.auth.wrongEmailOrPassword);
        }

        return user;
      });
    });
};

userSchema.plugin(uniqueValidator, {
  message: messages.registration.emailIsNotUnique,
});

module.exports = mongoose.model('user', userSchema);

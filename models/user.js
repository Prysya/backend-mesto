const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(name) {
        return !validator.isEmpty(name, { ignore_whitespace: true });
      },
    },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(about) {
        return !validator.isEmpty(about, { ignore_whitespace: true });
      },
    },
  },
  avatar: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильная почта или пароль'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Неправильная почта или пароль'));
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);

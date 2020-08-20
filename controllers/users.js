const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getUser = ({ params: { id } }, res) => {
  User.findById(id)
    .orFail(() => new Error('ID не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'ID не найден') {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }

      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).send({ message: 'Длинна пароля менее 8 символов' });
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      data: {
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Ошибка валидации данных пользователя' });
      }

      if (err.code === 11000) {
        return res
          .status(400)
          .send({ message: 'Данный email уже зарегестрирован' });
      }

      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUserData = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('ID не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'ID не найден') {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }

      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Ошибка валидации данных пользователя' });
      }

      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('ID не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'ID не найден') {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }

      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации ссылки' });
      }

      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        '2cf267f7b4b7fdea9196675eb3e7452d8ce8f8cdf6c2e0917aa705f10d92c45a',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};

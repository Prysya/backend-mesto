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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Ошибка валидации данных пользователя' });
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
        return res
          .status(400)
          .send({ message: 'Ошибка валидации ссылки' });
      }

      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(400)
          .send({ message: 'Ошибка валидации данных карточки' });
      }

      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => new Error('ID не найден'))
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) {
        return res.status(401).send({ message: 'Необходима авторизация' });
      }

      return Card.deleteOne(card)
        .then(() => res.send({ message: 'Карточка удалена' }))
        .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'ID не найден') {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }

      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('ID не найден'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'ID не найден') {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }

      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('ID не найден'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'ID не найден') {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }

      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

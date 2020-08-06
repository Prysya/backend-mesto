const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send(err));
};

module.exports.deleteCard = ({ params: { id } }, res) => {
  Card.findByIdAndRemove(id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('user')
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

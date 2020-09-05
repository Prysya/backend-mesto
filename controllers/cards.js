const escape = require('escape-html');
const Card = require('../models/card');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../errors/index');
const messages = require('../utils/messages');

const checkCardAndSend = (card, res) => {
  if (!card) {
    throw new NotFoundError(messages.card.idIsNotFound);
  }

  return res.send({ data: card });
};

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate('owner');
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({ name: escape(name), link, owner: req.user._id });
    res.status(201).send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(messages.card.isNotValid));
    }

    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(
      () => new NotFoundError(messages.card.idIsNotFound),
    );

    if (card.owner._id.toString() !== req.user._id) {
      throw new UnauthorizedError(messages.auth.notAuthorised);
    }

    await Card.deleteOne(card);
    res.send({ message: messages.card.isDeleted });
  } catch (err) {
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    checkCardAndSend(card, res);
  } catch (err) {
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    checkCardAndSend(card, res);
  } catch (err) {
    next(err);
  }
};

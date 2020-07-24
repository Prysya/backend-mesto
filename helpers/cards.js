const cards = require('../data/cards.json');

const getCards = (req, res) => {
  res.send(cards);
};

const getCard = (req, res) => {
  const { id } = req.params;

  if (!cards[id]) {
    res.status(404).send({ message: 'Карточка с таким id не найдена' });
    return;
  }

  res.send(cards[id]);
};

module.exports = {
  getCards,
  getCard,
};

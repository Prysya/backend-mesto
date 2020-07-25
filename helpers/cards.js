const fsPromises = require('fs').promises;

const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  fsPromises
    .readFile(filePath, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getCard = ({ params: { id } }, res) => {
  fsPromises
    .readFile(filePath, { encoding: 'utf8' })
    .then((data) => {
      if (!JSON.parse(data)[id]) {
        res.status(404).send({ message: 'Карточка с таким id не найдена' });
        return;
      }

      res.send(JSON.parse(data)[id]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  getCards,
  getCard,
};

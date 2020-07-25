const path = require('path');
const checkFile = require('./checkFile');

const checkData = checkFile(path.join(__dirname, '..', 'data', 'cards.json'));

const getCards = (req, res) => {
  checkData
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = getCards;

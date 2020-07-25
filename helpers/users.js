const fsPromises = require('fs').promises;

const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  fsPromises
    .readFile(filePath, { encoding: 'utf8' })
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getUser = ({ params: { id } }, res) => {
  fsPromises
    .readFile(filePath, { encoding: 'utf8' })
    .then((data) => {
      if (!JSON.parse(data).find((user) => user._id === id)) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }

      res.send(JSON.parse(data).find((user) => user._id === id));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  getUsers,
  getUser,
};

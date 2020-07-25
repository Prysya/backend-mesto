const path = require('path');
const checkFile = require('./checkFile');

const checkData = checkFile(path.join(__dirname, '..', 'data', 'users.json'));

const getUsers = (req, res) => {
  checkData
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getUser = ({ params: { id } }, res) => {
  checkData
    .then((data) => {
      const usersData = JSON.parse(data);

      if (!usersData.find((user) => user._id === id)) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }

      res.send(usersData.find((user) => user._id === id));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  getUsers,
  getUser,
};

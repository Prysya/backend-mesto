const users = require("../data/users.json");

const getUsers = (req, res) => {
  res.send(users);
};

const getUser = (req, res) => {
  const { id } = req.params;

  if (!users.some((user) => user._id === id)) {
    res.status(404).send({ message: "Нет пользователя с таким id" });
    return;
  }

  res.send(users.find((user) => user._id === id));
};

module.exports = {
  getUsers,
  getUser,
};

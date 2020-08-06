const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const cards = require('./routes/cards');
const users = require('./routes/users');
const errors = require('./routes/errors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5f2c0a783f104207e78039cc',
  };

  next();
});
app.use('/users', users);
app.use('/cards', cards);
app.use('*', errors);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
});

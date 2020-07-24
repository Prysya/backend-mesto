const express = require('express');
const { PORT = 3000 } = process.env;
const path = require('path');

const cards = require('./routes/cards');
const users = require('./routes/users');
const error = require('./routes/error');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/cards', cards);
app.use('/users', users);
app.use("*", error);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
})
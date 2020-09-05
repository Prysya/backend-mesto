const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const router = require('./routes/index');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
});

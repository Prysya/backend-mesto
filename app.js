const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const cards = require('./routes/cards');
const users = require('./routes/users');
const errors = require('./routes/errors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', users);
app.use('/cards', cards);
app.use('*', errors);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
});

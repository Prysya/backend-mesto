const { errors } = require('celebrate');
const router = require('express').Router();

const middlewaresRouter = require('../middlewares/index');
const { errorsHandler } = require('../middlewares/errors-handler');
const register = require('./registration');
const authorization = require('./authorization');
const users = require('./users');
const cards = require('./cards');
const error = require('./errors');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(middlewaresRouter);

router.use(requestLogger);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

router.use('/signin', authorization);
router.use('/signup', register);
router.use('/cards', cards);
router.use('/users', users);
router.use('*', error);

router.use(errorLogger);

router.use(errors());

router.use(errorsHandler);

module.exports = router;

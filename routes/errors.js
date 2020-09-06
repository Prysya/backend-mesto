const router = require('express').Router();
const { NotFoundError } = require('../errors/index');
const messages = require('../utils/messages');

router.all('*', (req, res, next) => {
  next(new NotFoundError(messages.validation.notFound));
});

module.exports = router;

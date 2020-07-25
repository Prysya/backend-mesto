const router = require('express').Router();
const getCards = require('../helpers/cards');

router.get('/', getCards);

module.exports = router;

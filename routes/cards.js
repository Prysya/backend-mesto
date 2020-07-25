const router = require('express').Router();
const { getCards, getCard } = require('../helpers/cards');

router.get('/', getCards);
router.get('/:id', getCard);

module.exports = router;

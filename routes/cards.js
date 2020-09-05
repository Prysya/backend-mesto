const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { cardSchema, objectIdSchema } = require('../joi-schemas/index');
const { verifyCardId } = require('../middlewares/object-id');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    body: cardSchema,
  }),
  createCard,
);

router.delete(
  '/:cardId',
  verifyCardId,
  celebrate({ body: objectIdSchema }),
  deleteCard,
);

router.put(
  '/:cardId/likes',
  verifyCardId,
  celebrate({ body: objectIdSchema }),
  likeCard,
);
router.delete(
  '/:cardId/likes',
  verifyCardId,
  celebrate({ body: objectIdSchema }),
  dislikeCard,
);

module.exports = router;

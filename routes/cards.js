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
  '/:id',
  celebrate({ params: objectIdSchema }),
  verifyCardId,
  deleteCard,
);

router.put(
  '/:id/likes',
  celebrate({ params: objectIdSchema }),
  verifyCardId,
  likeCard,
);
router.delete(
  '/:id/likes',
  celebrate({ params: objectIdSchema }),
  verifyCardId,
  dislikeCard,
);

module.exports = router;

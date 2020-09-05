const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUser,
  updateUserData,
  updateUserAvatar,
} = require('../controllers/users');
const {
  verifyUserId,
} = require('../middlewares/object-id');
const {
  userInfoSchema,
  userAvatarSchema,
  objectIdSchema,
} = require('../joi-schemas/index');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/', getUsers);
router.get(
  '/:id',
  verifyUserId,
  celebrate({ params: objectIdSchema }),
  getUser,
);

router.patch(
  '/me',
  celebrate({
    params: objectIdSchema,
    body: userInfoSchema,
  }),
  updateUserData,
);
router.patch(
  '/me/avatar',
  celebrate({ params: objectIdSchema, body: userAvatarSchema }),
  updateUserAvatar,
);

module.exports = router;

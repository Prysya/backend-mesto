const router = require('express').Router();
const { getUsers, getUser } = require('../helpers/users');

router.get('/', getUsers);

router.get('/:id', getUser);

module.exports = router;

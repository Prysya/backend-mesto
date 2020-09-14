const { celebrate } = require('celebrate');
const router = require('express').Router();

const { createUser } = require('../controllers/users');
const { registrationSchema } = require('../joi-schemas/index');

router.post('/', celebrate({ body: registrationSchema }), createUser);

module.exports = router;

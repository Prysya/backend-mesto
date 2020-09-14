const router = require('express').Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());

module.exports = router;

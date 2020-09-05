const router = require('express').Router();

const bodyParser = require('./body-parser');
const cookieParser = require('./cookie-parser');
const helmet = require('./helmet');
const rateLimiter = require('./rate-limiter');

router.use(bodyParser);
router.use(cookieParser);
router.use(helmet);
router.use(rateLimiter);

module.exports = router;

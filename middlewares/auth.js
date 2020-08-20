const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      '2cf267f7b4b7fdea9196675eb3e7452d8ce8f8cdf6c2e0917aa705f10d92c45a',
    );
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  return next();
};

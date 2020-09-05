const bcrypt = require('bcryptjs');
const escape = require('escape-html');
const { createToken } = require('../utils/token');
const User = require('../models/user');
const schemaValidator = require('../utils/passwordValidator');
const {
  BadRequestError,
  NotFoundError,
} = require('../errors/index');
const messages = require('../utils/messages');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async ({ params: { id } }, res, next) => {
  try {
    const user = await User.findById(id).orFail(
      () => new NotFoundError(messages.user.idIsNotFound),
    );
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;

    if (
      !password
      || password.length < 8
      || !schemaValidator.validate(password)
    ) {
      throw new BadRequestError(messages.user.passwordIsNotValid);
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: escape(name),
      about: escape(about),
      avatar,
      email,
      password: hash,
    });

    res.send({
      data: {
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    next(new BadRequestError(err.message));
  }
};

module.exports.updateUserData = async (req, res, next) => {
  try {
    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: escape(name), about: escape(about) },
      { new: true, runValidators: true },
    ).orFail(() => new NotFoundError(messages.user.idIsNotFound));

    res.send({ data: user });
  } catch (err) {
    next(new BadRequestError(err.message));
  }
};

module.exports.updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail(() => new NotFoundError(messages.user.idIsNotFound));

    res.send({ data: user });
  } catch (err) {
    next(new BadRequestError(err.message));
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findUserByCredentials(email, password);

    const token = await createToken(user);

    await res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });

    res.status(200).send({ message: messages.auth.authIsSuccess });
  } catch (err) {
    next(err);
  }
};
